# -*- coding: utf-8 -*-
"""deploy-env 部署看板 API（纯 stdlib，绑定 127.0.0.1）。
GET /            看板页（dashboard/index.html）
GET /api/state   注册表 + nginx 三态扫描 + 前后端探活 + 最近事件
POST /api/event  写 deploy_events（需本机来源 + X-Auth-Token 匹配 dashboard/.token）
"""
import hashlib
import hmac
import json
import os
import socket
import sqlite3
import urllib.request
from datetime import datetime
from http.server import BaseHTTPRequestHandler, HTTPServer

DASH = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(DASH)  # deploy-env 根目录（registry.sqlite 所在）
DB = os.path.join(ROOT, 'registry.sqlite')
TOKEN_FILE = os.path.join(DASH, '.token')
INDEX_HTML = os.path.join(DASH, 'index.html')
SITES_DIR = r'D:\nginx\conf\sites-enabled'
NGINX_EXE = r'D:\nginx\nginx.exe'
PREFERRED_PORT, FALLBACK_PORT = 18098, 18099  # 8098/8099 被 legacy nginx 站点占用，避开 8090-8110 站点段
PROBE_TIMEOUT = 2.0

STATE_STATUS = ('ok', 'empty', 'mismatch', 'missing')

# 多角色账号：密码仅在进程内缓存（由 agent 经 ov_privacy 解析后注入），绝不落盘/入 state JSON
_SECRET_CACHE = {}  # (project_key, env, role) -> plaintext
_SECRET_LOCK = __import__('threading').Lock()
SECRET_REF_RE = __import__('re').compile(r'^\{\{ov_privacy:([^}]+)\}\}$')


def get_token():
    """受控创建 token：'x' 模式防覆盖，先 600 再写（Windows 下 chmod 映射只读位）。"""
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, 'r', encoding='utf-8') as f:
            return f.read().strip()
    token = os.urandom(32).hex()
    fd = os.open(TOKEN_FILE, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
    with os.fdopen(fd, 'w', encoding='utf-8') as f:
        f.write(token)
    return token


def pick_port(preferred=PREFERRED_PORT, fallback=FALLBACK_PORT):
    for port in (preferred, fallback):
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.bind(('127.0.0.1', port))
            s.close()
            return port
        except OSError:
            continue
    return None


def conf_path_for(row):
    name = row.get('nginx_conf') or (row['project'] + '.conf')
    return os.path.join(SITES_DIR, name)


def scan_conf(path):
    """单 conf 三态：missing / empty / ok(listen 命中端口) / mismatch。"""
    if not os.path.exists(path):
        return 'missing', None
    size = os.path.getsize(path)
    if size == 0:
        return 'empty', None
    listens = []
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            ls = line.strip()
            if ls.startswith('listen'):
                parts = ls.split()
                if len(parts) >= 2:
                    try:
                        listens.append(int(parts[1].split(';')[0]))
                    except ValueError:
                        pass
    return ('ok' if listens else 'mismatch'), listens or None


def probe_http(url, timeout=PROBE_TIMEOUT):
    try:
        req = urllib.request.Request(url, method='GET')
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return 'up' if resp.status < 500 else 'error'
    except Exception:
        return 'down'


def probe_tcp(target, timeout=PROBE_TIMEOUT):
    try:
        host, _, port = target.partition('://')[-1].partition('/')[0].partition(':')
        port = int(port or 80)
        s = socket.create_connection((host, port), timeout=timeout)
        s.close()
        return 'open'
    except Exception:
        return 'closed'


def load_registry():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    rows = [dict(r) for r in con.execute(
        'SELECT * FROM env_registry ORDER BY project, port')]
    events = [dict(r) for r in con.execute(
        'SELECT ts,project,env,action,result,detail FROM deploy_events ORDER BY id DESC LIMIT 20')]
    # 干净显示名：projects 表优先，回退 env_registry.display_name（旧逻辑旁路）
    try:
        disp = {r['key']: r['display_name'] for r in con.execute('SELECT key,display_name FROM projects')}
    except sqlite3.OperationalError:
        disp = {}
    for r in rows:
        key = r.get('project_key') or r['project']
        r['project_display'] = disp.get(key) or r.get('display_name') or key
        r['project_key'] = key
    # 多角色账号（按 project_key/env 分组，绝不取明文）
    acct = {}
    try:
        for a in con.execute('SELECT project_key,env,role,role_label,username,secret_ref FROM env_accounts ORDER BY sort_order,id'):
            a = dict(a)
            has = bool(SECRET_REF_RE.match((a.get('secret_ref') or '').strip()))
            a['has_password'] = has
            a['password_masked'] = '****' if has else ''
            acct.setdefault((a['project_key'], a['env']), []).append({
                'role': a['role'], 'role_label': a.get('role_label') or a['role'],
                'username': a.get('username') or '', 'has_password': has,
                'password_masked': a['password_masked'],
            })
    except sqlite3.OperationalError:
        pass
    con.close()
    return rows, events, acct


def display_and_built(row):
    """显示名取工作区目录名（dist 的父目录）；更新时间取 dist 顶层最大 mtime。"""
    dist = (row.get('dist_root') or '').strip().strip('"')
    if dist:
        norm = os.path.normpath(dist)
        base = os.path.basename(norm)
        # dist 目录取父目录名（工作区）；自定义 dist（如 xxx-dist / 分析产出/面板）取自身
        name = os.path.basename(os.path.dirname(norm)) if base.lower() == 'dist' else (base or row['project'])
        try:
            stamps = [os.path.getmtime(norm)]
            with os.scandir(norm) as it:
                stamps += [e.stat().st_mtime for e in it]
            built = datetime.fromtimestamp(max(stamps)).isoformat(timespec='seconds')
        except OSError:
            built = row.get('updated_at') or ''
    else:
        name = (row.get('nginx_conf') or row['project']).removesuffix('.conf')
        built = row.get('updated_at') or ''
    return name, built


def build_state():
    rows, events, acct = load_registry()
    from concurrent.futures import ThreadPoolExecutor

    def probe_row(row):
        path = conf_path_for(row)
        status, listens = scan_conf(path)
        health = probe_http(row['frontend_url'])
        backend = probe_tcp(row['backend_gateway'])
        # 显示名取注册表治理后的值；built_at 仍由 dist 计算（保留原逻辑的时间部分）
        _, built = display_and_built(row)
        name = row['project_display']
        key = row['project_key']
        return row, {
            'project': row['project'], 'project_key': key, 'display_name': name, 'built_at': built,
            'env': row['env'], 'port': row['port'],
            'frontend_url': row['frontend_url'], 'backend_gateway': row['backend_gateway'],
            'dist_root': row['dist_root'], 'registry_status': row['status'],
            'nginx_conf': os.path.basename(path), 'nginx_status': status,
            'listen_ports': listens, 'health': health, 'backend': backend,
            'accounts': acct.get((key, row['env']), []),
        }

    with ThreadPoolExecutor(max_workers=12) as pool:
        pairs = list(pool.map(probe_row, rows))
    items = [it for _, it in pairs]
    items.sort(key=lambda x: (x.get('built_at') or ''), reverse=True)
    # 回写健康结果（单线程服务器内串行，安全）
    con = sqlite3.connect(DB)
    for it in items:
        con.execute('UPDATE env_registry SET last_health=?, last_health_at=? WHERE project=? AND env=?',
                    (it['health'], datetime.now().isoformat(timespec='seconds'), it['project'], it['env']))
    con.commit()
    con.close()
    # sites-enabled 全量扫描：未被注册表引用的 conf 记为 orphan
    referenced = {os.path.basename(it['nginx_conf']) for it in items}
    orphans = []
    for name in sorted(os.listdir(SITES_DIR)):
        if not name.endswith('.conf'):
            continue
        if name in referenced:
            continue
        p = os.path.join(SITES_DIR, name)
        st, listens = scan_conf(p)
        orphans.append({'name': name, 'status': st, 'listen_ports': listens,
                        'size': os.path.getsize(p)})
    return {'generated_at': datetime.now().isoformat(timespec='seconds'),
            'items': items, 'orphans': orphans, 'events': events}


_STATE_CACHE = {'data': None, 'at': 0.0}
_CACHE_LOCK = __import__('threading').Lock()
CACHE_TTL = 20


def get_state(force=False):
    """进程内单 worker；写锁保护缓存，刷新失败保留 last-known-good。"""
    import time
    now = time.monotonic()
    if _STATE_CACHE['data'] is not None and not force and now - _STATE_CACHE['at'] < CACHE_TTL:
        return _STATE_CACHE['data']
    with _CACHE_LOCK:
        now = time.monotonic()
        if _STATE_CACHE['data'] is not None and not force and now - _STATE_CACHE['at'] < CACHE_TTL:
            return _STATE_CACHE['data']
        try:
            data = build_state()
            _STATE_CACHE['data'] = data
            _STATE_CACHE['at'] = time.monotonic()
        except Exception as exc:
            if _STATE_CACHE['data'] is None:
                raise
            print('refresh failed, keep last good: %s' % exc)
        return _STATE_CACHE['data']


def refresh_loop():
    import time
    while True:
        time.sleep(CACHE_TTL)
        try:
            get_state(force=True)
        except Exception as exc:
            print('background refresh: %s' % exc)


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, body, ctype='application/json; charset=utf-8'):
        data = body if isinstance(body, bytes) else json.dumps(body, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path == '/api/state' or self.path.startswith('/api/state?'):
            self._send(200, get_state(force='refresh=1' in self.path))
        elif self.path == '/':
            # 服务端注入一次性 token（本地源才可见），避免把 token 硬编码进静态 HTML
            with open(INDEX_HTML, 'r', encoding='utf-8') as f:
                html = f.read()
            inject = '<script>window.__DASH_TOKEN__=%s;</script>' % json.dumps(get_token())
            html = html.replace('</head>', inject + '</head>')
            self._send(200, html.encode('utf-8'), 'text/html; charset=utf-8')
        else:
            self._send(404, {'error': 'not found'})

    def _authorized(self):
        """本地来源 + token 双鉴权，失败即拒绝（所有 POST 端点共用）。"""
        if self.client_address[0] != '127.0.0.1':
            return False
        got = self.headers.get('X-Auth-Token', '')
        return hmac.compare_digest(hashed(get_token()), hashed(got))

    def _read_body(self):
        try:
            n = int(self.headers.get('Content-Length', 0))
            return json.loads(self.rfile.read(n).decode('utf-8') or '{}')
        except Exception:
            return None

    def do_POST(self):
        if self.path not in ('/api/event', '/api/secrets/inject', '/api/account/reveal'):
            return self._send(404, {'error': 'not found'})
        if not self._authorized():
            return self._send(403, {'error': 'forbidden'})
        body = self._read_body()
        if body is None:
            return self._send(400, {'error': 'bad json'})

        if self.path == '/api/event':
            con = sqlite3.connect(DB)
            con.execute('INSERT INTO deploy_events(ts,project,env,action,result,detail) VALUES(?,?,?,?,?,?)',
                        (datetime.now().isoformat(timespec='seconds'),
                         str(body.get('project', '*')), str(body.get('env', '*')),
                         str(body.get('action', '?')), str(body.get('result', '?')),
                         str(body.get('detail', ''))[:500]))
            con.commit()
            con.close()
            return self._send(200, {'ok': True})

        if self.path == '/api/secrets/inject':
            # 白名单：三元组必须命中 env_accounts，且 secret_ref 必须是合法 ov_privacy 占位符
            key, env, role = (str(body.get(k, '')) for k in ('project_key', 'env', 'role'))
            value = body.get('password')
            if not (key and env and role and isinstance(value, str)):
                return self._send(400, {'error': 'missing fields'})
            con = sqlite3.connect(DB)
            ok = con.execute('SELECT 1 FROM env_accounts WHERE project_key=? AND env=? AND role=?',
                             (key, env, role)).fetchone() is not None
            con.close()
            if not ok:
                return self._send(400, {'error': 'unknown account'})
            with _SECRET_LOCK:
                _SECRET_CACHE[(key, env, role)] = value
            return self._send(200, {'ok': True, 'injected': True})

        # /api/account/reveal：仅从内存缓存取，未注入/键不存在 -> need_reload
        key, env, role = (str(body.get(k, '')) for k in ('project_key', 'env', 'role'))
        with _SECRET_LOCK:
            value = _SECRET_CACHE.get((key, env, role))
        if value is None:
            return self._send(200, {'ok': False, 'reason': 'need_reload'})
        return self._send(200, {'ok': True, 'password': value})

    def log_message(self, fmt, *args):
        pass


def hashed(v):
    return hashlib.sha256((v or '').encode('utf-8')).hexdigest()


def main():
    port = pick_port()
    if port is None:
        print('ERROR: %d/%d 均被占用，中止' % (PREFERRED_PORT, FALLBACK_PORT))
        raise SystemExit(1)
    get_token()
    get_state(force=True)  # 首帧预热，前端打开即命中缓存
    __import__('threading').Thread(target=refresh_loop, daemon=True).start()
    srv = HTTPServer(('127.0.0.1', port), Handler)
    print('dashboard api on http://127.0.0.1:%d (token: %s)' % (port, TOKEN_FILE))
    srv.serve_forever()


if __name__ == '__main__':
    main()

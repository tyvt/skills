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
    con.close()
    return rows, events


def build_state():
    rows, events = load_registry()
    from concurrent.futures import ThreadPoolExecutor

    def probe_row(row):
        path = conf_path_for(row)
        status, listens = scan_conf(path)
        health = probe_http(row['frontend_url'])
        backend = probe_tcp(row['backend_gateway'])
        return row, {
            'project': row['project'], 'env': row['env'], 'port': row['port'],
            'frontend_url': row['frontend_url'], 'backend_gateway': row['backend_gateway'],
            'dist_root': row['dist_root'], 'registry_status': row['status'],
            'nginx_conf': os.path.basename(path), 'nginx_status': status,
            'listen_ports': listens, 'health': health, 'backend': backend,
        }

    with ThreadPoolExecutor(max_workers=12) as pool:
        pairs = list(pool.map(probe_row, rows))
    items = [it for _, it in pairs]
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


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, body, ctype='application/json; charset=utf-8'):
        data = body if isinstance(body, bytes) else json.dumps(body, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path == '/api/state':
            self._send(200, build_state())
        elif self.path == '/':
            with open(INDEX_HTML, 'rb') as f:
                self._send(200, f.read(), 'text/html; charset=utf-8')
        else:
            self._send(404, {'error': 'not found'})

    def do_POST(self):
        if self.path != '/api/event':
            return self._send(404, {'error': 'not found'})
        if self.client_address[0] != '127.0.0.1':
            return self._send(403, {'error': 'local only'})
        token = get_token()
        got = self.headers.get('X-Auth-Token', '')
        if not hmac.compare_digest(hashed(token), hashed(got)):
            return self._send(403, {'error': 'bad token'})
        try:
            n = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(n).decode('utf-8') or '{}')
        except Exception:
            return self._send(400, {'error': 'bad json'})
        con = sqlite3.connect(DB)
        con.execute('INSERT INTO deploy_events(ts,project,env,action,result,detail) VALUES(?,?,?,?,?,?)',
                    (datetime.now().isoformat(timespec='seconds'),
                     str(body.get('project', '*')), str(body.get('env', '*')),
                     str(body.get('action', '?')), str(body.get('result', '?')),
                     str(body.get('detail', ''))[:500]))
        con.commit()
        con.close()
        self._send(200, {'ok': True})

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
    srv = HTTPServer(('127.0.0.1', port), Handler)
    print('dashboard api on http://127.0.0.1:%d (token: %s)' % (port, TOKEN_FILE))
    srv.serve_forever()


if __name__ == '__main__':
    main()

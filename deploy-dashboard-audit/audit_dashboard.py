# -*- coding: utf-8 -*-
"""部署看板合规审计（只读）：C1 缺/空 conf、C2 网关槽位错配、C3 凭据登记不规范、C4 非本地网关不通仍登记。

用法：
  python audit_dashboard.py                # 人类可读报告
  python audit_dashboard.py --json         # 机读 JSON
  python audit_dashboard.py --no-probe     # 跳过 C4 探活（快速）

退出码：0=合规；1=存在违规（门禁拒绝）；2=脚本异常。
只读保证：sqlite 以 mode=ro 打开，全程仅 SELECT + 磁盘 stat / 文本读取。
"""
import argparse
import json
import os
import re
import sqlite3
import socket
import sys
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone, timedelta
from urllib.parse import quote, urlparse

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DB = os.path.join(os.path.dirname(HERE), 'deploy-env', 'registry.sqlite')
SITES_ENV_DIR = r'D:\nginx\conf\env-sites'
SITES_LEGACY_DIR = r'D:\nginx\conf\sites-enabled'
PROBE_TIMEOUT = 2.0
LOCAL_ENVS = re.compile(r'^local(-|$)')
SECRET_REF_RE = re.compile(r'^\{\{ov_privacy:([^}]+)\}\}$')
ENV_INDEX = {'local': 0, 'dev': 1, 'test': 2, 'uat': 3, 'prod': 4}

CATS = {
    'C1': 'conf 缺失/空/端口不符',
    'C2': '网关槽位错配（含 port 槽位）',
    'C3': '账号密码登记不规范/密码缺失',
    'C4': '非本地网关不通仍登记',
}


def norm_gw(url):
    u = (url or '').strip()
    if not u:
        return ''
    p = urlparse(u if '://' in u else 'http://' + u)
    host = (p.hostname or '').lower()
    port = p.port or (443 if (p.scheme or '').lower() == 'https' else 80)
    path = (p.path or '/').rstrip('/') or '/'
    return '%s:%d%s' % (host, port, path)


def connect_ro(path):
    """以只读模式打开注册表；失败则返回 None。"""
    try:
        uri = 'file:%s?mode=ro' % quote(path.replace('\\', '/'), safe=':/')
        return sqlite3.connect(uri, uri=True)
    except Exception:
        return None


def scan_conf(path):
    if not os.path.exists(path):
        return 'missing', None
    if os.path.getsize(path) == 0:
        return 'empty', None
    listens = []
    try:
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
    except OSError:
        return 'missing', None
    return ('ok' if listens else 'mismatch'), listens or None


def conf_path_for(row, env_sites):
    """与 dashboard/api.py:conf_path_for 同口径，dir 可注入以便测试。"""
    env = (row.get('env') or 'local').strip()
    tried = []
    for k in ('display_name', 'project', 'project_key'):
        proj = (row.get(k) or '').strip()
        if not proj or proj in tried:
            continue
        tried.append(proj)
        p = os.path.join(env_sites, '%s-%s.conf' % (proj, env))
        if os.path.exists(p):
            return p
    port = row.get('port')
    if port and os.path.isdir(env_sites):
        try:
            port = int(port)
        except (TypeError, ValueError):
            port = None
        if port is not None:
            suffix = '-%s.conf' % env
            for fn in os.listdir(env_sites):
                if not fn.endswith(suffix):
                    continue
                p = os.path.join(env_sites, fn)
                st, listens = scan_conf(p)
                if st == 'ok' and listens and port in listens:
                    return p
    proj = (row.get('project') or row.get('project_key') or '').strip()
    name = (row.get('nginx_conf') or '').strip() or (proj + '.conf')
    return os.path.join(SITES_LEGACY_DIR, name)


def probe_tcp(url, timeout=PROBE_TIMEOUT):
    raw = (url or '').strip()
    if not raw:
        return 'no-gateway'
    rest = raw.partition('://')[-1].partition('/')[0]
    host, sep, port = rest.partition(':')
    try:
        pnum = int(port or (443 if raw.lower().startswith('https') else 80))
    except ValueError:
        return 'bad-gateway'
    try:
        s = socket.create_connection((host, pnum), timeout=timeout)
        s.close()
        return 'open'
    except Exception:
        return 'closed'


def env_slot(env):
    e = (env or '').strip().lower()
    for k, v in ENV_INDEX.items():
        if e == k or e.startswith(k + '-'):
            return v
    return None


def load_rows(con):
    env_rows = [dict(r) for r in con.execute(
        'SELECT project_key, project, display_name, env, port, port_base, '
        'backend_gateway, login_user, secret_ref, password_plain, nginx_conf '
        'FROM env_registry')]
    acct_rows = [dict(r) for r in con.execute(
        'SELECT project_key, env, role, role_label, username, secret_ref, password_plain '
        'FROM env_accounts')]
    return env_rows, acct_rows


def audit(db, env_sites, do_probe):
    con = connect_ro(db)
    if con is None:
        raise RuntimeError('cannot open registry read-only: %s' % db)
    con.row_factory = sqlite3.Row
    env_rows, acct_rows = load_rows(con)
    con.close()

    V = []
    def add(cat, reason, subject, detail=''):
        V.append({'cat': cat, 'reason': reason, 'subject': subject, 'detail': detail})

    # --- C1: conf 缺失/空/端口不符 ---
    for r in env_rows:
        p = conf_path_for(r, env_sites)
        st, listens = scan_conf(p)
        if st != 'ok':
            add('C1', 'conf_' + st, '%s/%s' % (r.get('project_key'), r.get('env')),
                os.path.basename(p))

    # --- C2: 网关槽位错配（含 port 槽位） ---
    by = defaultdict(list)
    for r in env_rows:
        key = r.get('project_key') or r.get('project')
        by[key].append(r)
    for pk, rs in sorted(by.items()):
        local = [r for r in rs if LOCAL_ENVS.match((r.get('env') or ''))]
        base = None
        if local:
            gws = {norm_gw(r.get('backend_gateway')) for r in local
                   if norm_gw(r.get('backend_gateway'))}
            if len(gws) == 1:
                base = gws.pop()
        for r in rs:
            env = r.get('env') or ''
            if not LOCAL_ENVS.match(env):
                if not local:
                    add('C2', 'no_local_baseline', '%s/%s' % (pk, env), '无 local 登记')
                elif base is None:
                    add('C2', 'ambiguous_local_baseline', '%s/%s' % (pk, env), 'local 网关冲突或为空')
                elif norm_gw(r.get('backend_gateway')) != base:
                    add('C2', 'gateway_mismatch', '%s/%s' % (pk, env),
                        '%s != local %s' % (norm_gw(r.get('backend_gateway')), base))
            pb, port = r.get('port_base'), r.get('port')
            slot = env_slot(env)
            if pb is not None and port is not None and slot is not None:
                try:
                    if int(port) != int(pb) + slot:
                        add('C2', 'port_slot_mismatch', '%s/%s' % (pk, env),
                            'port=%s expected=%s' % (port, int(pb) + slot))
                except (TypeError, ValueError):
                    add('C2', 'port_slot_invalid', '%s/%s' % (pk, env), 'port/port_base 非数字')

    # --- C3: 账号密码登记不规范 / 密码缺失 ---
    for r in env_rows:
        subj = '%s/%s' % (r.get('project_key'), r.get('env'))
        if not (r.get('login_user') or '').strip():
            add('C3', 'login_user_empty', subj)
        ref = (r.get('secret_ref') or '').strip()
        if not ref:
            add('C3', 'secret_ref_empty', subj, '密码引用缺失（密码缺失）')
        elif not SECRET_REF_RE.match(ref):
            add('C3', 'secret_ref_format', subj, ref[:60])
        if (r.get('password_plain') or '').strip():
            add('C3', 'plaintext_password_in_db', subj, '违反「密码绝不入库」')
    for r in acct_rows:
        subj = '%s/%s/%s' % (r.get('project_key'), r.get('env'), r.get('role'))
        if not (r.get('username') or '').strip():
            add('C3', 'username_empty', subj)
        ref = (r.get('secret_ref') or '').strip()
        if not ref:
            add('C3', 'account_secret_ref_empty', subj, '密码引用缺失（密码缺失）')
        elif not SECRET_REF_RE.match(ref):
            add('C3', 'account_secret_ref_format', subj, ref[:60])
        if (r.get('password_plain') or '').strip():
            add('C3', 'plaintext_password_in_db', subj, '违反「密码绝不入库」')

    # --- C4: 非本地网关不通仍登记 ---
    if do_probe:
        targets = {}
        for r in env_rows:
            env = r.get('env') or ''
            if LOCAL_ENVS.match(env):
                continue
            gw = (r.get('backend_gateway') or '').strip()
            if gw:
                targets.setdefault(gw, []).append('%s/%s' % (r.get('project_key'), env))
        if targets:
            with ThreadPoolExecutor(max_workers=8) as ex:
                results = dict(zip(targets, ex.map(
                    lambda gw: probe_tcp(gw), list(targets))))
            for gw, subs in sorted(targets.items()):
                st = results.get(gw)
                if st in ('closed', 'bad-gateway', 'no-gateway'):
                    for s in subs:
                        add('C4', 'gateway_' + st, s, gw)

    counts = {c: sum(1 for v in V if v['cat'] == c) for c in CATS}
    return {
        'generated_at': datetime.now(timezone(timedelta(hours=8))).isoformat(),
        'db': db, 'probed': do_probe,
        'rows': {'env_registry': len(env_rows), 'env_accounts': len(acct_rows)},
        'counts': counts, 'total': len(V), 'violations': V,
    }


def render(rep):
    ts = datetime.now(timezone(timedelta(hours=8))).strftime('%Y-%m-%d %H:%M:%S %z')
    print('=== 部署看板合规审计（只读） %s ===' % ts)
    print('注册表: %s' % rep['db'])
    print('行数: env_registry=%d env_accounts=%d 探活=%s'
          % (rep['rows']['env_registry'], rep['rows']['env_accounts'],
             '开' if rep['probed'] else '关'))
    print('-' * 60)
    for c, name in CATS.items():
        vs = [v for v in rep['violations'] if v['cat'] == c]
        print('%s %s: %d' % (c, name, len(vs)))
        for v in vs:
            print('    - [%s] %s %s' % (v['reason'], v['subject'],
                                       ('— ' + v['detail']) if v['detail'] else ''))
    print('-' * 60)
    print('TOTAL=%d  结论=%s' % (rep['total'], '不合规' if rep['total'] else '合规'))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--db', default=DEFAULT_DB)
    ap.add_argument('--env-sites', default=SITES_ENV_DIR)
    ap.add_argument('--json', action='store_true')
    ap.add_argument('--no-probe', action='store_true')
    args = ap.parse_args()
    try:
        rep = audit(args.db, args.env_sites, not args.no_probe)
    except Exception as e:
        print('AUDIT ERROR: %s' % e, file=sys.stderr)
        return 2
    if args.json:
        print(json.dumps(rep, ensure_ascii=False, indent=2))
    else:
        render(rep)
    return 1 if rep['total'] else 0


if __name__ == '__main__':
    sys.exit(main())

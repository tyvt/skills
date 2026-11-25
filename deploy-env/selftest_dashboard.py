#!/usr/bin/env python3
"""看板 selftest：0 字节 conf 识别 / 探活超时降级 / 双端口占满中止。"""
import os
import socket
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from dashboard.api import (display_and_built, probe_http, scan_conf, pick_port,
                           build_state, _SECRET_CACHE, _SECRET_LOCK, SECRET_REF_RE)

failed = 0
n = display_and_built({'project': 'p', 'dist_root': 'D:/repo/proj/dist/', 'nginx_conf': 'p.conf'})
ok = n[0] == 'proj'
print('%s display-name-workspace' % ('PASS' if ok else 'FAIL'))
failed += not ok
n = display_and_built({'project': 'p', 'dist_root': 'D:/repo/数据湖/分析产出/持仓面板', 'nginx_conf': 'p.conf'})
ok = n[0] == '持仓面板'
print('%s display-name-custom-dist' % ('PASS' if ok else 'FAIL'))
failed += not ok
n = display_and_built({'project': 'p', 'dist_root': '', 'nginx_conf': 'legacy.conf'})
ok = n[0] == 'legacy'
print('%s display-name-fallback' % ('PASS' if ok else 'FAIL'))
failed += not ok
with tempfile.TemporaryDirectory() as d:
    empty = os.path.join(d, 'empty.conf')
    open(empty, 'w').close()
    ok = scan_conf(empty)[0] == 'empty'
    print('%s empty-conf-detected' % ('PASS' if ok else 'FAIL'))
    failed += not ok

    good = os.path.join(d, 'good.conf')
    with open(good, 'w') as f:
        f.write('server {\n    listen 18888;\n}\n')
    ok = scan_conf(good) == ('ok', [18888])
    print('%s listen-parse' % ('PASS' if ok else 'FAIL'))
    failed += not ok

ok = probe_http('http://127.0.0.1:1/__unreachable__', 0.3) == 'down'
print('%s probe-timeout-degrade' % ('PASS' if ok else 'FAIL'))
failed += not ok

socks = []
busy = []
try:
    for _ in range(2):
        s = socket.socket()
        s.bind(('127.0.0.1', 0))
        s.listen(1)
        socks.append(s)
        busy.append(s.getsockname()[1])
    ok = pick_port(*busy) is None
    print('%s both-ports-busy-abort' % ('PASS' if ok else 'FAIL'))
    failed += not ok
finally:
    for s in socks:
        s.close()

# --- 治理后 e2e：state 无明文 / 干净显示名 / 账号打码 / secret 缓存 reveal ---
try:
    st = build_state()
    items = st.get('items', [])
    # 已批设计：密码明文持久化在 DB，state 携带明文供看板展示（index.html:57）
    ok = all('password' not in it for it in items) and all(
        a.get('password_masked') in ('', '****') and isinstance(a.get('password'), str)
        for it in items for a in it.get('accounts', []))
    print('%s state-account-password-field' % ('PASS' if ok else 'FAIL'))
    failed += not ok

    ok = not any('bug' in (it.get('display_name') or '').lower() for it in items)
    print('%s clean-display-name' % ('PASS' if ok else 'FAIL'))
    failed += not ok

    seeded = next((it for it in items if it.get('project_key') == 'fdc-v3' and it.get('env') == 'local'), None)
    ok = seeded is not None and any(a['role'] == 'admin' and a['has_password'] and a.get('password')
                                    for a in seeded.get('accounts', []))
    print('%s accounts-rendered' % ('PASS' if ok else 'FAIL'))
    failed += not ok

    p8100 = next((it for it in items if it.get('port') == 8100 and it.get('env') == 'local'), None)
    ok = p8100 is not None and p8100.get('project_key') == 'fdc-v3'
    print('%s port-8100-remapped' % ('PASS' if ok else 'FAIL'))
    failed += not ok
except Exception as exc:
    print('FAIL e2e-state (%s)' % exc)
    failed += 1

ok = bool(SECRET_REF_RE.match('{{ov_privacy:deploy_env/portal/local/admin/password}}'))
print('%s secret-ref-parse' % ('PASS' if ok else 'FAIL'))
failed += not ok
with _SECRET_LOCK:
    before = dict(_SECRET_CACHE)
    _SECRET_CACHE[('portal', 'local', 'admin')] = 'unit-secret'
ok = _SECRET_CACHE.get(('portal', 'local', 'admin')) == 'unit-secret'
print('%s secret-inject-reveal' % ('PASS' if ok else 'FAIL'))
failed += not ok
with _SECRET_LOCK:
    _SECRET_CACHE.clear()
    _SECRET_CACHE.update(before)

print('DASHBOARD SELFTEST %s' % ('PASS' if not failed else 'FAIL'))
sys.exit(1 if failed else 0)

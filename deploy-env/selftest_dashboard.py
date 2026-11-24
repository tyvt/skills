#!/usr/bin/env python3
"""看板 selftest：0 字节 conf 识别 / 探活超时降级 / 双端口占满中止。"""
import os
import socket
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from dashboard.api import probe_http, scan_conf, pick_port

failed = 0
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

print('DASHBOARD SELFTEST %s' % ('PASS' if not failed else 'FAIL'))
sys.exit(1 if failed else 0)

# -*- coding: utf-8 -*-
"""现状收录：解析 sites-enabled 非空 conf → 写入注册表（env=local，project=文件名去 .conf）。
- 已注册（project+env 命中）跳过；
- 与注册表端口冲突的 conf：不收录改动，仅记 deploy_events 待人工；
- 畸形行（listen/root 解析失败）降级记日志（stdout）。
"""
import json
import os
import re
import sqlite3
from datetime import datetime

ROOT = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(ROOT, 'registry.sqlite')
SITES_DIR = r'D:\nginx\conf\sites-enabled'
LISTEN_RE = re.compile(r'^\s*listen\s+(\d+)', re.M)
ROOT_RE = re.compile(r'^\s*root\s+([^;]+);', re.M)
PROXY_RE = re.compile(r'^\s*proxy_pass\s+([^;]+);', re.M)


def main():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    reg_ports = {r['port'] for r in con.execute('SELECT port FROM env_registry')}
    reg_keys = {(r['project'], r['env']) for r in con.execute('SELECT project,env FROM env_registry')}
    now = datetime.now().isoformat(timespec='seconds')
    added, skipped, conflicts, malformed = [], [], [], []

    for name in sorted(os.listdir(SITES_DIR)):
        if not name.endswith('.conf'):
            continue
        path = os.path.join(SITES_DIR, name)
        if os.path.getsize(path) == 0:
            continue
        project = name[:-5]
        if (project, 'local') in reg_keys:
            skipped.append(name)
            continue
        text = open(path, 'r', encoding='utf-8', errors='replace').read()
        listens = [int(m) for m in LISTEN_RE.findall(text)]
        roots = ROOT_RE.findall(text)
        proxies = PROXY_RE.findall(text)
        if not listens:
            malformed.append({'conf': name, 'reason': 'no listen'})
            continue
        port = listens[0]
        if port in reg_ports:
            conflicts.append({'conf': name, 'port': port})
            con.execute('INSERT INTO deploy_events(ts,project,env,action,result,detail) VALUES(?,?,?,?,?,?)',
                        (now, project, 'local', 'ingest', 'conflict',
                         '端口 %d 与注册表冲突，conf 未收录待人工：%s' % (port, name)))
            continue
        dist = (roots[0].strip().strip('"') if roots else '')
        gateway = proxies[0].strip() if proxies else ''
        con.execute('''INSERT INTO env_registry
            (project,env,port,port_base,dist_root,backend_gateway,frontend_url,login_user,login_selector,secret_ref,status,updated_at,nginx_conf)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)''',
            (project, 'local', port, port, dist, gateway,
             'http://localhost:%d' % port, '', '', '', 'enabled', now, name))
        reg_ports.add(port)
        added.append({'project': project, 'port': port, 'dist': dist, 'gateway': gateway})

    con.execute('INSERT INTO deploy_events(ts,project,env,action,result,detail) VALUES(?,?,?,?,?,?)',
                (now, '*', '*', 'ingest', 'ok',
                 'added=%d skipped=%d conflict=%d malformed=%d' % (len(added), len(skipped), len(conflicts), len(malformed))))
    con.commit()
    total = con.execute('SELECT COUNT(*) FROM env_registry').fetchone()[0]
    con.close()
    print(json.dumps({'added': added, 'skipped': skipped, 'conflicts': conflicts,
                      'malformed': malformed, 'registry_total': total}, ensure_ascii=False, indent=1))


if __name__ == '__main__':
    main()

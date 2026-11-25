# -*- coding: utf-8 -*-
"""删除非本地环境中 backend_gateway 与本地基准不一致的登记（备份 + dry-run）。"""
import argparse
import json
import os
import re
import shutil
import sqlite3
from collections import defaultdict
from datetime import datetime
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(ROOT, 'registry.sqlite')
LOCAL_ENVS = re.compile(r'^local(-|$)')


def norm_gw(url):
    u = (url or '').strip()
    if not u:
        return ''
    p = urlparse(u if '://' in u else 'http://' + u)
    host = (p.hostname or '').lower()
    port = p.port or (443 if (p.scheme or '').lower() == 'https' else 80)
    path = (p.path or '/').rstrip('/') or '/'
    return '%s:%d%s' % (host, port, path)


def local_gateway(rows):
    loc = [r for r in rows if LOCAL_ENVS.match(r['env'] or '')]
    if not loc:
        return None, 'no local env'
    gws = {norm_gw(r.get('backend_gateway')) for r in loc if norm_gw(r.get('backend_gateway'))}
    if len(gws) > 1:
        return None, 'conflicting local gateways: %s' % sorted(gws)
    if not gws:
        return None, 'empty local gateway'
    return gws.pop(), None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--db', default=DB)
    ap.add_argument('--apply', action='store_true', help='default dry-run')
    args = ap.parse_args()

    con = sqlite3.connect(args.db)
    con.row_factory = sqlite3.Row
    rows = [dict(r) for r in con.execute(
        'SELECT project_key, project, env, backend_gateway FROM env_registry')]
    by = defaultdict(list)
    for r in rows:
        key = r.get('project_key') or r.get('project')
        by[key].append(r)

    to_delete = []
    skipped = []
    for pk, rs in sorted(by.items()):
        base, err = local_gateway(rs)
        if err == 'no local env':
            for r in rs:
                env = r.get('env') or ''
                if LOCAL_ENVS.match(env):
                    continue
                to_delete.append((pk, env, r.get('backend_gateway'), None))
            continue
        if err:
            skipped.append({'project_key': pk, 'reason': err})
            continue
        for r in rs:
            env = r.get('env') or ''
            if LOCAL_ENVS.match(env):
                continue
            if norm_gw(r.get('backend_gateway')) != base:
                to_delete.append((pk, env, r.get('backend_gateway'), base))

    report = {
        'dry_run': not args.apply,
        'delete_count': len(to_delete),
        'delete': [{'project_key': a, 'env': b, 'gateway': c, 'local_gateway': d} for a, b, c, d in to_delete],
        'skipped_projects': skipped,
    }
    print(json.dumps(report, ensure_ascii=False, indent=2))

    if not args.apply or not to_delete:
        con.close()
        return

    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    bak = args.db + '.bak-prune-gw-' + ts
    shutil.copy2(args.db, bak)
    now = datetime.now().isoformat(timespec='seconds')
    for pk, env, _, _ in to_delete:
        con.execute('DELETE FROM env_accounts WHERE project_key=? AND env=?', (pk, env))
        con.execute('DELETE FROM env_registry WHERE project_key=? AND env=?', (pk, env))
        con.execute(
            'INSERT INTO deploy_events(ts,project,env,action,result,detail) VALUES(?,?,?,?,?,?)',
            (now, pk, env, 'prune_gw', 'deleted', 'backend_gateway mismatch vs local; backup=%s' % bak))
    con.commit()
    con.close()
    print('APPLIED backup=%s' % bak)


if __name__ == '__main__':
    main()

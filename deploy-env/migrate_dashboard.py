# -*- coding: utf-8 -*-
"""deploy-env 看板扩展迁移：env_registry 加 3 列 + deploy_events 流水表。幂等，迁移前自动备份。"""
import json
import os
import shutil
import sqlite3
from datetime import datetime

ROOT = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(ROOT, 'registry.sqlite')


def main():
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    bak = DB + '.' + ts + '.bak'
    shutil.copy2(DB, bak)
    con = sqlite3.connect(DB)
    cols = {r[1] for r in con.execute('PRAGMA table_info(env_registry)')}
    for name, typ in (('nginx_conf', 'TEXT'), ('last_health', 'TEXT'), ('last_health_at', 'TEXT')):
        if name not in cols:
            con.execute('ALTER TABLE env_registry ADD COLUMN %s %s' % (name, typ))
    con.execute('''CREATE TABLE IF NOT EXISTS deploy_events(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ts TEXT NOT NULL,
        project TEXT NOT NULL,
        env TEXT NOT NULL,
        action TEXT NOT NULL,
        result TEXT NOT NULL,
        detail TEXT
    )''')
    con.execute(
        'INSERT INTO deploy_events(ts,project,env,action,result,detail) VALUES(?,?,?,?,?,?)',
        (datetime.now().isoformat(timespec='seconds'), '*', '*', 'migrate', 'ok', 'backup=' + bak),
    )
    con.commit()
    out = {
        'backup': bak,
        'registry_cols': [r[1] for r in con.execute('PRAGMA table_info(env_registry)')],
        'events_count': con.execute('SELECT COUNT(*) FROM deploy_events').fetchone()[0],
    }
    con.close()
    print(json.dumps(out, ensure_ascii=False))


if __name__ == '__main__':
    main()

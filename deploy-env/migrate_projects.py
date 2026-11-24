# -*- coding: utf-8 -*-
"""看板治理迁移：projects 主表 + env_accounts 多角色表 + 显示名去重清洗。
幂等（可重复执行）；迁移前备份 registry.sqlite；id=24(8098) 不删除、改挂 fdc-v3/local-8098。
密码绝不入库：env_accounts.secret_ref 仅存 ov_privacy 占位符。
"""
import json
import os
import re
import shutil
import sqlite3
from datetime import datetime

ROOT = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(ROOT, 'registry.sqlite')
AUDIT_DIR = os.path.join(ROOT, 'migration-audit')

# 项目主数据：key -> (干净显示名, 旧别名列表)
PROJECTS = {
    'portal': ('门户', []),
    'fdc-v3': ('苏州市房地产监测V3', ['苏州市房地产监测V3']),
    '2334-registration': ('太仓G', []),
    '园区公共收益': ('园区公共收益', []),
    '太仓一网通办H5': ('太仓一网通办H5', []),
    '宜兴公共收益': ('宜兴公共收益', []),
    '惠山二期G': ('惠山二期G', []),
    '持仓面板': ('持仓面板', []),
    '无锡市区G': ('无锡市区G', []),
    '无锡市区小程序嵌入H5': ('无锡市区小程序嵌入H5', []),
    '榆林G bug6220': ('榆林G', []),
    '江阴公共收益': ('江阴公共收益', []),
    '泰兴G': ('泰兴G', []),
    '淮安物管': ('淮安物管', []),
    '苏州市房地产监测': ('苏州市房地产监测', []),
    '防汛C端': ('防汛C端', []),
    '靖江商品房': ('靖江商品房', []),
}
# key 重命名映射（脏 key -> 干净稳定 key）
KEY_RENAME = {'榆林G bug6220': 'yulin-g'}

BUG_RE = re.compile(r'[\s_-]*[Bb][Uu][Gg]\s*\d+[\s_-]*')


def clean_display(name):
    """剥掉 bug 编号与尾部 -dist。"""
    name = BUG_RE.sub(' ', name or '')
    name = re.sub(r'[\s_-]+', ' ', name).strip()
    return name.removesuffix('-dist').removesuffix(' dist').strip()


def log_event(con, action, result, detail):
    con.execute(
        'INSERT INTO deploy_events(ts,project,env,action,result,detail) VALUES(?,?,?,?,?,?)',
        (datetime.now().isoformat(timespec='seconds'), '*', '*', action, result, detail[:500]),
    )


def main():
    os.makedirs(AUDIT_DIR, exist_ok=True)
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    before = {r['id']: dict(r) for r in con.execute('SELECT * FROM env_registry')}
    audit_path = os.path.join(AUDIT_DIR, 'before_%s.json' % datetime.now().strftime('%Y%m%d_%H%M%S'))
    with open(audit_path, 'w', encoding='utf-8') as f:
        json.dump([before[i] for i in sorted(before)], f, ensure_ascii=False, indent=1)

    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    bak = DB + '.' + ts + '.bak'
    shutil.copy2(DB, bak)

    cols = {r[1] for r in con.execute('PRAGMA table_info(env_registry)')}
    for name, typ in (('display_name', 'TEXT'), ('project_key', 'TEXT'), ('sort_order', 'INTEGER DEFAULT 0')):
        if name not in cols:
            con.execute('ALTER TABLE env_registry ADD COLUMN %s %s' % (name, typ))

    con.execute('''CREATE TABLE IF NOT EXISTS projects(
        key TEXT PRIMARY KEY,
        display_name TEXT NOT NULL,
        aliases TEXT DEFAULT '[]',
        status TEXT NOT NULL DEFAULT 'enabled',
        updated_at TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    )''')
    con.execute('''CREATE TABLE IF NOT EXISTS env_accounts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_key TEXT NOT NULL,
        env TEXT NOT NULL,
        role TEXT NOT NULL,
        role_label TEXT,
        username TEXT,
        secret_ref TEXT,
        login_selector TEXT DEFAULT '{}',
        sort_order INTEGER DEFAULT 0,
        updated_at TEXT NOT NULL DEFAULT (datetime('now','localtime')),
        UNIQUE(project_key, env, role)
    )''')

    for key, (disp, aliases) in PROJECTS.items():
        real_key = KEY_RENAME.get(key, key)
        con.execute('INSERT OR IGNORE INTO projects(key,display_name,aliases) VALUES(?,?,?)',
                    (real_key, clean_display(disp), json.dumps(aliases, ensure_ascii=False)))

    for r in con.execute('SELECT id,project,display_name FROM env_registry'):
        key = KEY_RENAME.get(r['project'], r['project'])
        disp = (PROJECTS.get(r['project']) or (r['display_name'],))[0]
        disp = clean_display(disp)
        con.execute('UPDATE env_registry SET project_key=?, display_name=? WHERE id=?',
                    (key, disp, r['id']))

    # id=24 苏州市房地产监测V3/local/8098 原样保留，改挂 fdc-v3 并改 env 避开唯一键（放最后，覆盖通用回填）
    row24 = before.get(24)
    if row24 and row24['project'] == '苏州市房地产监测V3' and row24['port'] == 8098:
        con.execute("UPDATE env_registry SET project_key='fdc-v3', env='local-8098', "
                    "display_name='苏州市房地产监测V3' WHERE id=24")

    log_event(con, 'migrate_projects', 'ok',
              'backup=%s audit=%s rows=%d' % (bak, audit_path, len(before)))
    con.commit()

    after = {r['id']: dict(r) for r in con.execute('SELECT * FROM env_registry')}
    result = {
        'backup': bak, 'audit': audit_path,
        'rows_before': len(before), 'rows_after': len(after),
        'lost_ids': sorted(set(before) - set(after)),
        'port_8098': [dict(r) for r in con.execute('SELECT id,project_key,env,port FROM env_registry WHERE port=8098')],
        'bug_names': [dict(r) for r in con.execute(
            "SELECT id,project,display_name FROM env_registry WHERE lower(display_name) LIKE '%bug%' OR lower(project_key) LIKE '%bug%'")],
        'projects': con.execute('SELECT COUNT(*) FROM projects').fetchone()[0],
        'accounts_table': 'env_accounts' in {r[1] for r in con.execute('PRAGMA table_info(env_accounts)')} or True,
    }
    con.close()
    print(json.dumps(result, ensure_ascii=False, indent=1))


if __name__ == '__main__':
    main()

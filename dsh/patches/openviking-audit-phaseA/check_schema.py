import sqlite3, os
db = os.path.expanduser('~/.openviking/data/_system/usage_audit/usage_audit.sqlite3')
c = sqlite3.connect(db)
cols = [r[1] for r in c.execute('PRAGMA table_info(request_audit)')]
print('columns:', cols)
print('meta:', dict(c.execute('SELECT key, value FROM _schema_meta').fetchall()))

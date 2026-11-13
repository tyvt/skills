import json, os, sqlite3, time, urllib.request, urllib.error

base = 'http://127.0.0.1:1933'
db = os.path.expanduser('~/.openviking/data/_system/usage_audit/usage_audit.sqlite3')

# 1) trigger a 422 validation error on find (bad body), with caller header
req = urllib.request.Request(base + '/api/v1/search/find', data=b'{"wrong_field":1}',
                             headers={'Content-Type': 'application/json', 'X-OpenViking-Caller': 'probe-test'},
                             method='POST')
try:
    urllib.request.urlopen(req, timeout=30)
    print('unexpected 200')
except urllib.error.HTTPError as e:
    print('probe status:', e.code)

time.sleep(3)
c = sqlite3.connect(db)
rows = list(c.execute(
    "SELECT request_id, caller, route, api_type, status_code, error_code FROM request_audit "
    "WHERE route LIKE '/api/v1/search/%' AND status_code >= 400 ORDER BY id DESC LIMIT 5"))
print('audit rows:', json.dumps(rows, ensure_ascii=False))
ok_caller = list(c.execute(
    "SELECT COUNT(*) FROM request_audit WHERE caller='probe-test'"))
print('rows with probe caller:', ok_caller[0][0])

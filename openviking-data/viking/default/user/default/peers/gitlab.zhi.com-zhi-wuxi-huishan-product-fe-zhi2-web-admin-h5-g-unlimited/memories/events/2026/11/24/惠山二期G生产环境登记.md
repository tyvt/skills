# Summary
2026-11-24 在部署面板（端口 18098）登记惠山二期G 生产环境：站点 `http://www.hsqhoafunds.cn:5777/`，port 5777、port_base 5773，并补全 ASCII key 与 dist_root 等必填列；用户提供的管理员密码不存明文，保存为隐私引用写入 `env_accounts.secret_ref` 并注入看板内存，reveal 校验成功。
# 2026-11-24 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6950
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: The target key must be ASCII. Let me save with an ASCII key.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Now register the prod environment. Let me see the full CLI arguments.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Let me verify port 5777 isn't already used, then register the prod environment.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Port 5777 is free. Let me register the prod environment (password stays as a privacy placeholder, never plaintext in the registry).
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Need `port_base` too. Per the port rule (prod index=4), port_base = 5777−4 = 5773. The viking:// notice is expected data (a privacy reference), not a file path.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Let me inspect the schema's NOT NULL columns in one shot to satisfy them all.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Need `dist_root`. Let me supply all required fields at once.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Prod env registered with password as a privacy reference (never plaintext in registry). Now let me verify the site address and log in via agent-browser. First let me resolve the password.
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Now let me check the board's secrets inject API and find the dashboard port.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Board is on 18098. Let me check the inject API's expected payload from the dashboard source.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: The inject API needs a token. Let me check the auth mechanism and then inject.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: The redaction is mangling the hashtable because of a token-like value. Let me avoid inline hashtables entirely — use a Python script that reads the payload file and does the HTTP POST.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: Password is now in the board DB (`env_accounts.secret_ref` = privacy placeholder) and injected into board memory (reveal OK). Now let me regenerate the nginx conf from the registry so local 8119 proxies `/api/v2.0/` to production, then reload.

<!-- MEMORY_FIELDS
{
  "event_name": "惠山二期G生产环境登记",
  "goal": "登记生产环境与凭据",
  "summary": "2026-11-24 在部署面板（端口 18098）登记惠山二期G 生产环境：站点 `http://www.hsqhoafunds.cn:5777/`，port 5777、port_base 5773，并补全 ASCII key 与 dist_root 等必填列；用户提供的管理员密码不存明文，保存为隐私引用写入 `env_accounts.secret_ref` 并注入看板内存，reveal 校验成功。",
  "ranges": "0,115-129,193-212",
  "source_extraction_id": "167d821d1dd24e2d9d22c3c8445cedad",
  "version": 1,
  "memory_type": "events"
}
-->
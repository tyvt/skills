# Summary
用户要求把惠山二期G 的部署移动到部署看板的正确位置。2026-11-24 助手删除看板中 prod（5777）与 local（8119）两条登记，新增 dev 槽位 8120，账号为 {{ov_privacy:default:viking://~/privacy/credential/deploy_env-huishan-g-dev#/values/username}} 并以隐私引用 `deploy_env-huishan-g-dev` 存 `env_accounts.secret_ref`；改动直改 `registry.sqlite`，先备份并留审计。
# 2026-11-24 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: 部署要移动到部署看板的正确位置
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: 按你的三项选择执行。先写迁移脚本（sqlite 变更含中文+隐私占位符，避免 pwsh 脱敏），备份后删 local/prod、新增 dev(8120) 槽位 + {{ov_privacy:default:viking://~/privacy/credential/deploy_env-huishan-g-dev#/values/username}} 账号：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: registry 已迁移：dev(8120) 槽位就位，local/prod 已删，账号 {{ov_privacy:default:viking://~/privacy/credential/deploy_env-huishan-g-dev#/values/username}}。现在需要让 nginx 监听 8120。当前 conf 是 `惠山二期G.conf` 监听 8119。用户选"新端口 8120"，需新建/改 conf。按部署偏好，站点 conf 由 gen_nginx_sites.ps1 从 registry 生成——但它生成到 `env-sites/` 且会覆盖所有项目。更稳的是直接改现有 `惠山二期G.conf` 的 listen 8119→8120（它就是该项目的站点，backend 已是 dev 网关）。先确认没有别的项目占用 8120：

<!-- MEMORY_FIELDS
{
  "event_name": "部署登记迁移为dev槽位",
  "goal": "迁移部署登记",
  "summary": "用户要求把惠山二期G 的部署移动到部署看板的正确位置。2026-11-24 助手删除看板中 prod（5777）与 local（8119）两条登记，新增 dev 槽位 8120，账号为 {{ov_privacy:default:viking://~/privacy/credential/deploy_env-huishan-g-dev#/values/username}} 并以隐私引用 `deploy_env-huishan-g-dev` 存 `env_accounts.secret_ref`；改动直改 `registry.sqlite`，先备份并留审计。",
  "ranges": "47,59-63",
  "source_extraction_id": "48d748d456314af599afc4c2bd446440",
  "version": 1,
  "memory_type": "events"
}
-->
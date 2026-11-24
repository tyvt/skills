# Summary
2026-11-24 在部署注册表新增 `suzhufang-g/test` 环境，端口取 port_base+2=8167；密码通过 privacy 引用 `deploy_env-huishan-g-dev` 注入看板内存（明文不入库），看板 reveal 返回真实值。
# 2026-11-24 (Tuesday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 关键点已明确：`query_env.py` 按 `project`='苏住房G' 查（非 project_key），当前只有 local=8165。用户要"迁到 test 栏位"，test 端口应为 port_base+2=8167。需确认 upsert 写库逻辑与唯一约束，再决定迁移方式。读 upsert 核心段 + 索引。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 先做事实核查：确认 upsert CLI 参数名 + 当前 8165 验证码接口状态。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 验证码接口当前返回 index.html（缺 v2.0 代理），确认需修。但 gen 模板 `/api/v2.0/ { proxy_pass __GATEWAY__; }` 若 __GATEWAY__ 带尾斜杠会丢前缀导致 404——必须先确认 gen 脚本的模板选择与 gateway 替换逻辑，避免 sync 后仍坏。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 确认关键事实：苏住房G 走 `fdcApi` 模板（line 119：非 portal），该模板**没有 v2.0 代理**——所以单跑 sync 也不会修好验证码。正解＝给 fdcApi 模板补 v2.0 恒等 rewrite location，再 upsert test 环境、sync 收敛。网关直连路径保持 `/api/v2.0/` 前缀（不能像 v3.0 那样去掉 api）。

三步并行：改 gen 模板 + upsert test 环境 + 验证网关验证码。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: upsert 成功，验证码 base64 正常（guard 为占位符误报）。现在注入密码到看板内存。先解析真实密码 + 确认看板端口。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: PowerShell 解析问题，改用变量分步构造。先看 authorized 的 header 名。

<!-- MEMORY_FIELDS
{
  "event_name": "苏住房G test 环境注册",
  "goal": "迁到 test 栏位",
  "summary": "2026-11-24 在部署注册表新增 `suzhufang-g/test` 环境，端口取 port_base+2=8167；密码通过 privacy 引用 `deploy_env-huishan-g-dev` 注入看板内存（明文不入库），看板 reveal 返回真实值。",
  "ranges": "35,41-51",
  "source_extraction_id": "f8303174bada44ae9cff759a99ae421c",
  "version": 1,
  "memory_type": "events"
}
-->
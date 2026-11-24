# 苏住房G 环境注册与 nginx 站点
苏住房G 的 local/test 站点由注册表经 `gen_nginx_sites.ps1` 生成、`sync.ps1` 收敛，2026-11-24 修好了验证码接口的 v2.0 代理。

## 注册表与端口
- 注册表 project key 为 `suzhufang-g`；`query_env.py` 按 `project`='苏住房G' 查询（不是 project_key），原先只有 local=8165、`secret_ref=None`。
- test 栏位端口为 port_base+2 即 8167；2026-11-24 用 upsert 注册 `suzhufang-g/test`(8167)。
- 密码不入库：走 privacy 库 `deploy_env-huishan-g-dev` 引用 + 看板内存 inject，看板 `reveal` 可返回真实值。
- 旧 `sites-enabled/苏住房G.conf` 监听 8101（dev 网关），与 8165/8167 无端口冲突；新生成的 `env-sites/苏住房G-local.conf`(8165)、`苏住房G-test.conf`(8167) 接管两端口。
- `nginx.conf` 同时 include `sites-enabled` 与 `env-sites`；`nginx -t` 需带 `-p D:\nginx\` 工作目录，否则相对路径报错。

## v2.0 验证码 500 根因
- `/api/v2.0/code` 返回 500 且 `x-proxy-url: http:///v2.0/code` 的 host 为空：`proxy_set_header Host $host` 传了 localhost，测试网关按 Host 路由失败；直连网关时该头是真实 host 并返回 200。
- 修法：Host 改为按项目网关域名设置，模板新增 `__GATEWAY_HOST__` 占位符，从网关 URL 提取 host；修复后 8165/8167 验证码接口均返回 200 JSON。
- 苏住房G 走 `fdcApi` 模板（非 portal），该模板原本没有 v2.0 代理，需补 `/api/v2.0/` 恒等 rewrite location；网关直连路径必须保留 `/api/v2.0/` 前缀（不能像 v3.0 那样去掉 api）。

## 生成脚本与 sync
- `gen_nginx_sites.ps1` 顶部标注 DO NOT EDIT，但改注册表后重新生成是正解；2026-11-24 共修 4 处：v2.0 恒等 rewrite、Host 用 `__GATEWAY_HOST__`、`root` 指令路径加引号（修 `太仓一网通办H5-dev.conf` 空格路径报错）、跳过 `backend_gateway` 为空的记录（`靖江商品房-local.conf` 曾生成空 proxy_pass）；重生成 34 个 conf + `nginx -t` + reload 通过。
- `sync.ps1` 在 reload（line 103）后崩于 line 110 探活对比（`$preMap` 为 null），不触发回滚；可绕过 sync 直接 gen → `nginx -t` → reload。
- sync 崩在探活对比时生成与 reload 可能已完成，应直接 curl 验证码接口判断结果，而非依赖 sync 退出码。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "suzhufang_nginx_env",
  "source_extraction_id": "f8303174bada44ae9cff759a99ae421c",
  "version": 1,
  "memory_type": "entities"
}
-->
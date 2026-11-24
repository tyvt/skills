# 苏住房G本地部署环境
苏住房G（zhi2-web-admin-h5-g-unlimited）在本机通过部署看板注册的本地 nginx 静态站点环境，用于实机验证前端改动。

## 环境配置
- 2026-11-24 用 upsert_env.py 注册 local 环境：port=8165，dist_root 指向父仓根 `D:\repository\苏住房G\dist`，backend_gateway 取项目 .env 的测试网关（网关可达，返回 200）。
- 站点 conf 由 gen_nginx_sites.ps1 生成，文件名 `苏住房G-local.conf`；nginx 位于 `D:\nginx`，nginx.conf 已 include `env-sites/*.conf`，sync.ps1 负责收敛配置 + nginx -t + reload。
- nginx -t 需用 `-p` 指定 prefix（cwd 不对会报相对路径错误）；sync.ps1 报错只出现在后置统计逻辑，实际 reload 已成功（8165 返回 200）。
- 部署看板以 pythonw 运行在 18098 端口，`/api/state` 可访问；部署面板此前未注册「苏住房G」项目，也无该项目登录账号。

## 已知缺陷
- 自动生成的站点 conf 只代理 `/api/v3.0/`，苏住房业务接口为 `/api/v2.0/`：登录验证码 `/api/v2.0/code` 被 SPA fallback 成 HTML，验证码图片为 `data:image/gif;base64,undefined`。
- 待办修复：conf 补 `/api/v2.0/` 代理后 reload，再走登录与页面验证。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "部署环境",
  "name": "suzhufang_local_deploy",
  "source_extraction_id": "1a0e7b46db974b45bfcadd1f5fbc4962",
  "version": 1,
  "memory_type": "entities"
}
-->
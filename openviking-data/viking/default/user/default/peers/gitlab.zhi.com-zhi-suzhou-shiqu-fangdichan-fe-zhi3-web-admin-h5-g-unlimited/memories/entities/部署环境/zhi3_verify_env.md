# zhi3 验证环境（8098 / 9002）
苏州房产管理端 H5（zhi3-web-admin-h5）联调与实机验证所用的本地 nginx 站点、后端环境与验证入口。

## 端口与代理
- 8098 为本地主验证站点：静态服务父仓 `dist/`，`/api/v3.0/` 代理到 `58.210.252.230:9002`，即需求中的「专用端口常驻代理 9002」；「8098 本地后端 502 不可用」为过时结论，无需另建端口或上传 9002。
- 8101 为并行项目「苏住房智慧物业管理平台」（苏住房G）站点，8102 同为多环境站点，二者 env-sites conf 均代理 `127.0.0.1:8080`；主 nginx include `sites-enabled/*.conf` 与 `conf.d/*.conf`；8105 端口空闲。
- 9002 是唯一已证实可登录、含测试数据的真实环境，其重新部署无 SSH 通道；隐私库无 9002 凭据。

## 本地后端与构建
- 后端仓为 dev 分支、4 处改动完整；framework jar 原早于修复代码必须重打包（JDK21 已就绪，新 jar 11:29:21），gateway jar 代码未改可复用。
- 起序 framework 9211 → gateway 8080，均后台启动并注册 Nacos dev 命名空间 `suzhou-shiqu-fangchanzonghe`，framework 日志 `Started in 19.53s`；8098 nginx 早已监听（PID 19508），dist 为 2026-11-24 10:24 构建产物。
- 2026-11-24 `npm run build` exit 0，产物 gitHash 9a324be7f（新产物 `index-MrL8Ylkn.js`）。
- 门控流程：build → 确认验证环境 → agent-browser 实机验证 → 截图入会话+用户确认 → 提交推送 → 禅道回写 → 清理。

## 账号与会话
- 区县测试账号 `6001039` / `ZS0001Aa!`，凭据出自禅道 6891 工单 steps（hop1 曾据此登录「测试吴中区」，2026-11-24 复核密码）。
- 实机验证用自有 agent-browser 会话（如 `zt6891-cc910e265cf3`），机器上有并行任务会话（bug6899/bug6909）不可混用。

<!-- MEMORY_FIELDS
{
  "category": "部署环境",
  "name": "zhi3_verify_env",
  "source_extraction_id": "26ec69cd8b614a4c8ea1e96576b5a8c9",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 6,
  "memory_type": "entities"
}
-->
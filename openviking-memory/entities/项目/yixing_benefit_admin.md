# 宜兴公共收益 zhi2-web-admin H5
宜兴公共收益后台项目使用 GitLab `gitlab.zhi.com-zhi-wuxi-yixing-benefit-fe-zhi2-web-admin-h5-g-unlimited`，主仓含 `zhi2-web-admin` 子模块，分支 `develop/v2.6.1-yixing`。

## 构建与配置
- 生产构建命令为 `npm run build`（`vite build --logLevel error`），Vite 从主仓 `env/` 目录加载 `.env.production`，产物输出到主仓 `dist/`。
- `VoteQrcodeDialog` 用 `VITE_APP_OWNER_DECISION_DETAIL_URL` 加 `?id=${decisionId}` 生成表决二维码，选举二维码用 `VITE_APP_OWNER_ELECT_DETAIL_URL`。
- 2026-11-05 修复后的生产配置为 `VITE_APP_OWNER_DECISION_DETAIL_URL = "http://61.177.132.131:3080/#/pages_owner/decision/detail"` 与 `VITE_APP_OWNER_ELECT_DETAIL_URL = "http://61.177.132.131:3080/#/pages_owner/elect/detail"`。
- 生产 env 未定义 `VITE_APP_MOBILE_NAME`，会影响 `appName`「XX扫一扫」文案显示（当时判定为表面问题）。

## 二维码缺陷与修复
- 用户报告生产打包表决二维码错误，扫描结果为 `http://61.177.132.131:3080/?id=2117870449618182144#/`。
- 未加引号的 URL 值在 `loadEnv` 中从 `#` 处截断，导致原配置只保留 `http://61.177.132.131:3080/`；旧线上 `dist` 还曾是 2026-08-10 构建并内嵌 `undefined?id=`。
- 修复在独立 worktree `fix/qrcode-env-hash` 提交 `d6e4837`，并 fast-forward 合回 `develop/v2.6.1`；主工作区与 worktree 均已清理。
- 清理并重建主仓 `dist/` 后，`VoteQrcodeDialog` 仅剩一个 chunk，编码完整 `http://61.177.132.131:3080/#/pages_owner/decision/detail?id=${decisionId}`。

## 验证结果
- 全 `dist` 扫描无 `undefined?id=` 残留；表决/选举两处 URL 均为完整路径。
- `version.json` 记录 `buildTime 2026/11/5 14:49`、`env production`、`gitHash 6e05d89b0`。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "yixing_benefit_admin",
  "source_extraction_id": "49213c6f3b7c44fda78dc446b7199b48",
  "version": 1,
  "memory_type": "entities"
}
-->
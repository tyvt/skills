# 惠山二期G 前端项目
惠山二期G 是公司内部的物业与资金管理前端项目，主仓以子模块方式管理 web-admin-h5（zhi2-web-admin-h5）等前端工程。

## 仓库与工程
- 前端子模块为 zhi2-web-admin-h5，缺陷常落在页面源码如 `detail.vue`（如 `detail.vue:1195` 的作废方法）。
- 受保护文件 `public/version.json` 与 `.task-state/`、`_review.json`、`report.html` 属过程产物，不纳入提交。
- 资金拨付相关真实路由为 `/ShFund/leaseManagement/FundUse/pubAllotNotice` 列表与 `/:tableid` 详情，由 addRoute 动态注入。

## 开发与验证环境
- 本机 nginx dev 网关实际监听 8120，交接文档记载的 8119 已拒绝连接；nginx 曾在 2026-11-24 17:46–17:47 重启。
- 登录 token 存于 sessionStorage，切换端口（origin）后需重新登录并识别 data:image 验证码。
- 构建命令为 `node scripts/vite-build.mjs build`，产物 `version.json.gitHash` 需与 HEAD 提交哈希一致。

## 流程协作
- 禅道库产品 10、项目 193、执行 194；回写通过 dbx 事务：UPDATE zt_bug + INSERT zt_action 附验证图。
- 长任务按 hop 链交接，交接文档存放于 D:/plan/惠山二期G/ 目录。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "前端项目",
  "name": "huishan_phase2_g",
  "source_extraction_id": "31e7772bd473497381850d5010733a88",
  "version": 1,
  "memory_type": "entities"
}
-->
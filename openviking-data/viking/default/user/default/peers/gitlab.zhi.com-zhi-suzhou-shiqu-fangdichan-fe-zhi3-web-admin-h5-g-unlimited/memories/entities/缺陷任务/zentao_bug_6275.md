# 禅道Bug 6275 预售方案维护返回后楼幢列表清空
房产管理系统zhi2-web-admin中预售许可申请详情页，从「预售方案→维护」返回后「预售楼幢列表」被清空，再次点维护提示「请先选择预售楼幢并确认房屋…」。

## 根因与定位
- 页面：预售许可申请详情页 presale/permit/components/detail.vue 及 permitConstants.js
- 返回地址用 `${fullPath}&restore=1`，在 hash 路由且无 query 时 `restore` 进不了 `$route.query`
- 只有新增态写草稿；编辑态（首次保存后进 edit）未快照 `selectedBuildings`，返回时 `getDetail` 把未落库楼幢覆盖成空

## 修复方案
- permitConstants.js：`buildPermitApplyReturnPath` / `restorePlanNav` 改用 query、`PERMIT_PLAN_NAV_DRAFT_KEY`
- detail.vue：跳转前 `savePlanNavDraft`；返回 `tryRestorePlanNavDraft`；`detailCallback` 优先用快照楼幢

## 验证与交付
- ESLint 通过；`npm run build` 成功（buildTime 2026/11/6 11:44:15）
- 子模块 zhi2-web-admin 分支 `fix/zentao-6275-permit-plan-restore` 提交 `c3d746631` 推送
- 父仓库 `develop/v3.0.0` 提交 `17b0a9d`（已 push）
- nginx 站点 8098 刷新 dist 后复测：选楼幢 → 维护方案 → 返回，楼幢列表应仍在

## 禅道回写与未验证
- #6275 回写 status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=lichandan，备注含根因与提交号
- 未验证：未在浏览器对 nginx 部署站点手工点测（需用户本地刷新构建产物后确认）
- 临时截图 `.tmp-bug6275-*.png` 仍在工作区，未提交

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6275",
  "source_extraction_id": "831e3a244b4545be974d1a6b5e2b3a46",
  "version": 1,
  "memory_type": "entities"
}
-->
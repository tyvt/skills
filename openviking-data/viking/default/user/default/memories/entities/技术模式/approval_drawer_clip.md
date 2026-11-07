# 审批流程抽屉高度裁切修复模式
详情页「流程信息」审批抽屉因 top 偏移未同步调整 height，导致底部被裁切、时间线无法滚动。

## 根因
- `.attachment .el-drawer` 仅设置 `top: var(--navbar-height, 88px)` 避开顶栏，保留 Element UI 默认 `height:100%`
- 抽屉在 `position:fixed; overflow:hidden` 的 `.el-drawer__wrapper`（满视口）内被顶下 88px、高度仍满视口
- 底部 88px 连同滚动条被裁掉，审批时间线滚不到最后一条

## 修复
- 在 `attachmentDraw.vue` 的 `.attachment .el-drawer` 增加 `height: calc(100% - var(--navbar-height, 88px))`
- 纯样式修复，未改共享 `ApprovalProcess` 组件，影响面最小

## 验证
- Playwright 加载真实 Element-UI + 项目 CSS 验证：修复前抽屉 bottom=988 超出视口 900 被裁 88px，修复后 bottom=900 不再裁切
- eslint 通过、npm run build 成功，dist 部署至本地 nginx 站点（8098）

## 关联排查
- `priceFiling` 的 `recordPriceMngSuzhou/detail.vue`、`changeDetail.vue` 存在相同 `top: var(--navbar-height,88px)` 写法，可能同源
- 涉及文件：src/components/OperationBtnGroup/attachmentDraw.vue（约 157-162 行）
- 所属项目：苏州市房地产监测V3（zhi3-web-admin-h5-g-unlimited）；来源：禅道 Bug 6207 修复

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "approval_drawer_clip",
  "source_extraction_id": "78b1d9dc5c0447c0af063b3b6449356e",
  "version": 1,
  "memory_type": "entities"
}
-->
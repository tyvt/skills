# 预售合同签订列表工具栏按钮颜色修复
苏州市房地产监测V3 中预售/现售签订列表与合同撤销列表工具栏按钮去掉 plain 样式，统一实心配色。

## 代码侧改动
- 预售/现售签订列表与合同撤销列表工具栏去掉 plain
- 显示/新增为实心蓝，删除仍为实心红

## E2E 说明
- test:e2e:contract-sign-pre 未通过原因为 Playwright 账号路由无「预售合同签订」菜单授权，非按钮样式改动
- 若需自动化回归，给 E2E 账号开通「预售合同签订」菜单后重跑 npm run test:e2e:contract-sign-pre
- 否则在页面刷新后目视确认即可

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：commercialHousingSales/presale/contractView/index.vue、mixins/ListTemplate.js
- 所属项目：苏州市房地产监测V3；来源会话ID：a816325c-00a0-41f5-b764-20f675698e98

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_toolbar_button_fix",
  "source_extraction_id": "ad9c255ef9424451b286246018dc4061",
  "version": 1,
  "memory_type": "entities"
}
-->
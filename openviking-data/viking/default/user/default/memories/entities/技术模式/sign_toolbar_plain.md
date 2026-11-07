# 签订撤销列表工具栏去plain改色
苏州市房地产监测V3 中预售/现售签订列表与合同撤销列表工具栏移除 plain 并改为实心配色。

## 变更要点
- 预售/现售签订列表与合同撤销列表工具栏移除 `plain`
- 显示/新增按钮为实心蓝，删除按钮为实心红

## 根因与验证
- E2E `test:e2e:contract-sign-pre` 未通过根因为 Playwright 账号缺 `commercialHousingSales/presale/contractMainInfo/index` 菜单授权，非样式改动
- 需开通菜单重跑 `npm run test:e2e:contract-sign-pre` 或目视确认
- 验证证据：src=苏州市房地产监测V3/038.md
- 涉及文件：contractView/index.vue、ListTemplate.js、table.js、路由信息.json、index.scss、main.js、tableComponents.js、complex/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：a816325c-00a0-41f5-b764-20f675698e98；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sign_toolbar_plain",
  "source_extraction_id": "f6b75d3a1aac4e18b8e906f5b0ed4a14",
  "version": 1,
  "memory_type": "entities"
}
-->

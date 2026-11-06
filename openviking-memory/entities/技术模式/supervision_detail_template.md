# 监管弹窗视图态DetailTemplate改造
苏州市房地产监测V3 中监管协议签署与监管项目详情弹窗的查看态已统一改为 DetailTemplate 展示。

## 改造范围
- AgreementDetailsDialog.vue（监管协议签署）：dialogFormMode === 'view' 时使用 DetailTemplate + contentInfo（DETAIL_COL_THREE，含金额/字典/终止路由三字段）
- SupervisionAddDialog.vue（监管项目）：查看态同样用 DetailTemplate，字段映射 buildingNo、regulatorArea、regulatorCoefficient 等

## 保留逻辑
- 编辑/新增仍为原 zs-form 两列布局
- onClose 仅在存在 form ref 时 resetFields，避免查看态报错
- 初始监管额度优先用 computed initRegulatorAmount

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：AgreementDetailsDialog.vue、SupervisionAddDialog.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：bc903b36-7052-4ddc-aedf-6e3989f4a460

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervision_detail_template",
  "source_extraction_id": "2ce6e05076dc4191b626041ebd65d301",
  "version": 1,
  "memory_type": "entities"
}
-->
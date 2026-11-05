# 行业管理模块默认筛选「已备案」设置（苏住房G）
苏住房G 行业管理多个功能模块已统一设置默认筛选「已备案」（`bizState = '2'`）。

## 设置说明
- 统一使用业务状态字典 `biz_state`，「已备案」对应值为 `'2'`
- 进入列表页默认只展示已备案单据，点击「重置」后恢复该默认值

## 涉及模块与文件
- 物业服务企业：`companyManagement/components/index.vue` + `property/index.vue`（通过 `defaultBizState="2"` 仅作用于物业服务企业）
- 项目经理 / 项目经理变更：`staffManagement/components/index.vue`（同时补充业务状态筛选项）
- 企业备案记录：`companyRegister/index.vue`
- 信用申报（基础/良好/不良）：`creditDeclarationComponents/index.vue`（三模块共用）
- 信用申诉 evaluationAppeal/index.vue、信用修复 evaluationRepair/index.vue（整改通知书 rectificationNotice/index.vue 后续已改为默认空，见 rectification_bizstate_default）

## 验证与归属
- 所属项目：苏住房G；来源会话：d1f455f2-9331-4d8b-a85b-75d98eb12551；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "industry_bizstate_filter",
  "source_extraction_id": "abdb91ea921d455b818bda502a994c7b",
  "version": 2,
  "memory_type": "entities"
}
-->
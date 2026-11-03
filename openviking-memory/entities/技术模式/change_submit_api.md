# 备案变更提交URL硬编码或走菜单配置
companyRecordChange 提交 API 在 companyRecord.js 硬编码或由详情页自定义按钮触发，通用流程走菜单 route.meta.submitApi 拼接 /{module}/{business}/submit。

## 功能约定
- companyRecordChange 提交 API 在 companyRecord.js 硬编码或由详情页自定义按钮触发
- 通用流程走菜单 route.meta.submitApi 拼接 /{module}/{business}/submit

## 配置说明
- 项目配置接口指菜单与流程配置的 submitApi，非 getConfig 系统参数

## 验证与归属
- 验证证据：extracted source=zcode session=sess_subagent_agent_32ae3baa-dc60-4f4e-9648-7b6613f2071c
- 涉及文件：companyRecord.js
- 来源会话ID：sess_subagent_agent_32ae3baa-dc60-4f4e-9648-7b6613f2071c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_submit_api",
  "source_extraction_id": "51f806c5ee534d2b8091b45602152e6a",
  "version": 1,
  "memory_type": "entities"
}
-->
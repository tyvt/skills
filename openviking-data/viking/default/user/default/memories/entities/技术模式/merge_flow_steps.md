# homeLayout 合并流程步骤保留本地 label
首页业务流程步骤文案以 homeLayout.js 默认配置为准，mergeFlowSteps 合并接口配置时保留 defaultStep.label。

## 实现方式
- `mergeFlowSteps`（或同类合并逻辑）合并后端/接口配置时会保留 `defaultStep.label`
- 改展示名（如 `rentalAgencyOpen` 从「机构开业」改为「租赁企业管理」）只需改本地 label，`functionCode` 可不变以保留跳转
- 刷新首页即可生效

## 验证与归属
- 验证证据：租赁第一个菜单改文案，改 rentalAgencyOpen 的 label，说明 mergeFlowSteps 保留 defaultStep.label，functionCode 未改
- 涉及文件：zhi2-web-admin/src/views/home/config/homeLayout.js
- 所属项目：门户；来源会话ID：1e072e34-5059-46b8-85d0-5fcb2d449dfd；代码基线：8c17ba3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "merge_flow_steps",
  "source_extraction_id": "31f13fc945de4a1380d778018b63e80a",
  "version": 1,
  "memory_type": "entities"
}
-->
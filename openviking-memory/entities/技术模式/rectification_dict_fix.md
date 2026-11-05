# 整改通知书业务状态字典统一修复
苏住房G项目修复整改通知书列表因字典不一致导致「已备案/审核中」筛选结果相反的缺陷。

## 问题根因
- 查询条件下拉使用 BIZ_STATE 字典，其中「已备案」与「审核中」值与后端不一致
- 列表展示使用 biz_state 全局字典（1=审核中，2=已备案）
- 选「已备案」实际传 status=1 查出审核中数据，选「审核中」传 status=2 查出已备案数据

## 修复方案
- 在 rectificationNotice/index.vue 将业务状态字典统一为 biz_state
- 与同模块申诉、修复页面及列表展示逻辑保持一致
- 修复后选「已备案」传 bizState=2，选「审核中」传 bizState=1

## 验证与归属
- 所属项目：苏住房G；来源会话：d13d65c9-9c9c-46c7-a385-c74d24a4cbbb
- 验证证据：extracted source=cursor project=苏住房G；涉及 rectificationNotice/index.vue 等

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rectification_dict_fix",
  "source_extraction_id": "6dfa41e409fd42828fcd0b8d43f5a968",
  "version": 1,
  "memory_type": "entities"
}
-->
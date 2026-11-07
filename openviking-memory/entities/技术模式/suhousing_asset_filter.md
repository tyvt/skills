# 资产部位弹窗过滤修复（苏住房G）
苏住房G 项目资产部位新增时选择资产弹窗带出未备案经营用房的修复记录。

## 问题根因
- 接口只传了 forPart:'1'，未按经营用房主单备案状态过滤
- 弹窗默认 bizState:2 作用在明细上，拦不住主单仍为「审核中」的数据

## 修复方案
- housePart/index.vue 请求增加 houseBizState:'2'，B 端附带 projectId
- 未备案行不可选，确定时二次拦截
- 若列表仍显示未备案数据，需后端在 forPart=1 查询里支持 houseBizState 过滤

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：views/benefit/housePart/index.vue、views/benefit/pubHouse/index.vue
- 所属项目：苏住房G；来源会话：ae403e03-b7dd-4d19-be74-3b70c0306a26

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suhousing_asset_filter",
  "source_extraction_id": "65c1d962f20549ccb0401f3b58973a8c",
  "version": 1,
  "memory_type": "entities"
}
-->
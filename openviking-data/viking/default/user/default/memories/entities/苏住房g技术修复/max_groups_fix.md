# 物业管理区域查询条件组数量限制修复（苏住房G）
苏住房G 项目修复物业管理区域查询页条件组最多只能一个的限制，改为最多两个。

## 问题原因
- 物业管理区域查询页将 `zs-advanced-query` 的 `max-groups` 设为 `1`，导致只能保留一个条件组，无法添加第二个

## 修复内容
- 将 `:max-groups="1"` 改为 `:max-groups="2"`

## 效果与验证
- 默认展示 1 个条件组，可再添加 1 个，最多 2 个
- 有 2 个条件组时可删除第二个，至少保留 1 个
- 条件组间可通过下拉框切换「且 / 或」关系

## 涉及文件与归属
- 涉及文件：`publicQuery/complex/index.vue`、`zs-advanced-query.vue`
- 所属项目：苏住房G；来源会话：20e31648-4d28-46f2-81a2-de9c591a691a；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "max_groups_fix",
  "source_extraction_id": "07c5dd5811794d2c87b3f9503f43828e",
  "version": 1,
  "memory_type": "entities"
}
-->
# getDetail 覆盖 form 并丢失账户类型
在苏州市房地产监测V3中的一个 bug，其中 getDetail() 在 view 模式下覆盖表单并丢失开户账户类型。

## 问题根因
- 在 view 模式下的 `getDetail()` 覆盖了整个 `form`；当接口未返回 `opensalesType` 时，账户类型丢失。
- `syncOpensalesTypeFromRoute()` 原本只在 add 模式下工作。

## 修复
- 添加 computed `opensalesType` 并回退至路由解析。
- 扩展 sync 函数以便在 form 没有值时写入，在 getDetail 之后补全。
- Template 使用该 computed 来控制字段和 Tab。

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：5c1b8a24-76c6-4187-b758-d05c9e6ba67e
- 验证证据: src=苏州市房地产监测V3/106.md
- 所属项目: 苏州市房地产监测V3; 会话: 5c1b8a24-76c6-4187-b758-d05c9e6ba67e; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "缺陷修复",
  "name": "getdetail_overwrite_bug",
  "source_extraction_id": "79cf24bafc744c04973bd842fa4e560f",
  "version": 1,
  "memory_type": "entities"
}
-->

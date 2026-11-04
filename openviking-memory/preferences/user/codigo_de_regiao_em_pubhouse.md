- 当提交 `/benefit/pubHouse` 时，添加 `regionCode` 并在选择物业管理区域时直接分配代码；B端默认将 `project.region` 填入 `regionCode`。
- 避免将 `subdistrict` 和 `community` 转换为名称，因为后端需要代码。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: pubHouse 中的区域代码",
  "source_extraction_id": "f43c7056662240278d1b1ff7669d9a4f",
  "version": 1,
  "memory_type": "preferences"
}
-->

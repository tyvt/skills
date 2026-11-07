- `src/components/Map/index.vue` 的 `doMapMark()` 将 TMap.LabelStyle 固定 `width:140` 改为 `getProjectNameLabelWidth()` 动态计算（`56+text.length*12`，限制 `128~260`）避免遮挡溢出。
- 验证证据：extracted source=cursor session=1cb883d4-8750-4517-a22e-737c45bc8eab；涉及文件：src/components/Map/index.vue；来源会话：1cb883d4-8750-4517-a22e-737c45bc8eab

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "TMap标签宽度动态估算",
  "source_extraction_id": "521472eab75e4ad389f3eebfdb229651",
  "version": 1,
  "memory_type": "preferences"
}
-->
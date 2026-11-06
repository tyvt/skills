# 物业管家详情页人员字段置灰缓存修复（苏住房G）
苏住房G 项目修复物业管家新增页选择物业服务人员后字段置灰，但切换 tab 再切回置灰失效的问题。

## 问题原因
- 字段置灰由 `isStaffFieldDisabled()` 依据 `staffForm` 判断；选择人员后写入 `staffForm`，已有值字段禁用
- `detailMixins` 切 tab 时只缓存 `form` 到 `sessionStorage`，不缓存 `staffForm`；切回后 `staffForm` 重置为 `{}`，置灰字段恢复可编辑

## 修复内容
- 在 `detail.vue` 新增 `staffFormStorageKey` 计算属性，监听 `staffForm` 变化并在新增/编辑模式写入 `sessionStorage`
- `formMode` 切换时恢复 `staffForm`，查看模式清除缓存，新增 `restoreStaffForm()` 方法

## 验证与归属
- 所属项目：苏住房G；来源会话：168b3d2f-548c-4a2d-98be-20ebeb4d6fb0；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：`propertyManager/detail.vue`、`detailMixins.js`、`form.js`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "staffform_cache_fix",
  "source_extraction_id": "6c711be48c694126ab487e463c9d3689",
  "version": 1,
  "memory_type": "entities"
}
-->
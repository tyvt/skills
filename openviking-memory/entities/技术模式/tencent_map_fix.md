# ZsTencentMap组件错误本地引用修复
产品2.0的ParcelDialog.vue与BaseProjectForm.vue因错误本地引用ZsTencentMap组件路径导致Internal server error，已修复。

## 根因
- `ParcelDialog.vue` 引用了不存在的路径 `@/views/projectManagement/project/zsTencentMap/index.vue`
- `ZsTencentMap` 实际位于 `@/components/ZsTencentMap/index.vue`，并在 `main.js` 中通过 `import.meta.glob` 全局注册为 `<zs-tencent-map>`
- `BaseProjectForm.vue` 存在同样的错误本地引用问题

## 修复内容
- 删除 `ParcelDialog.vue` 中两处错误本地 import 与 components 注册
- 删除 `BaseProjectForm.vue` 中两处错误本地 import 与 components 注册
- 模板中已有的 `<zs-tencent-map>` 直接使用全局注册组件，用法与 `venueDialog.vue`、`building/project/detail.vue` 一致

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`ParcelDialog.vue`、`BaseProjectForm.vue`、`@/components/ZsTencentMap/index.vue`、`main.js`
- 所属项目：产品2.0；来源会话：0ce851e8-bb59-473a-aaef-ab0400533ead；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tencent_map_fix",
  "source_extraction_id": "797be703d3f941b1800210066e40365e",
  "version": 1,
  "memory_type": "entities"
}
-->
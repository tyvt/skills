# Vue2 data 下划线属性未代理修复
苏住房G 物业复杂视图 RegionTreeLayout.vue 因 Vue2 不代理 data 中以 _ 或 $ 开头的属性，导致 mounted 调用时为 undefined 而报错。

## 问题现象
- RegionTreeLayout.vue 于 mounted 调用 this._containerHeightTimers 等为 undefined 而报错

## 根因
- Vue 2 不代理 data 中以 _ 或 $ 开头的属性至组件实例

## 解决方案
- 重命名 data 属性去除 _ 前缀（如 _containerHeightTimers → containerHeightTimers）
- 同步更新 mounted、beforeDestroy 及相关方法引用

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：src=苏住房G/097.md
- 涉及文件：zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue、zhi2-web-admin/src/views/property/complex/index.vue
- 所属项目：苏住房G；来源会话ID：9585b1b4-8f7c-4b98-81e1-bf7e7b44659c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "vue2_underscore_data",
  "source_extraction_id": "0b327b19dd11474793140628e1ae49e8",
  "version": 1,
  "memory_type": "entities"
}
-->
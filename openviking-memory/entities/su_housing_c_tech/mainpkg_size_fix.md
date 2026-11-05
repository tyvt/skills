# 主包上传体积超限构建失败修复
苏住房C 小程序因主包上传体积超限（2048KB）构建失败，已将仅单分包使用的组件移入对应分包解决。

## 问题根因
- 主包限制 2048KB，失败时预估 2055.4KB（超约7.4KB）
- `IntentionMyList` 组件放在全局 `src/components/` 但仅被 `pages_transaction/intention/list.vue` 使用，被打进主包占约14KB

## 修复要点
- 将组件移至 `src/pages_transaction/intention/components/IntentionMyList.vue`
- `list.vue` 改为相对路径导入
- 构建后主包上传预估 2046.0KB（余量约2KB），`npm run build` 成功

## 后续建议
- 主包余量小，新增全局组件优先放在对应分包目录避免再次超限

## 涉及文件
- `src/pages_transaction/intention/list.vue`
- `src/pages_transaction/intention/components/IntentionMyList.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：1a74b0e2-4eaa-4e2f-bfd6-30fad332f827
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "mainpkg_size_fix",
  "source_extraction_id": "613eaf05d69d4f6fb7772b66d4276670",
  "version": 1,
  "memory_type": "entities"
}
-->
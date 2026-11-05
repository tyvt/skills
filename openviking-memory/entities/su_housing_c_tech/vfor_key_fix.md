# 全局 v-for 缺失 key 排查补全
苏住房C 对 `zhi2-mobile-shimin/src` 下全部 `.vue` 模板扫描，发现并修复 8 处缺少 `:key` 的 `v-for`。

## 问题根因
- 多个 `.vue` 文件中的 `v-for` 未写 `:key`，可能引发列表渲染告警或状态错乱
- 扫描兼容多行标签并正确处理属性内的 `=>`

## 修复要点
- `components/ZsPicker/ZsPicker.vue` 选择器列表 `:key="index"`
- `pages_guard` 下 `step3.vue`、`packagingService/index.vue` 补 `:key="index"`
- `pages_main` 下 `publicNotice.vue` 及 `readPage` 两个文件补 `:key="index"` 或 `item.richTextId || index`
- `pages_my/robot/index.vue` 等其余文件补充 `:key`
- 共修复 8 处缺失 `:key` 的 `v-for`

## 涉及文件
- `zhi2-mobile-shimin/src` 下全部 `.vue` 模板
- 具体含上述 8 处文件

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：82ba9b4f-a6c5-499b-9c0c-8585ce86cdc9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "vfor_key_fix",
  "source_extraction_id": "8af34dd423d746b8b76e046dd6ee35eb",
  "version": 1,
  "memory_type": "entities"
}
-->
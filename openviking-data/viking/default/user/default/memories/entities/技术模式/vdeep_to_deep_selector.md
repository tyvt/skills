# 弃用 ::v-deep 组合符改 :deep()
Vue3 构建样式告警 ::v-deep 作为组合符已弃用，需全局改为函数式深度选择器。
## 问题描述
- 构建/样式告警 `::v-deep usage as a combinator has been deprecated`
- 旧写法 `::v-deep .foo` 作为组合符已弃用
## 根因
- Vue3 推荐函数式深度选择器 `:deep(inner-selector)`
## 解决方案
- 机械替换为 `:deep(.foo)`
- 外层有前缀如 `.text-right ::v-deep input` 写成 `.text-right :deep(input)`；媒体查询内同样处理
## 验证与归属
- 涉及文件：zhi2-web-admin/src/components/zs-select/zs-like-select.vue；zhi2-web-admin/src/views/benefit/bankDetailDay/index.vue
- 所属项目：2-0；代码基线：none
- 验证证据：会话 cebc7009 全局修复 ::v-deep，14 个 vue 文件改为 :deep(...) 后无残留
- 来源会话ID：cebc7009-c718-45fb-bfb7-d7a640b5b79f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vdeep_to_deep_selector",
  "source_extraction_id": "02b92ee3ef8445aa8281fd7042ea17fa",
  "version": 1,
  "memory_type": "entities"
}
-->
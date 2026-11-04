# H5 项目 UnoCSS 用 display-inline-block 而非 inline-block
H5 项目的 UnoCSS 由 uno.config.ts 中 display-(block|inline|inline-block|) 规则生成 display-inline-block 类名，不是原生 inline-block。

## 问题根因
- 项目中 UnoCSS 不识别 inline-block 这种原生类名
- 误用 inline-block 会导致元素撑满而非按内容自适应宽度

## 解决方案
- 在 src/pages_owner/decision/index.vue 将该标签的 inline-block 改为 display-inline-block
- 改造后元素按内容自适应宽度、不再撑满

## 验证与归属
- 验证证据：extracted source=cursor project=H5
- 涉及文件：uno.config.ts、src/pages_owner/decision/index.vue
- 来源会话：f8bfc1e1-de62-4572-bfc7-20b21efe668e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "h5_unocss_display",
  "source_extraction_id": "18b10a22986c4cf9b78c51c8d85f5db8",
  "version": 1,
  "memory_type": "entities"
}
-->
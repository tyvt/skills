# 带单位的输入后缀高度未对齐
在 zhi2-web-admin 中，带单位的输入后缀样式在高度上与输入框未对齐；通过 cherry-pick 到两个分支进行了调整。

## 问题根因
- 带单位的输入后缀样式高度与输入框未对齐

## 解决方案
- 子模块 zhi2-web-admin 调整了 detail.vue 及相关文件中的后缀样式
- 通过 cherry-pick 将提交应用到 develop/v2.6.2 和 develop/v2.6.2-yulin 分支
- 父仓库同步了子模块引用以避免整体合并冲突

## 文件和来源
- 涉及文件: src/styles/element-ui.scss, src/components/AmountInput/index.vue, src/components/zs-input/zs-input.vue, public/assets/css/element-ui.css, src/styles/index.scss, src/views/home/components/SearchInput.vue, src/views/property/localPropertyBid/detail.vue, vite.config.js
- 所属项目: 产品2.0; 会话: 1542c9a5-d487-4b61-a6aa-8a7eb0b7f7c8; base: none; 验证证据: 产品2.0/032.md

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "input_suffix_misalign",
  "source_extraction_id": "4d80bcc2a01b4c9daeb3c9c060bc1073",
  "version": 1,
  "memory_type": "entities"
}
-->
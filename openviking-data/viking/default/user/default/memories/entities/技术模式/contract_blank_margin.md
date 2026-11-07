# 填空输入框高度超行高致合同段落文字紧贴
苏州市房地产监测V3 中 `.s16-p` 正文行高约 27px，填空输入框固定 32px 高撑高行盒，导致上下行文字紧贴输入框边缘，已通过 margin 修复。

## 问题根因
- `.s16-p` 正文行高约 27px
- 填空输入框固定 32px 高，行盒被撑高
- 上下行文字紧贴输入框边缘

## 关键修复
- 在 `SzBlank.vue` 的 `.s16-blank` 添加 `margin: 4px 0`
- 全局生效于所有走 `SzBlank` 组件的填空

## 涉及文件
- zhi2-web-admin/src/views/contract/chapters/suzhou2016/chapter1.vue
- zhi2-web-admin/src/views/contract/chapters/suzhou2016/styles/sz-contract.scss
- zhi2-web-admin/src/views/contract/chapters/suzhou2016/components/SzBlank.vue
- zhi2-web-admin/docs/suzhou-2016-presale-contract-diff-checklist.md
- zhi2-web-admin/src/views/contract/chapters/suzhou2016/chapter2.vue
- zhi2-web-admin/src/views/contract/chapters/suzhou2016/components/SzChoice.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/198.md
- 来源会话：01a1617f-898e-7553-b4af-dfd05f1a27c1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_blank_margin",
  "source_extraction_id": "84a47ab3c126474bb760ae62e5ed52d2",
  "version": 1,
  "memory_type": "entities"
}
-->
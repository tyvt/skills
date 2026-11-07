# 填空输入框撑大行盒致合同行距紧贴
Suzhou 2016 presale contract pages had tight line spacing because SzBlank input boxes enlarged the line box.

## 现象
- .s16-p 行高约 27px，而 SzBlank 输入框固定 32px，撑大行盒使上下行文字紧贴。

## 根因
- zhi2-web-admin/src/views/contract/chapters/suzhou2016/components/SzBlank 中输入框高度固定 32px 超出文本行高。

## 解决方案
- 给 .s16-blank 添加 margin: 4px 0，全局合同页面统一生效。
- 修复落点含 chapter1.vue、sz-contract.scss、SzBlank、suzhou-2016-presale-contract-diff-checklist.md、chapter2.vue、SzChoice.vue。

## 关联信息
- 验证证据：src=苏州市房地产监测V3-leftover/002.md
- 来源会话：01a1617f-898e-7553-b4af-dfd05f1a27c1
- 项目：苏州市房地产监测V3（zhi2-web-admin）

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "szblank_linebox_overflow",
  "source_extraction_id": "c67ea4aee5d04fa28bdc88471a622b14",
  "version": 1,
  "memory_type": "entities"
}
-->
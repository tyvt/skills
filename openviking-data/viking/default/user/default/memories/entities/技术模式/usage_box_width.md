# 用途盒未全宽致与表单网格列不对齐
PropertyDetailDialog 用途盒原设固定宽与边距缩进悬空，违背全宽设计稿且列未并入表单网格，需移除固定尺寸撑满并归入同列。

## 根因
- PropertyDetailDialog.vue 中用途盒子设 width:343px 与 margin-left:162px 缩进悬空
- 违背设计稿 ref-23 全宽要求且内部列未并入表单网格

## 修复方案
- 移除固定宽与边距使盒子撑满内容区
- 盒内住宅/非住宅标签右对齐至 150px 冒号线、值列从 162px 起与上方字段同列

## 涉及文件
- zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue
- zhi2-web-admin/dist/assets/PropertyDetailDialog--5gpjq8D.css
- zhi2-web-admin/tests/e2e/fixtures/public-portal-designs.ts
- zhi2-web-admin/.align-check.html
- zhi2-web-admin/tests/e2e/public-portal-visual.spec.ts

## 验证与归属
- 验证证据：门户/023.md
- 来源会话ID：4a4203bc-48d8-4917-bc43-0e44f3be6bdd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "usage_box_width",
  "source_extraction_id": "87dc3c1f529f4b5fb5a8a756193bd67c",
  "version": 1,
  "memory_type": "entities"
}
-->
# 详情页表单项与折叠面板间距全局统一
苏州市房地产监测V3 中详情页间距变量语义化并全局统一纵向间距。

## 变更点
- variables.css 明确 --detail-section-gap(16px) 与 --detail-block-gap(12px) 语义，并将 --detail-section-form-row-gap 改为 var(--detail-block-gap) 避免漂移
- index.scss 统一 detail-from-container 纵向间距为 16px，上浮 .basic-appendix-row 栅格并取消内部 margin 叠加
- 全局化 .supervise-bank-row > .collapse-container 高度规则并删除冲突的 .detail-from-container.el-row { gap: 0 }

## 涉及文件
- styles/detail-form.scss
- e2e/utils/appendix-requirement-grid.spec.js
- styles/index.scss
- presale/surveyChange/detail.vue
- styles/variables.css
- supervision/bank/superviseBank/detail.vue
- presale/permitExtend/detail.vue
- presale/permit/plan/detail.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/134.md e src=苏州市房地产监测V3/169.md
- 来源会话：5c76bcbe-41b3-4397-80d0-5a0934fb8fbd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_spacing_unify",
  "source_extraction_id": "77174234a0a04fd3bf6b0d9c3b1c7f88",
  "version": 2,
  "memory_type": "entities"
}
-->
# 公开门户二级页表单标签与值左对齐
首页下所有公开门户二级页要求表单/摘要区标签列与值列均左对齐。
## 样式分工
- 共享样式放在 publicPortal/portal.scss，勿在全局耦合仅某一页用的 property-summary-* 类
- 页面专属类（如 property-summary-*）留在对应页（PropertyPages）的 scoped 样式中
## 实现要点
- Information 等页的 .portal-summary-label 需显式 text-align: left
- Vue3 深度选择器统一用 :deep()，避免继续写 ::v-deep
## 文档与验证
- README 记录左对齐范围及经纪/租赁等无可见 field.label 的例外
- 合并前建议跑 npm run test:e2e:public-portal 做公开门户回归
## 涉及文件
- zhi2-web-admin/src/views/home/publicPortal/portal.scss
- zhi2-web-admin/src/views/home/publicPortal/README.md
- zhi2-web-admin/src/views/home/publicPortal/pages/BrokerPages.vue
- zhi2-web-admin/src/views/home/publicPortal/pages/InformationPages.vue
- zhi2-web-admin/tests/e2e/public-portal-interactions.spec.ts
- 所属项目：门户；来源会话：cd219f43-3c16-438f-a69b-3bf209ae6601；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_form_label_alignment",
  "source_extraction_id": "8e20f6fee1674c00937ae27996fd4506",
  "version": 1,
  "memory_type": "entities"
}
-->
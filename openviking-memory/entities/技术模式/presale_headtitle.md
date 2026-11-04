# presale_headtitle
预售详情页集成了 `HeadTitle`，统一了样式并去除了 苏州市房地产监测V3 项目中的重复内容。
## 变更
- `CashsaleDetail.vue` 和 `permit/components/detail.vue` 通过 `HeadTitle` 显示申请编号/状态/创建时间
- `CashsaleInfoPanel.vue` 和 `PermitInfoPanel.vue` 在查看模式下添加了 `Headline`
- `DetailTemplate` 移除了顶栏中的重复字段；标题行对齐到 56px
## 文件
- HeadTitle/index.vue, CashsaleDetail.vue, permit/components/detail.vue, CashsaleInfoPanel.vue, DeveloperBasicInfoDetail.vue, pubVerificationReceipts/detail.vue, autonomy/record/components/detail.vue, PermitPlanPanel.vue
## 验证
- 来源: 苏州市房地产监测V3/053.md; 会话: 36af5c21-311a-4501-8279-0576fa11d22e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_headtitle",
  "source_extraction_id": "ecf2b490657f45b9bed88b23d9e2450a",
  "version": 1,
  "memory_type": "entities"
}
-->
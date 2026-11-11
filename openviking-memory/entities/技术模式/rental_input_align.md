# 租赁输入框左对齐修复
门户与操作指引版「住房租赁合同备案查询」表单输入框因标签自适应宽度导致左边缘未对齐，已统一固定标签宽 200px 并显式左对齐。

## 根因
- 表单用两列 grid 排三个输入框，标签 `<span>` 用 `flex: 0 0 auto`（按内容自适应宽度）
- 标签长短不同（「出租方/承租方证件号码」最长、「合同备案编号」最短）导致三个输入框左边缘不同
- 设计稿 `flex: 0 0 200px` 写在 `operationGuideContract.scss`，但该全局样式从未被 import，属死代码

## 修改要点
- 四个文件统一把标签宽度固定为 `200px`（容纳最长 11 汉字标签）
- 给 `input` 显式加 `text-align: left` 兜底
- 刷新页面需硬刷新清缓存

## 涉及文件与归属
- `zhi2-web-admin/src/views/home/operationGuide/components/RentalContractQueryPanel.vue`（操作指引版，截图所在）
- `zhi2-web-admin/src/views/home/publicPortal/pages/RentalPages.vue`（门户公众版）
- `zhi2-web-admin-wt-payfund/src/views/home/operationGuide/components/RentalContractQueryPanel.vue`
- `zhi2-web-admin-wt-payfund/src/views/home/publicPortal/pages/RentalPages.vue`
- 所属项目：门户；时间：2026-11-10

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rental_input_align",
  "source_extraction_id": "84a411335b9d46f2b8c16c3d5ab99120",
  "version": 1,
  "memory_type": "entities"
}
-->
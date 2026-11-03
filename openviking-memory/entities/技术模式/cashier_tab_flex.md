# 收银台Tab布局紊乱因flex与文字换行
泰兴小程序收银台 result.vue 的 `.tab-bar` 误用 `display: flex` 且 `.tab-item__label` 未禁止换行，导致 Tab 布局紊乱。

## 问题根因
- `src/staff/pages/cashier/result.vue` 中 `.tab-bar` 误用 `display: flex`。
- `.tab-item__label` 未禁止换行，文字换行破坏布局。

## 解决方案
- 移除 flex，改为块级撑满。
- 为 `.tab-item__label` 添加 `white-space: nowrap` 修正布局。

## 验证与归属
- 验证证据：src=泰兴小程序/012.md
- 涉及文件：src/staff/pages/cashier/result.vue、src/staff/pages/cashier/index.vue、src/staff/pages/cashier/payment.vue、src/components/ZsTab/ZsTab.vue、src/styles/tab.scss、src/pages_owner/company/staff/index.vue、src/staff/components/ZsTab/ZsTab.vue、src/staff/styles/tab.scss
- 来源会话ID：0f7f9703-05b8-407c-bf56-acd901e44636
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashier_tab_flex",
  "source_extraction_id": "b7c019530c904296840e1259d4506eac",
  "version": 1,
  "memory_type": "entities"
}
-->
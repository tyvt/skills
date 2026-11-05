# 收银台 Tab 布局紊乱修复
泰兴小程序收银台 Tab 布局紊乱问题已修复，改动在 src/staff/pages/cashier/result.vue。

## 问题根因
- .tab-bar 误用 display: flex 导致布局异常
- Tab 文字在窄容器内逐字换行（.tab-item__label 未禁止换行）

## 修复方案
- .tab-bar 去掉 display: flex，改为块级容器并撑满宽度（width:100%, height:108rpx, padding:0 72rpx, box-sizing:border-box）
- .tab-bar :deep(.tab-item__label) 增加 white-space: nowrap 防止逐字换行
- 改用 staff 版 ZsTab（@/staff/components/ZsTab/ZsTab.vue），与页面 :deep(.tab-indicator) 样式一致

## 验证与归属
- 涉及文件：src/staff/pages/cashier/result.vue、src/staff/pages/cashier/index.vue、src/staff/pages/cashier/payment.vue、src/components/ZsTab/ZsTab.vue、src/styles/tab.scss、src/pages_owner/company/staff/index.vue、src/staff/components/ZsTab/ZsTab.vue、src/staff/styles/tab.scss
- 所属项目：泰兴小程序；来源会话ID：0f7f9703-05b8-407c-bf56-acd901e44636
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashier_tab_fix",
  "source_extraction_id": "6f0c4d0ce25a43908258dc2fb65fa244",
  "version": 2,
  "memory_type": "entities"
}
-->
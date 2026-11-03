# :deep权重打平致默认样式覆盖popup
泰兴小程序 `staff/pages/cashier/result` 中 `:deep(.payment-popup){width:100%}` 编译后权重 0-2-0，因样式权重打平被组件默认样式覆盖。

## 问题根因
- `staff/pages/cashier/result` 中 `:deep(.payment-popup){width:100%}` 编译后权重 0-2-0。
- 样式权重打平被组件默认样式覆盖。

## 解决方案
- 提升选择器优先级以固定弹窗宽度。

## 验证与归属
- 验证证据：src=泰兴小程序/022.md
- 涉及文件：D:/repository/泰兴小程序/src/staff/pages/cashier/result.vue、D:/repository/泰兴小程序/src/components/ZsPopup/ZsPopup.vue
- 来源会话ID：d5c9892f-5a5c-4a55-a2f9-0838c7afac00
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deep_weight_popup",
  "source_extraction_id": "5fe64a913e8e4332b1aa5926a136ded7",
  "version": 1,
  "memory_type": "entities"
}
-->
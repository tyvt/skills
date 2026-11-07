# 按钮缺盒模型与安全区致底部灰边
`PageButton.vue` 未设 `box-sizing: border-box` 且 `min-height` 未含安全区致各记录页底部灰边。
## 问题根因
- `PageButton.vue` 缺少 `box-sizing: border-box`，`min-height` 未包含 `safe-area-inset-bottom`。
- 各记录页 `padding-bottom` 固化，导致底部出现灰边。
## 解决方案
- `PageButton.vue` 增加 `box-sizing: border-box` 与 `min-height: calc(136rpx + safe-area-inset-bottom)` 及 `constant()` 兼容。
- `uni.scss` 新增 `--page-button-area-height` 变量，`record/index.vue` 与 `record/add.vue` 等 `padding-bottom` 改为该变量。
## 验证与归属
- 所属项目：物业手持B端
- 验证证据：extracted source=cursor project=物业手持B端
- 验证证据：src=物业手持B端/002.md
- 涉及文件：src/components/PageButton/PageButton.vue、src/pages_facility/record/add.vue、src/pages_facility/record/index.vue、src/pages_facility/record/addScrap.vue、src/pages_facility/issue/detail.vue、src/pages/cashier/index.vue、src/App.vue、src/pages_facility/repair/submit.vue
- 来源会话ID：5f92693a-f239-424f-9269-4366a09e5165
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "page_button_box",
  "source_extraction_id": "a2c76c9bc7b6443e88f1f37573a29346",
  "version": 1,
  "memory_type": "entities"
}
-->
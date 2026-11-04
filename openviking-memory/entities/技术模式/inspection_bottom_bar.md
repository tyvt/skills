# 巡检记录添加页底部灰色边距条
物业手持B端巡检/维保/年检/报废记录页底部出现灰色边距条，已统一底部高度变量铺满安全区。

## 问题根因
- `PageButton.vue` 缺少 `box-sizing: border-box` 及安全区高度，白色背景未铺满屏幕物理底部
- 各页面 `padding-bottom` 写死（如 `220rpx`/`180rpx`），与底部按钮区高度不一致产生灰色边距

## 解决方案
- `PageButton.vue` 增加 `box-sizing: border-box`、`min-height: calc(136rpx + safe-area-inset-bottom)`，补充 `constant()` 兼容，白色背景铺满至物理底部
- `uni.scss` 新增 `--page-button-area-height` 与 `PageButton` 高度一致，各页面内容区 `padding-bottom` 统一引用
- `record/index.vue` `padding-bottom: 220rpx` 改为 `var(--page-button-area-height)`
- `record/add.vue` `padding-bottom: 180rpx` 改为 `var(--page-button-area-height)`
- `record/addScrap.vue` 同步修改

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/components/PageButton/PageButton.vue、src/uni.scss、src/pages_facility/record/index.vue、src/pages_facility/record/add.vue、src/pages_facility/record/addScrap.vue
- 来源会话ID：5f92693a-f239-424f-9269-4366a09e5165
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_bottom_bar",
  "source_extraction_id": "c91dad9743c7431e807498094b1afa1f",
  "version": 1,
  "memory_type": "entities"
}
-->
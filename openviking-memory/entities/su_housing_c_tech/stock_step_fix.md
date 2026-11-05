# 存量房签约步骤条宽度修复
苏住房C 小程序 `pages_transaction/stockHouseSign/apply.vue` 步骤条因 flex 收缩与未均分宽度导致标签重叠，已修复。

## 问题原因
- `apply.vue` 根容器使用 `items-center`，步骤条作为 flex 子项被收缩为内容宽度，无法撑满
- `steps.vue` 各步骤未均分宽度，5 个标签挤在一起重叠
- 连接线宽度基于圆圈尺寸（56rpx）计算，过短且无法正确连接各步骤

## 修改内容
- `apply.vue` 给步骤条组件加 `w-full`：`<steps class="w-full" v-model="active" :list="authSteps" />`
- `steps.vue` 每个 `.step` 使用 `flex: 1` 均分宽度
- 连接线改在 `.step:not(:last-child)::after` 上绘制，从当前圆心连到下一步
- 标签增加 `white-space: nowrap`，避免换行重叠

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`apply.vue`、`components/steps.vue`
- 来源会话ID：d2267fb0-e77b-4d10-b674-4345440abdf1

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "stock_step_fix",
  "source_extraction_id": "e393299e4a9740aba5960facd459a397",
  "version": 1,
  "memory_type": "entities"
}
-->
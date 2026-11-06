# 加梯申请页申请说明输入框高度塌陷修复
苏住房C小程序加梯申请页「申请说明」输入框因样式问题高度塌陷、标题叠加拦截点击，已修复。

## 问题根因
- `form2.scss` 表单项默认横向 flex 布局，区域缺少高度
- 全局 `.uni-forms-item` 使用 `align-items: center`，多行输入区域约 200rpx 但容器未撑开，导致「地理位置」标题叠在输入框上拦截点击

## 修复方案
- 在 `addAlone.vue` 显式引入 `ZsTextarea`，参考 `signInfo.vue` 调整 `.description` 样式（固定高度、`flex-direction: column`）
- 补充样式：`:deep(.description) { min-height: 300rpx !important; height: auto !important; align-items: flex-start !important; padding-bottom: 24rpx; }` 并为标签增加 `margin-bottom`

## 验证与归属
- 涉及文件：addAlone.vue、add.vue、form2.scss、signInfo.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：d8d3c33d-5a07-488c-9663-dd7409ec4528

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "elevator_description_style_fix",
  "source_extraction_id": "ded0ed38cdde4845819e8eaacaabeb1a",
  "version": 1,
  "memory_type": "entities"
}
-->
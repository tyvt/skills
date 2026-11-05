# z-paging嵌套布局样式修复
z-paging 默认全屏 fixed 布局嵌套在卡片中会覆盖标题，需提升到页面根级并使用插槽修复。

## 问题原因
- z-paging 默认 position: fixed 全屏布局
- 被嵌套在 content-card 里时列表层脱离文档流
- 覆盖标题、汇总区和 Tab，导致文字叠在一起

## 修复方式
- 参考 payment/index.vue 等页面写法
- 将 z-paging 提升到页面根级
- 标题、汇总、收入/支出切换、表头放入 #top 插槽避免被遮挡
- 明细行放默认插槽，用 list-content 与上方卡片视觉衔接
- 补充 page { height: 100% } 和 onShow 中的 updateFixedLayout 保证布局计算正确

## 验证与归属
- 验证：标题、汇总、Tab、表头和列表应正常纵向排列不再重叠
- 涉及文件：pages_benefit/elevatorPubEngCons/detail.vue、index.vue、pages_owner/payment/index.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：964238bf-2553-4990-9244-37619f4aadbe

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "z_paging_fix",
  "source_extraction_id": "02646a38798d4274816c0f4acd8a2a27",
  "version": 1,
  "memory_type": "entities"
}
-->
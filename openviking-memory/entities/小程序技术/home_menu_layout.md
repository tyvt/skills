# 首页菜单固定两行三列布局
wygl小程序首页功能菜单采用固定两行三列计算属性布局，并以负边距叠放小区卡片与白底菜单卡片。

## 布局规范
- 首页功能菜单用 menuRows 计算属性拆成固定两行、每行三列：小区信息/小区资产/物业合同 + 共有资金/维修资金/业主决策
- 不使用 flex-wrap 自动换行，避免列数错乱
- 小区卡片始终展示(不依赖登录 v-if)
- 菜单白底卡片始终叠在小区卡片下方(margin-top:-68rpx)

## 入口路由
- 共有资金入口跳 /pages_benefit/sharedFunds/index
- 严格匹配设计图的一行三列布局

## 验证与归属
- 验证证据：009.md 会话0ce59dca
- 涉及文件：pages/webview/home.vue
- 来源会话ID：0ce59dca-7e20-4f54-a1a9-756964ae49a8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "home_menu_layout",
  "source_extraction_id": "d8600bf3c81e4e25b78224a443f65995",
  "version": 1,
  "memory_type": "entities"
}
-->
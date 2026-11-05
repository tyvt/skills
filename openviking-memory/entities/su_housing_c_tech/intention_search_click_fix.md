# 添加求购搜索小区点击无反应修复
苏住房C小程序「我的求购-添加求购」页面搜索小区点击无反应及空状态缺失问题已修复。

## 问题原因
- 添加求购页(add.vue)搜索框原先使用@tap.native，在Vue 3中已失效，点击无法跳转
- 搜索小区页(search.vue)中z-paging默认fixed为全屏固定，盖住顶部搜索栏导致无法点击
- 搜索页空状态模板缺少「暂无数据」文案

## 修复内容
- add.vue改为外层容器绑定@tap，并在@focus时跳转搜索页，点击或聚焦都能进入搜索
- search.vue设置:fixed="false"并调整flex布局，让搜索栏始终可交互，进入页面后自动聚焦(:autoFocus="true")
- 在搜索页空状态模板补充「暂无数据」文案，样式与项目其他列表页一致

## 验证与归属
- 验证路径：我的→我的求购→添加求购，点击搜索框跳转；搜索小区页可输入，无结果显示「暂无数据」
- 涉及文件：src/pages_transaction/intention/add.vue、search.vue
- 所属项目：苏住房C；来源会话ID：1bbaff8b-e027-4764-86e9-41dd7092d234；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "intention_search_click_fix",
  "source_extraction_id": "024075fb80c64e0a8d2ee5d6485b7b39",
  "version": 1,
  "memory_type": "entities"
}
-->
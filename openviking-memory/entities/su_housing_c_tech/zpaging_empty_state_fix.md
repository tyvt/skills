# z-paging空态组件UI修复
苏住房C小程序修复视频看房等使用z-paging空态页面文字靠左、空态图不显示的问题。

## 问题根因
- .paging-empty、.paging-empty-pic、.paging-empty-text在全局没有样式，文字默认靠左
- ZsImage图片width:100%;height:100%，父容器.paging-empty-pic无尺寸时图片宽高为0，空态图不显示

## 修复内容
- uni.scss补充paging-empty全局样式（居中布局、320rpx空态图、灰色提示文字）
- 修正houseVideo/index.vue的#empty插槽结构，去掉无效的mt-300偏移
- ZsPaging.vue增加对应scoped样式，保证通过封装组件使用时也正常

## 验证与归属
- 重新编译后空态应居中显示空态图和「暂无相关数据！」文字
- 涉及文件：uni.scss、houseVideo/index.vue、ZsPaging.vue、ZsEmpty.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：52f0bdb1-df2c-4df1-9f42-40b6d23d7382；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zpaging_empty_state_fix",
  "source_extraction_id": "aded602703eb47bab03dc2c6bb2b83c5",
  "version": 1,
  "memory_type": "entities"
}
-->
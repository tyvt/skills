# 查询条重置/查询间距与圆角改共用组件一处
苏住房C 四个交易查询页共用 inquireBox.vue，改组件一处即可同时覆盖所有页面按钮样式。

## 问题情况
- 用户要求「预售公示、房价咨询、存量房网签合同查询、商品房网签合同查询」四页重置按钮加 8px 圆角，并与左侧查询按钮保留 10px 间距
- 四页分属 houseNewLicence.vue / housePrice.vue / stockHouseContract.vue / houseNewContract.vue，但按钮区域完全一致

## 问题根因
- 四查询页共用同一查询条件组件 pages_transaction/service/components/inquireBox.vue，按钮布局样式都在组件内部
- 页面本身不持有各自按钮样式；按页加 scoped 样式既改不到组件内部（小程序/组件作用域选择器进不去），又会造成四份口径漂移

## 解决方案
- 只在 inquireBox.vue 改两处：.reset-button 加 border-radius:8px（192rpx 宽、底色 #f7f7f7）
- .btn-box-line 的 flex 容器加 gap:10px 承担按钮间距，不给按钮写 margin 造成双重间距
- 验收时四页一起看；通用判据：收到「某几个页面统一改样式」需求先确认是否共用同一查询/表单组件，共用就改组件一处并列出受影响页面清单

## 验证与归属
- 验证会话：f43ea722（2026-08-28，基线 8fc3cc5），用户要求四查询页重置按钮加 8px 圆角并保留 10px 间距
- 涉及文件：pages_transaction/service/components/inquireBox.vue、pages_transaction/service/housePrice.vue、pages_transaction/service/index.vue
- 所属项目：苏住房C；来源会话ID：f43ea722-a549-4a69-b76c-1958259d4695；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "inquirebox_shared_style",
  "source_extraction_id": "dca35173571046008ab4d13a3f707715",
  "version": 1,
  "memory_type": "entities"
}
-->
# 首页v2统计数字点击跳列表预置筛选
苏住房G首页v2关键数据、公共收益等统计项改为可点击入口，跳转后目标列表按该指标业务口径预置筛选，靠独立 homeStatNav 映射表 + saveSearchParams 打通。

## 背景与动机
- 直接在各卡片写 router.push(path)+query 有两个坑：目标列表页搜索条件不吃 URL query（列表靠 listMixins 搜索缓存恢复），跳过去是全量无筛选
- 「物业服务企业数」（已备案+本地机构）、「监管账户数」（已备案+备案当月）等业务口径散落各卡片会各处漂移

## 解法
- 新建 views/home/v2/homeStatNav.js，一个统计项一条：{ 目标路由, 默认查询条件 }，当月类筛选在配置里生成 startRecordTime/endRecordTime，不让卡片自己算日期
- 跳转统一走 navigateWithSearchParams + saveSearchParams（先写查询条件进目标列表搜索缓存再跳转），卡片只传指标 key
- 列表侧（pubManagementOrg / pubRegulatoryAccount / pubRegulatoryAgreement）要在 queryParams 显式声明 bizState、备案时间等字段，否则缓存写进也不会被带上
- 联调注意：benefit 列表若按备案时间没过滤，先确认后端分页是否已支持 startRecordTime/endRecordTime

## 验证与归属
- 来源会话3716ba06（基线315702f）最终结论第2、4条：新建 homeStatNav.js；三个列表补充 bizState/备案时间字段声明
- 涉及文件：zhi2-web-admin/src/views/home/v2/homeStatNav.js、benefit/pubManagementOrg/index.vue、pubRegulatoryAccount/index.vue、pubRegulatoryAgreement/index.vue
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_stat_nav",
  "source_extraction_id": "945bb1e362c547b283081240c4923464",
  "version": 1,
  "memory_type": "entities"
}
-->
# 苏住房G统计页handleQuery空实现导致搜索无请求
G端后台统计页（如companyProjectStats、feeStandardStats）点搜索完全不发请求，根因是复刻模板时handleQuery写成空方法体。

## 问题现象
- 点「搜索」按钮Network面板一条请求都没有，但初次进入、点「重置」都能正常出数
- 控制台干净、不报错不告警，极易误判成接口404、参数被拦截或权限问题

## 根因
- 页面复刻zs-search-form + listMixins模板，约定查询回调统一叫handleQuery
- 复刻时handleQuery写成空方法体，按钮点击命中方法但方法内无任何getDetails()/getList()调用
- 重置走resetQuery→getDetails()另一分支，故重置正常、搜索哑火

## 解决做法
- 遇到「点了没反应又没报错」先定位按钮绑定事件名，确认约定查询方法名（V3统计页是handleQuery）
- 修复即把handleQuery写成this.getDetails()（或对应取数方法）
- 统计类只影响前端展示的筛选项由computed（tableRows按statType过滤）前端过滤，不需传接口

## 差异说明与归属
- 区别于#1008（重写init导致整页不调接口）、#1078（子组件改prop导致点错接口），本条是第三种根因——查询回调空实现
- 验证：companyProjectStats/index.vue:196-198原为空方法，改为handleQuery(){this.getDetails()}后搜索请求/company/companyRecord/companyNumStatistics
- 涉及文件：zhi2-web-admin/src/views/publicQuery/companyProjectStats/index.vue、feeStandardStats/index.vue
- 所属项目：苏住房G；来源会话：5fd50fdd-c3d0-40b5-af88-9696e44c5d09；代码基线：e590ffa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_g_handlequery_empty",
  "source_extraction_id": "89bde800f6fd4be7996bc80e03c166d2",
  "version": 1,
  "memory_type": "entities"
}
-->
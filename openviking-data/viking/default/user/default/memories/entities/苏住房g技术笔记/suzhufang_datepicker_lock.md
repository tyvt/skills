# 苏住房G 日期范围选择器锁死问题
机构注册审核/企业管理/人员管理列表共用的「更新时间」日期范围选择器，先选结束日后再选开始日被锁死。

## 问题现象
- 先点 2026-10-30 作结束日，10月30日前日期全部置灰，无法选更早开始日
- 先选今天作开始日，未来日期应禁用，但过去两年外的日期也未放开

## 根因
- disabledDate 把「已点第一下」的日期当不可越过起始边界（day < anchor 一律禁用）
- Element range 选择器两端点共用同一套谓词，无法区分正在选第一项还是第二项，首日期变成范围下限，规则方向写反

## 解决方案
- companyListQuery.js 抽三层纯函数：getUpdateTimeSelectableBounds 给「今天起向前2个自然年」全局窗口
- isUpdateTimeDayDisabled 分两态：未选第一项超全局窗口（含未来）禁用；已选第一项只要求锚点±2年跨度内可选，不再限制早于锚点
- validateUpdateTimeRange 校验起止都在全局窗口，失败清空 _updateTimePickAnchor 避免面板残留错误禁用态

## 验证与归属
- 验证会话 5992a86f：用户指出先选结束日不能再选更早开始日、先选开始日未来应禁用但两年外未放开
- 涉及文件：zhi2-web-admin/src/utils/companyListQuery.js、zhi2-web-admin/src/views/company/companyRegister/index.vue
- 所属项目：苏住房G；代码基线：3192070

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "suzhufang_datepicker_lock",
  "source_extraction_id": "5476d06cd4c6428c960d083c3f249c32",
  "version": 1,
  "memory_type": "entities"
}
-->
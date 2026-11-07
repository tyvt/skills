# 禅道 Bug 6281
禅道项目管理模块中楼幢变更维护页面的滚动条缺陷，奇安信旧内核下仅控制基本信息区域。

## 根因
- 与 bug 6279 同根因，页面为 projectManagement/buildinginfo/changeDetail
- vue 结构：detail-container 含 detail-from-container（基本信息表单）与 zs-tabs（type=card，单元信息/房屋信息）
- 老内核（Chromium<105）不支持 :has()，整页滚动失效、表单区内滚、底部表格被裁

## 修复
- 已由 6279 的 html.no-has-support 回退覆盖，本页无需新增代码
- zs-tabs 根 class 为 [tabs,zs-tabs,tabs--card]，落入回退块 > .zs-tabs 分支

## 状态
- 状态回写 resolved/fixed/trunk
- resolvedBy=tiany，指派回 zhunan


<!-- MEMORY_FIELDS
{
  "category": "禅道缺陷",
  "name": "zentao_bug_6281",
  "source_extraction_id": "ac82d3bc52694a178b12d866653c29d9",
  "version": 1,
  "memory_type": "entities"
}
-->
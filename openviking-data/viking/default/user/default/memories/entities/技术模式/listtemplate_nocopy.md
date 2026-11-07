# 列表页禁止复制 ListTemplate HTML
园区物管2.0 列表页改造时不应复制 ListTemplate 的 HTML 写独立模板，缺能力应增强公共层。

## 背景
- 多个列表页（accountCancel、accountOpen/complex、settlementAccount、accountOpen/components）做主子表样式一致+底部合计行改造时，AI 复制 ListTemplate HTML 成独立 template，与项目惯例不一致。
- 用户质疑为何改模板，复核确认复制无新增能力。

## 原因
- ListTemplate.js + listMixins 是后台列表页主流写法，已内置 list-container/list-card 外框、ListOperationButtonContainer 标题栏、border/show-summary 等 props。
- 复制 HTML 后各页样式来源分叉，全局表格调整无法一处生效。

## 做法
- 缺能力（如底部合计行）时优先增强公共层：在 ListTemplate.js 补 bottom-summary-items / bottom-summary-variant prop，在 table.js mixin 加默认 summaryItems:[]、bottomSummaryVariant:'table'，页面只用 script 重写并改回 template: template。
- 仅通用模板覆盖不了的场景（额外业务弹窗、额外导出按钮、列定义不走 displayColumns 配置，如 owner 页）才允许写独立模板。
- 排查信号：列表页出现整段复制的 ListTemplate HTML 且无新增节点，即应回退。

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountCancel/index.vue 等 4 个页面及 src/mixins/ListTemplate.js；所属项目：园区物管2.0；来源会话 ID：d930377c-63a5-48c1-9276-9e6f283932ed；代码基线：3353ef164 等。
- 验证：AI 复盘三个页面复制 HTML 无新增能力，修正为增强 ListTemplate.js + mixin 默认值，4 页面改回 template: template 只写 script。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listtemplate_nocopy",
  "source_extraction_id": "ac7ed565a11941f68e3ba3d720da30ae",
  "version": 1,
  "memory_type": "entities"
}
-->

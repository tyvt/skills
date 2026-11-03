# 列表页禁止复制 ListTemplate 的 HTML 写独立模板：缺能力时增强 ListTemplate/mixin 本身

什么情况：给多个列表页（accountCancel、accountOpen/complex、settlementAccount、accountOpen/components）做「主子表样式一致 + 底部合计行」改造时，AI 参考了没用 ListTemplate 的 owner/index.vue，把 ListTemplate 的 HTML 整段复制成独立 <template> 套到这几个页面。用户质疑「为什么要改模板，和通用模板不一致吗？」，复核确认这些复制没有新增能力，反而与项目惯例不一致。为什么：ListTemplate.js + listMixins 是本后台列表页的主流写法，已内置 list-container/list-card 外框、ListOperationButtonContainer 标题栏、border/show-summary 等 props；复制 HTML 后各页样式来源分叉，后续全局表格调整（如补 border、合计行）无法一处生效。怎么做：缺某个能力（如底部合计行）时，优先增强公共层——在 ListTemplate.js 补 bottom-summary-items / bottom-summary-variant prop，在 table.js mixin 里加默认 summaryItems:[]、bottomSummaryVariant:'table'，页面只用 script 重写 summaryItems/showMethod/listCallback 并改回 template: template；只有通用模板确实覆盖不了的场景（额外业务弹窗、额外导出按钮、列定义不走 displayColumns 配置，如 owner 页）才允许写独立模板。排查信号：发现某个列表页出现整段复制的 ListTemplate HTML 且无新增节点，即应回退。

**验证证据**：会话 d930377c：AI 自我复盘「这三个页面把 ListTemplate 的 HTML 复制一遍，没有新增能力，反而和项目惯例不一致」，修正方式为增强 ListTemplate.js（bottom-summary-items/bottom-summary-variant）+ table.js mixin 默认值，4 个页面改回 template: template 只写 script。

**涉及文件**：zhi2-web-admin/src/views/maintenance/accountCancel/index.vue、zhi2-web-admin/src/views/maintenance/accountOpen/complex/index.vue、zhi2-web-admin/src/views/maintenance/accountOpen/components/index.vue、zhi2-web-admin/src/views/maintenance/settlementAccount/index.vue、zhi2-web-admin/src/mixins/ListTemplate.js

**所属项目**：园区物管2.0
**来源会话**：d930377c-63a5-48c1-9276-9e6f283932ed
**代码基线**：3353ef164 / f00310232 / 193a9a3b6 / d48841f13
<!-- MEMORY_FIELDS
{
  "category": "Causa raiz de layout",
  "name": "tooltip_table_overlap",
  "source_extraction_id": "1bff9247b411402ebbcf245405c1569f",
  "version": 1,
  "memory_type": "entities"
}
-->
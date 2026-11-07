# ZsDatePicker 日期文本折行挤压bug
苏住房C 小程序筛选弹窗日期区间控件 ZsDatePicker 渲染 2026-08-01 时连字符处断行，01 掉第二行溢出输入框。

## 问题现象
- 报事报修筛选弹窗「上报日期」、公共收益收支明细、维修资金业务明细等窄容器日期区间框，日期文本在连字符 - 处断行
- 01 掉到第二行并溢出输入框，仅改一处修不干净

## 根因
- ZsDatePicker 内部分隔符（至/～）写 flex:1，主动抢占剩余横向空间压窄左右日期框
- 日期文本未设 white-space:nowrap，浏览器/WXSS 把连字符当合法断行点必然折行
- 两原因叠加，需同时修复

## 解决方案
- 公用样式 src/styles/filter.scss 给日期值加 white-space:nowrap + word-break:keep-all
- 分隔符改 flex:0 0 auto 不再参与宽度分配，左右内边距对称 padding:0 8px 并居中
- 同步三处 ZsDatePicker 副本（pages_owner_extra、pages_owner、pages_main）分隔符 flex 与不换行样式

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 c59bc687 用户截图「上报日期 UI 问题」，根因列为分隔符 flex:1 与未 nowrap；修复 filter.scss+三处副本
- 涉及文件：zhi2-mobile-shimin/src/styles/filter.scss、pages_owner_extra/repair/index.vue、pages_owner/income/index.vue、pages_owner/repair/index.vue
- 所属项目：苏住房C；来源会话ID：c59bc687-6e91-42f1-ba7a-8d423e305220；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zsdatepicker_text_wrap",
  "source_extraction_id": "6effc7066ae1427b831acada34d3612d",
  "version": 1,
  "memory_type": "entities"
}
-->
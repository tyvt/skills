# Summary
2026-11-05 用户报告苏州市房地产监测V3的测绘变更模块已将 busCode 改为从菜单路由 meta 动态解析，不再硬编码。具体：surveyChangeConstants.js 删除 SURVEY_CHANGE_BUS_CODE、SURVEY_CHANGE_APPENDIX_BUS 常量，新增 resolveSurveyChangeBusCode(route) 从路由或菜单 filePath 回退解析；detail.vue 新增 surveyChangeBusCode 计算属性优先用返回 attachmentBusCode 否则从菜单解析，提交与要件上传使用该值，审批弹窗通过 :bus-code 传入；ApprovalDialog.vue 新增 busCode prop；E2E 审批用例改为从菜单 meta 读取期望 busCode。若菜单未配置 busCode，提交/审批会提示「未获取到业务编码，请检查菜单 busCode 配置」。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】preference
【标题】所属区域要用行政区划控件格式化，测绘变更页面
【内容】已将测绘变更模块的 `busCode` 改为从菜单路由 meta 动态解析，不再硬编码。 ### 改动说明 1. **`surveyChangeConstants.js`** - 删除 `SURVEY_CHANGE_BUS_CODE`、`SURVEY_CHANGE_APPENDIX_BUS` 常量 - 新增 `resolveSurveyChangeBusCode(route)`，从当前路由或菜单 `filePath` 回退解析 `busCode`（要件、提交、审批共用） 2. **`detail.vue`** - 新增 `surveyChangeBusCode` 计算属性：优先用详情返回的 `attachmentBusCode`，否则从菜单解析 - 提交、要件上传均使用该值 - 审批弹窗通过 `:bus-code` 传入 3. **`ApprovalDialog.vue`** - 新增 `busCode` prop，审批请求使用父组件传入的值 4. **E2E** - 审批用例改为从菜单 meta 读取期望的 `busCode`，不再断言固定字符串 若菜单未配置 `busCode`，提交/审批会提示「未获取到业务编码，请检查菜单 busCode 配置」。
【验证证据】extracted source=cursor project=苏州市房地产监测V3
【涉及文件】**`surveyChangeConstants.js ; **`detail.vue ; **`ApprovalDialog.vue ; 涉及文件：d:\repository\苏州市房地产监测V3\zhi2-web-admin\src\views\presale\surveyChange、d:\repository\苏州市房地产监测V3\zhi2-web-admin\src\views\presale、d:\repository\苏州市房地产监测V3\zhi2-web-admin\src、d:\repository\苏州市房地产监测V3\zhi2-web-admin\src\views\presale\surveyChange\detail.vue
【所属项目】苏州市房地产监测V3
【来源会话ID】e2ebd248-e476-4973-afd7-7553276cc91b
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "测绘变更busCode动态解析",
  "goal": "记录代码改造",
  "summary": "2026-11-05 用户报告苏州市房地产监测V3的测绘变更模块已将 busCode 改为从菜单路由 meta 动态解析，不再硬编码。具体：surveyChangeConstants.js 删除 SURVEY_CHANGE_BUS_CODE、SURVEY_CHANGE_APPENDIX_BUS 常量，新增 resolveSurveyChangeBusCode(route) 从路由或菜单 filePath 回退解析；detail.vue 新增 surveyChangeBusCode 计算属性优先用返回 attachmentBusCode 否则从菜单解析，提交与要件上传使用该值，审批弹窗通过 :bus-code 传入；ApprovalDialog.vue 新增 busCode prop；E2E 审批用例改为从菜单 meta 读取期望 busCode。若菜单未配置 busCode，提交/审批会提示「未获取到业务编码，请检查菜单 busCode 配置」。",
  "ranges": "0-6",
  "source_extraction_id": "7a6d5bdf5ce547ee8aa8e940d4fdea54",
  "version": 1,
  "memory_type": "events"
}
-->
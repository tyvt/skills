# Summary
按 task490「企业端 B、G 分离调整」（2026-07-08）设计，B 端分企业管理员与从业人员两类：企业管理员登录不弹物业管理区域选择框且右上角不显示区域名；从业人员关联多区域时才弹且显示可切换。判断逻辑在 terminalUser.js 的 isBTerminalPractitioner 与 isGTerminalLike 函数。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】preference
【标题】上次说苏住房的B端不显示物业管理区域的现在又显示了 
【内容】查了代码和提交记录，结论如下。 ## 结论：不是给企业管理员加的新需求 按 **task490「企业端 B、G 分离调整」**（7 月 8 日）的设计，B 端分两类，行为不同： | 用户类型 | 登录后是否弹「物业管理区域」选择框 | 右上角是否显示区域名 | |---------|-------------------------------|-------------------| | **B 端企业管理员** | 不弹 | 不显示 | | **B 端从业人员** | 关联多个区域时才弹 | 显示，可切换 | 相关判断在 `terminalUser.js`： ```6:14:d:\repository\苏住房G\zhi2-web-admin\src\utils\terminalUser.js /** B 端从业人员：需选择物业管理区域，三资模块按区域隔离 */ export function isBTerminalPractitioner(userState) { return userState?.terminalType === 'B' && !isCompanyAdmin(userState) } /** G 端用户或 B 端企业管理员：与 G 端一致的菜单与操作流程 */ export function isGTerminalLike(userState) { retu
【验证证据】extracted source=cursor project=苏住房G
【涉及文件】`terminalUser.js ; ```6:14:d:\repository\苏住房G\zhi2-web-admin\src\utils\terminalUser.js ; 涉及文件：d:\repository\苏住房G\.gitmodules、C:\Users\Administrator\.cursor\projects\d-repository-G\agent-transcripts、d:\repository\苏住房G\zhi2-web-admin、d:\repository\苏住房G\zhi2-web-admin\src、d:\repository\苏住房G\zhi2-web-admin\src\utils\projectContext.js、d:\repository\苏住房G\zhi2-web-admin\src\utils\terminalUser.js
【所属项目】苏住房G
【来源会话ID】cbfb89e8-705e-429a-96b7-fa329df51e3e
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "企业端BG分离设计",
  "goal": "记录企业端分离设计",
  "summary": "按 task490「企业端 B、G 分离调整」（2026-07-08）设计，B 端分企业管理员与从业人员两类：企业管理员登录不弹物业管理区域选择框且右上角不显示区域名；从业人员关联多区域时才弹且显示可切换。判断逻辑在 terminalUser.js 的 isBTerminalPractitioner 与 isGTerminalLike 函数。",
  "ranges": "8-13",
  "source_extraction_id": "8f365bc283fd409392b11ad789db912c",
  "version": 1,
  "memory_type": "events"
}
-->
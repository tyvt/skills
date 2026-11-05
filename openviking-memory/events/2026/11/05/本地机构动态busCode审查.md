# Summary
对苏住房G项目本地机构动态 busCode 的 Vue 审查已完成，传播链（flowBusCode→OperationBtnGroup→zs-approval）在详情加载后能随 form.isLocalOrganization 更新；但 isLocalOrganization 为空时一律走本地码，可能与路由 meta.busCode 不一致，且 getDetail 完成前仍可能用错误码；Verdict: BLOCK（3项HIGH+若干MEDIUM），需定产品规则后修复。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】preference
【标题】Briefly inform the user ab
【内容】本地机构动态 `busCode` 的 Vue 审查已完成。 **结论：** 传播链（`flowBusCode` → `OperationBtnGroup` → `zs-approval`）在详情加载后能随 `form.isLocalOrganization` 更新；但 **`isLocalOrganization` 为空时一律走本地码**，与从非本地菜单进入的 `meta.busCode` 可能不一致，且在 **`getDetail` 完成前** 仍可能用错误码拉附件/流程。前端详情侧也 **未见该字段的明确契约**，需确认接口是否返回 `'0'/'1'`。 **Verdict：BLOCK**（3 项 HIGH + 若干 MEDIUM）。已对变更范围内的文件跑过 ESLint，无报错。 若要继续落地修复，需要先定产品规则：**空值默认本地** 还是 **空值跟路由 meta**；定好后可改 `resolveFlowBusCode` 并加详情 `loading` 守卫。需要我按某一规则直接改代码可以说一下。
【验证证据】extracted source=cursor project=苏住房G
【涉及文件】涉及文件：d:\repository\苏住房G\zhi2-web-admin\src\utils\localOrganizationFlow.js、d:\repository\苏住房G\zhi2-web-admin\src\mixins\localOrganizationFlowMixin.js、d:\repository\苏住房G\zhi2-web-admin\src\mixins\approval.js、d:\repository\苏住房G\zhi2-web-admin\src\components\OperationBtnGroup\index.vue
【所属项目】苏住房G
【来源会话ID】9c8f0d10-8555-4605-9555-1d8641db8e16
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "本地机构动态busCode审查",
  "goal": "代码审查结论",
  "summary": "对苏住房G项目本地机构动态 busCode 的 Vue 审查已完成，传播链（flowBusCode→OperationBtnGroup→zs-approval）在详情加载后能随 form.isLocalOrganization 更新；但 isLocalOrganization 为空时一律走本地码，可能与路由 meta.busCode 不一致，且 getDetail 完成前仍可能用错误码；Verdict: BLOCK（3项HIGH+若干MEDIUM），需定产品规则后修复。",
  "ranges": "7-13",
  "source_extraction_id": "85aebb1930c949e9b8df248d137025f2",
  "version": 1,
  "memory_type": "events"
}
-->
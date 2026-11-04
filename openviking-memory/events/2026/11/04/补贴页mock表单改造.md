# Summary
用户在 pages-iHome/subsidy.vue 中将「在线申请」原外链跳转改为底部 mock 表单弹窗：含所属单位、统一社会信用代码、企业公积金编号三项必填，mockApplyForm() 提供预填默认值且每次打开重置；校验三项非空（trim）否则提示对应 placeholder，通过后关闭弹窗提示「申请成功」且不跳外链。报告于 2026-11-04。
# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】bug
【标题】这个页面按照@src/pages/rent/my/i
【内容】已按 `pages-rent/subsidy.vue` 的 mock 表单方式，在 `pages-iHome/subsidy.vue` 里接好了在线申请的 mock 表单提交，修改总结如下。 ## 修改说明 ### 1. 原逻辑调整 - **原流程**：点击「在线申请」→ 弹出提醒弹窗 → 确认后跳转外链 `outSubsidy`。 - **现流程**：点击「在线申请」→ 直接弹出底部** mock 表单** → 填写/预填后点击「下一步」→ 校验通过后关闭弹窗并提示「申请成功」（不跳外链）。 ### 2. 新增 mock 表单 - **底部弹窗**：`wd-popup`、`position="bottom"`，与 rent 版一致。 - **表单项**（与 rent 一致）： - **所属单位**（必填） - **统一社会信用代码**（必填） - **企业公积金编号**（必填） - **Mock 预填**：`mockApplyForm()` 提供默认值（公司名、信用代码、公积金编号），每次打开弹窗会重置为这些预填值。 - **按钮**：「关闭」关闭弹窗；「下一步」触发表单校验与 mock 提交。 ### 3. 提交逻辑（mock） - 校验三项均非空（trim 后），否则用 `uni.showToast` 提示对应 placeholder 文案。 - 校验通过后：关闭弹窗，并 `
【验证证据】extracted source=cursor project=0
【涉及文件】`pages-rent/subsidy.vue ; `pages-iHome/subsidy.vue ; @src/pages/user/index.vue ; 这个页面按照@src/pages/rent/my/index.vue
【所属项目】0
【来源会话ID】45e7b0ce-15f9-4788-ba08-ff2c893c36ee
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "补贴页mock表单改造",
  "goal": "记录补贴表单改造",
  "summary": "用户在 pages-iHome/subsidy.vue 中将「在线申请」原外链跳转改为底部 mock 表单弹窗：含所属单位、统一社会信用代码、企业公积金编号三项必填，mockApplyForm() 提供预填默认值且每次打开重置；校验三项非空（trim）否则提示对应 placeholder，通过后关闭弹窗提示「申请成功」且不跳外链。报告于 2026-11-04。",
  "ranges": "0-6",
  "source_extraction_id": "1fb079fea20c4c2aa17305d2b8c28da4",
  "version": 1,
  "memory_type": "events"
}
-->
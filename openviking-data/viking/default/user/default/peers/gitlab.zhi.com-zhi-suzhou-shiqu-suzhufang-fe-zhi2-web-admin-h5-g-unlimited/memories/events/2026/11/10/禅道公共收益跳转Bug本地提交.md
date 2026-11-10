# Summary
2026-11-10，Bug 6409 修复在子模块本地提交（commit bd344fac3，分支 develop/v2.6.2-suzhufang），未推送；禅道状态未回写。提交信息 fix(home): public benefit history jump drops month filter (#6409)。version.json 构建时间 2026/11/10 13:28:20。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6409
要求：

必须走 orchestrate 编排器去修改代码。

修改后，必须真实执行一次构建或测试命令（如 npm run build 或 echo 测试通过）来验证。...
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 构建已通过。接着只提交子模块里这两个文件，不推送。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: Bug 6409 已在子模块本地修复并提交，未推送。禅道状态未回写。

## 修复

首页公共收益「历史累计」统计不传 `month`，但点击跳转仍套用当月备案时间 `startRecordTime` / `endRecordTime`，所以卡片显示 147、列表只有 1 条。...
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: ...全量 `npm run lint` 会扫整个 `src`，现有 2927 个错误与本次无关。

提交（仅子模块，未 push）：`bd344fac3`
`fix(home): public benefit history jump drops month filter (#6409)`...

<!-- MEMORY_FIELDS
{
  "event_name": "禅道公共收益跳转Bug本地提交",
  "goal": "记录本地提交结果",
  "summary": "2026-11-10，Bug 6409 修复在子模块本地提交（commit bd344fac3，分支 develop/v2.6.2-suzhufang），未推送；禅道状态未回写。提交信息 fix(home): public benefit history jump drops month filter (#6409)。version.json 构建时间 2026/11/10 13:28:20。",
  "ranges": "0,46,69,73",
  "source_extraction_id": "ddc1d9d46a1a4b3c8142ff6164016ac7",
  "version": 1,
  "memory_type": "events"
}
-->
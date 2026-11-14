# Summary
2026-11-14 在 skills 仓 `dsh/profiles/web/cordis.patch.yml` 的 preset-standard tool-workflow 块后加入 `disabled: true`，git diff 为 1 file changed, 1 insertion(+)；PyYAML 报错源于 `!!js` 自定义标签而非语法错误。随后仅对该单文件执行 git add 并提交为 commit 1c9fe34d，未推送（用户选择"仅提交"）；运行时 `~/.dsh/profiles/web/cordis.patch.yml` 的备份为 `.bak-p1b-20261114152151`。
# 2026-11-14 (Saturday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: Repo 版已改（standard 的 tool-workflow 加 disabled）。校验 YAML 合法 + git diff 仅此一处，然后提交。
**assistant [peer=github.com-tyvt-skills]**: - YAML 报错是 `!!js` 自定义标签（DSH 特有语法，标准 PyYAML 不认），**不是语法错误**——文件本身有效（live 同款结构）。
- **git diff：1 file changed, 1 insertion(+)** —— 精确只加一行 `disabled: true`，与批 2 意图一致。

用 dsh 自己的 `--dump-config` 对 repo 版做最终 YAML 语义校验（它认 !js 标签）。先确认 repo 文件能被 dsh 解析——但 dump-config 用的是 `~/.dsh/profiles/web`，不是仓内副本。所以仓内副本的正确性靠：①结构与 live 同款（仅差这一行）②git diff 精确。

现在提交。先看该文件 git 状态与其他脏文件，避免裹挟。
**assistant [peer=github.com-tyvt-skills]**: 仓里有很多其他脏文件（其他会话/任务留下的）。我只提交 `dsh/profiles/web/cordis.patch.yml` 一个文件，精确对应批 2。用 `git add <单文件>` + commit（限定路径，不 `-a`）。
**assistant [peer=github.com-tyvt-skills]**: 提交完成。清理临时脚本，更新 todo 收尾。

<!-- MEMORY_FIELDS
{
  "event_name": "workflow裁剪提交",
  "goal": "提交工作流裁剪改动",
  "summary": "2026-11-14 在 skills 仓 `dsh/profiles/web/cordis.patch.yml` 的 preset-standard tool-workflow 块后加入 `disabled: true`，git diff 为 1 file changed, 1 insertion(+)；PyYAML 报错源于 `!!js` 自定义标签而非语法错误。随后仅对该单文件执行 git add 并提交为 commit 1c9fe34d，未推送（用户选择\"仅提交\"）；运行时 `~/.dsh/profiles/web/cordis.patch.yml` 的备份为 `.bak-p1b-20261114152151`。",
  "ranges": "24-34",
  "source_extraction_id": "8f195b3f72104200903c651ccab8e0e2",
  "version": 1,
  "memory_type": "events"
}
-->
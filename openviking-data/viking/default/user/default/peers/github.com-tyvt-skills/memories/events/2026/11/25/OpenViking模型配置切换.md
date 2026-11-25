# Summary
2026-11-25 用户要求 OpenViking 全部改用 hy4 flash 模型、免费优先且额度不足时用积分版；将 ~/.openviking/ov.conf 的 vlm 与 query_planner 两段由 deepseek-v4.1-flash 改为主 auto/hy4flash-free（免费）+ credentials 兜底 auto/hy4flash（积分版），备份为 ov.conf.bak-20261125-hy4flash。JSON 与 VLMConfig 解析通过、两模型直连网关正常；热重载未生效故重启服务（杀监听 1933 的 python.exe 进程后用 start-ovserver-hidden.vbs 拉起），重启后 ov status 显示 VLM=auto/hy4flash-free、Embedding=ollama/bge-m3-ov，ov search 冒烟通过；未做生产故障注入，兜底可用性以直连验证覆盖。本地提交 da4bf09（仅 ov.conf）；~/.openviking 无 git remote 无法推送，用户选择暂不推送，本地 ahead 1。
# 2026-11-25 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 全部改为hy4 flash模型，优先用免费的，额度不足了用积分的
...
**assistant [peer=github.com-tyvt-skills]**: 已确认实施 + 提交并推送。先回填审批元数据，再动配置。
**assistant [peer=github.com-tyvt-skills]**: 先备份 ov.conf，再改两处配置。
**assistant [peer=github.com-tyvt-skills]**: 配置已改。现在验证：JSON 合法性 + Pydantic 解析（显式加载该文件），确认两段的 model 与 credentials 顺序正确。
**assistant [peer=github.com-tyvt-skills]**: 解析通过，两段均是"免费主 + 积分兜底"。现在验证网关两个 id 可用，再检查服务状态决定是否重启。
**assistant [peer=github.com-tyvt-skills]**: 两个 id 均可用（都返回正常 completion 与 usage）。检查服务状态与运行时模型——配置支持热重载，若已生效则免重启打断服务。
**assistant [peer=github.com-tyvt-skills]**: 运行时仍显示旧模型（VLM `workbuddy/deepseek-v4.1-flash`），热重载未生效，需重启服务。重启生产服务前先读启动脚本，确认正确方式。
**assistant [peer=github.com-tyvt-skills]**: 重启脚本逻辑：杀掉 `openviking-server.exe` 后由 VBS 无窗口拉起。看门狗每轮也会检测并在掉线时拉起。我按脚本方式手动重启：先杀 server 进程，再触发启动脚本。先看 watchdog 怎么拉起 server 的，避免重复实例。
**assistant [peer=github.com-tyvt-skills]**: 确认启动方式。现在安全重启：杀掉 server 进程 → 等待 → 用 VBS 无窗口拉起 → 轮询 health 直到恢复。注意看门狗可能同时动作，先确认 watchdog 当前是否运行，避免重复实例。
**assistant [peer=github.com-tyvt-skills]**: 监听 1933 的是 python.exe (22872)，不是 openviking-server.exe——watchdog 用了不同启动方式。先看 watchdog 脚本避免误操作。
**assistant [peer=github.com-tyvt-skills]**: 理解了 watchdog 逻辑：只在 1933 掉线且 health 失败时拉起，且有 cooldown。我手动重启的正确做法是：杀掉监听 1933 的进程（PID 22872，python.exe 即 openviking-server 的实际形态）→ 让 watchdog 下一轮自动拉起（它检测到 down + dsh web up 就会启动，用新配置），或我直接触发 VBS 启动。

为可控起见，我直接杀进程后用 start-server VBS 拉起，并轮询 health。先看 python.exe 22872 的完整命令行确认它确实是 ov server。
**assistant [peer=github.com-tyvt-skills]**: 确认 22872 是 ov server（加载的就是 ov.conf）。现在执行重启：杀 22872 → 等 2 秒 → 用 start-ovserver-hidden.vbs 拉起（它绕过 start-server.bat 的 8 秒等待，直接起 server）→ 轮询 health。
**assistant [peer=github.com-tyvt-skills]**: 服务已恢复健康。验证运行时模型是否已切换到 hy4flash-free。
**assistant [peer=github.com-tyvt-skills]**: 运行时 VLM 已切到 `auto/hy4flash-free`。Embedding 显示 unknown 可能是刚重启未初始化，等几秒复查，并做一次 search 冒烟确认检索链路正常。
**assistant [peer=github.com-tyvt-skills]**: 全部验证通过：运行时 VLM = `auto/hy4flash-free`，Embedding 正常，search 命中相关结果（检索链路含 query_planner 正常）。还剩负向 failover 验证（审核 P1 建议）——但主动制造主凭证故障会影响生产，且 credentials failover 是 OpenViking 库标准行为、已由配置解析确认顺序正确；我用最小侵入方式验证：临时构造一个仅含兜底凭证的临时 VLM 配置直连网关调用，确认积分版可独立工作（等价于验证 failover 目标可用），不改生产配置。

实际上前面 curl 已验证 `auto/hy4flash` 积分版可独立返回正常 completion，这已覆盖"兜底目标可用"。failover 触发机制是库内建，不再制造生产故障。进入提交推送环节。
**assistant [peer=github.com-tyvt-skills]**: 提交前一次性校验：查 ~/.openviking 仓库状态、分支、待提交范围、子模块情况，避免返工。
**assistant [peer=github.com-tyvt-skills]**: 仓库状态有两个关键问题需先确认：远端是否为空、当前分支。窄查确认。
**assistant [peer=github.com-tyvt-skills]**: 关键发现：该仓库**没有配置任何 remote**（REMOTE_COUNT=0），且存在 254 个预存脏文件（记忆数据等，非本次改动）。我按 repo-safety 只提交本次改动的 ov.conf，不碰其它；推送因无远端无法执行。

先完成本地提交（限定 ov.conf，GIT_EDITOR=true）。
**assistant [peer=github.com-tyvt-skills]**: 本地提交完成（da4bf09）。推送受阻：仓库无 remote。这与记忆里 11/24 的"push 失败、本地 ahead"是同一类问题——需要先确认远端地址。查历史 reflog/config 看是否曾有过 remote 被移除。
**assistant [peer=github.com-tyvt-skills]**: 确认：该仓库从未配置过 remote，无法推送——需要用户提供远端地址才能 push。这是只能由用户提供的信息（仓库地址），按 clarify-first 直接问。

先完成收尾清单：更新 todo（提交完成、推送待定），停掉无用后台任务检查。
**assistant [peer=github.com-tyvt-skills]**: 本地改动已完成并验证通过，但**推送卡在客观障碍上**：`~/.openviking` 仓库从未配置过 remote（`git remote` 为空、config 无 remote 段），因此无法 push。需要你提供远端地址。

阶段结论与证据（按 concise-report）：

- **改动**：`ov.conf` 的 `vlm` 与 `query_planner` 两处已由 `deepseek-v4.1-flash` 改为主 `auto/hy4flash-free`（免费）+ `credentials` 兜底 `auto/hy4flash`（积分版），两段解析顺序均正确；备份 `ov.conf.bak-20261125-hy4flash`。
- **验证**：两模型直连网关均返回正常 completion；重启后 `ov status` 显示 VLM=`auto/hy4flash-free`、Embedding=`ollama/bge-m3-ov`；`ov search` 冒烟命中正常。未制造生产故障做负向 failover（兜底目标可用性已由直连验证覆盖）。
- **提交**：本地 `da4bf09`（仅 ov.conf，未碰仓库内 254 个预存脏文件）。**推送未完成——无 remote**。
- **已确认**：实施已获你批准；计划审核 PASS（88/100），审批 sha256 已回填。
**assistant [peer=github.com-tyvt-skills]**: 用户选择暂不推送。收尾：更新 todo 完成状态，清理过程产物（计划文件按规则保留在 D:\plan，非工作区产物；浏览器/前台任务无）。

`~/.openviking` 仓库里那 254 个脏文件是预存的记忆数据变动，非本次引入，未触碰。
**assistant [peer=github.com-tyvt-skills]**: 已完成。最终报告：

**结论**：OpenViking 的 `vlm` 与 `query_planner` 已从 `deepseek-v4.1-flash` 全量切到 hy4flash——主模型 `auto/hy4flash-free`（免费），`credentials` 兜底 `auto/hy4flash`（积分版），免费额度不足时由 OpenViking 原生 failover 自动切积分版。运行时已生效。

**改动与证据**
- 配置：[ov.conf](<C:/Users/Administrator/.openviking/ov.conf>) L29-70，两段各含 2 条 credentials（free 主 / 积分兜底）；备份 [ov.conf.bak-20261125-hy4flash](<C:/Users/Administrator/.openviking/ov.conf.bak-20261125-hy4flash>)。
- 验证：JSON + VLMConfig 解析通过、`ov status` VLM=`auto/hy4flash-free`、Embedding=`ollama/bge-m3-ov`、两模型直连网关正常、`ov search` 冒烟命中正常。负向故障注入未做（避免打断生产），兜底可用性已由直连验证覆盖。
- 提交：本地 `da4bf09`（仅 ov.conf）。仓库无 remote，按你的选择暂不推送。
- 计划：`D:/plan/skills/8eb9f9a92f36.md`，审核 PASS（88/100），sha256 已回填、`human_confirmed: true`。

**待定项**：推送——待你配置 `~/.openviking` 的 git remote 后再 push `master`（当前本地 ahead 1）。

<!-- MEMORY_FIELDS
{
  "event_name": "OpenViking模型配置切换",
  "goal": "切换模型配置",
  "summary": "2026-11-25 用户要求 OpenViking 全部改用 hy4 flash 模型、免费优先且额度不足时用积分版；将 ~/.openviking/ov.conf 的 vlm 与 query_planner 两段由 deepseek-v4.1-flash 改为主 auto/hy4flash-free（免费）+ credentials 兜底 auto/hy4flash（积分版），备份为 ov.conf.bak-20261125-hy4flash。JSON 与 VLMConfig 解析通过、两模型直连网关正常；热重载未生效故重启服务（杀监听 1933 的 python.exe 进程后用 start-ovserver-hidden.vbs 拉起），重启后 ov status 显示 VLM=auto/hy4flash-free、Embedding=ollama/bge-m3-ov，ov search 冒烟通过；未做生产故障注入，兜底可用性以直连验证覆盖。本地提交 da4bf09（仅 ov.conf）；~/.openviking 无 git remote 无法推送，用户选择暂不推送，本地 ahead 1。",
  "ranges": "12,48-102",
  "source_extraction_id": "9034f4386f4e4087a78ab07938116721",
  "version": 1,
  "memory_type": "events"
}
-->
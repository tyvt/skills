# Summary
2026-11-27，用户请求整理C盘清理清单。已完成扫描：C盘共150GB、已用142.6GB、仅剩7.4GB，C:\Users占80.6GB为主要占用。%TEMP%占22.3GB为最大目标，含335个agent-browser-chrome-*目录（约12GB）、306个dsh-workspace-changes-*（约4.58GB）、Ollama 0.40.13安装包临时文件（1.56GB）、旧仓库克隆cjbwg-old-repo（0.81GB）、Playwright下载包（0.48GB）与临时profile（0.33GB）、散文件约1.7GB。npm缓存3.55GB，企业微信WXWork 6.13GB，.dsh数据（sessions 0.99GB、dsh-ops 0.77GB、attachments 0.65GB），.m2 0.54GB、.cache 0.28GB、pnpm-cache 0.27GB。仅清点未删除任何文件，并提议按浏览器残留→dsh-workspace-changes→npm缓存顺序清理以回收约20GB、剩余空间回到约27GB；.dsh与WXWork不动，执行时逐批确认并避开在用文件，等待用户确认是否执行。
# 2026-11-27 (Friday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: C盘空间又快慢了，整理一个清单我看看
**assistant [peer=deepseek-harness-default-workspace]**: I'll investigate C drive usage and produce a cleanup checklist for you to review (read-only — I won't delete anything yet).
**assistant [peer=deepseek-harness-default-workspace]**: Build-gate doesn't apply here — no project code changed, just a temp diagnostic script in `%TEMP%`. Running the scan now.
**assistant [peer=deepseek-harness-default-workspace]**: C: 150 GB total, only 7.4 GB free. `C:\Users` is the main hog at 80.6 GB. Running the deeper scan now.
**assistant [peer=deepseek-harness-default-workspace]**: `%TEMP%` alone is 22.3 GB — the biggest target. Let me break it down plus Documents and `.dsh` to make the checklist actionable.
**assistant [peer=deepseek-harness-default-workspace]**: Temp has many `dsh-workspace-changes-*` folders (~90 MB each) — need the count and largest files to complete the picture.
**assistant [peer=deepseek-harness-default-workspace]**: The grouped dirs only sum to ~9 GB but Temp is 22.3 GB — thousands of loose files. One more check to close the gap.
**assistant [peer=deepseek-harness-default-workspace]**: Found it — 335 leftover `agent-browser-chrome-*` profile dirs = 12 GB. Cleaning up my scan scripts and finalizing the checklist.
**assistant [peer=deepseek-harness-default-workspace]**: C 盘 150 GB，已用 142.6 GB，**仅剩 7.4 GB**。已扫完，整理如下（只清点，**未删除任何东西**）：

## 🟢 高优先级 · 可安全清理（预计回收 ~25 GB）

| 项目 | 位置 | 大小 | 说明 |
|---|---|---|---|
| 浏览器自动化残留 | `%TEMP%\agent-browser-chrome-*`（335 个目录） | **12.04 GB** | 最大头；关掉正在跑的浏览器进程后可整批删 |
| 工作区变更缓存 | `%TEMP%\dsh-workspace-changes-*`（306 个） | **4.58 GB** | DSH 临时快照，建议保留最近 2 个，其余删 |
| Ollama 安装包残留 | `%TEMP%\WinGet\Ollama.Ollama.0.40.13\DO357E.tmp` | 1.56 GB | Winget 下载临时文件，单个文件 |
| 旧仓库克隆 | `%TEMP%\cjbwg-old-repo`（含 node_modules 0.27 + .git 0.24） | 0.81 GB | 临时 clone，确认无用即删 |
| Playwright 下载包 | `%TEMP%\playwright-download-*`（11 个） | 0.48 GB | Chromium zip，可重下 |
| Playwright 临时 profile | `%TEMP%\playwright_chromiumdev_profile*`（206 个） | 0.33 GB | 遗留 profile |
| 其他 temp（subprocess/spill/zip/散文件 3081 个） | `%TEMP%` 根下 | ~1.7 GB | 日志、tmp、安装包，按时间删 |
| npm 缓存 | `C:\Users\Administrator\AppData\Local\npm-cache\_cacache` | **3.55 GB** | `npm cache clean --force` 即可 |

## 🟡 中优先级 · 需你确认

- `C:\Users\Administrator\Documents\WXWork` — **6.13 GB**，企业微信文件，里面有聊天接收的资料，别盲目删，建议在企业微信里清理。
- `C:\Users\Administrator\.dsh\sessions`（0.99 GB）+ `dsh-ops`（0.77 GB）+ `attachments`（0.65 GB）— 会话与附件数据，删了历史不可恢复。
- `C:\Users\Administrator\.m2` 0.54 GB、`.cache` 0.28 GB、pnpm-cache 0.27 GB — 依赖缓存，可清但下次构建会重新拉。

## 🔴 不要手动删

- `C:\Windows\WinSxS` 8.77 GB — 系统组件商店，只能用 `Dism /Online /Cleanup-Image /StartComponentCleanup`。
- `C:\Program Files` 10.33 GB、`Program Files (x86)` 6.35 GB — 已安装软件，走正常卸载。

---

**建议动作顺序**：先清浏览器残留（12 GB）→ dsh-workspace-changes（4.5 GB）→ npm 缓存（3.5 GB），三步就能回收 ~20 GB，把剩余空间拉回 27 GB 左右。

要不要我按这个顺序直接执行清理？执行时我会逐批确认、避开正在使用的文件，`.dsh` 和 WXWork 这类不动。

<!-- MEMORY_FIELDS
{
  "event_name": "C盘空间诊断与清理提议",
  "goal": "诊断C盘占用",
  "summary": "2026-11-27，用户请求整理C盘清理清单。已完成扫描：C盘共150GB、已用142.6GB、仅剩7.4GB，C:\\Users占80.6GB为主要占用。%TEMP%占22.3GB为最大目标，含335个agent-browser-chrome-*目录（约12GB）、306个dsh-workspace-changes-*（约4.58GB）、Ollama 0.40.13安装包临时文件（1.56GB）、旧仓库克隆cjbwg-old-repo（0.81GB）、Playwright下载包（0.48GB）与临时profile（0.33GB）、散文件约1.7GB。npm缓存3.55GB，企业微信WXWork 6.13GB，.dsh数据（sessions 0.99GB、dsh-ops 0.77GB、attachments 0.65GB），.m2 0.54GB、.cache 0.28GB、pnpm-cache 0.27GB。仅清点未删除任何文件，并提议按浏览器残留→dsh-workspace-changes→npm缓存顺序清理以回收约20GB、剩余空间回到约27GB；.dsh与WXWork不动，执行时逐批确认并避开在用文件，等待用户确认是否执行。",
  "ranges": "0-52",
  "source_extraction_id": "67ffa46301be478cb8a61110990bd79a",
  "version": 1,
  "memory_type": "events"
}
-->
---
status: approved
human_confirmed: true
review: plan_review PASS 74/100 (cursor/grok-4.7@256k)
approved_sha256: 81c31bed69bdb246c9ba20c1510083fc97da0a7128f2ea0825bc4ae765993740
human_decisions: 确认实施; headless 停用 cursor 三模型; 删除重复 PNG 并 rm --cached; 废弃脚本无引用则直接删
---

# skills 仓库修复计划（2026-11-14）

## 一、前因后果
2026-11-13 全量审查发现若干可修复问题（凭据/仓库卫生/文档漂移/硬编码/重复/测试缺口）。用户已明确两项边界：①禅道密码保持现状不动；②记忆数据（openviking-memory 与 openviking-data）是换机可用的必要资产，必须继续随 git 同步，不移出仓库。本计划只修其余问题。

## 二、现状与证据
- 明文凭据：`zentao-analyzer/credentials.py:13`、`zentao_file.py:69`（用户决定不动 → **计划不含此项**）。
- 记忆数据：`openviking-data/README.md` 明确为"异地版本备份"，`scripts/snapshot-openviking-data.mjs` 每日 03:00 `--commit --push`；`openviking-memory/.snapshot-meta.json` fileCount=6732。→ **均保留在 git**。
- 文档漂移：`README.md` 列了不存在的 `grill-me`/`i-have-adhd`；`dsh-explore/SKILL.md` hook 名写 `explore-drift`（实际 `agent-guard·exploration`）；`token-frugal/SKILL.md` 调顶层 `workflow-audit.mjs`（实际在 `templates/`）；`tool-call-hygiene` 有 `daily-report.mjs` 未记文档。
- 实现/注释漂移：`dsh/plan-gate/lib/index.js:5`（reviewer 名过时 cursor→workbuddy）；`:187,199`（注释 fail-open vs 实现 block）；`dsh/profiles/headless/cordis.patch.yml:80,89,99` 仍启用 cursor 三模型。
- 硬编码绝对路径：`token-frugal/verify-profile.mjs:31`(D:\nvm)、`controller-bench/compare.ps1:2`、`captcha-recognizer/scripts/fetch-captcha.mjs:20`(D:/out)、`dsh/token-models/lib/index.js:21`+cordis:7、`dsh/mcp-gateway`/`orchestrator`/`orchestrator-gate` 的 cordis.patch.yml。
- 仓库卫生（不影响记忆数据）：`tool-call-hygiene/tool-error-today.json` 运行态入库；`zentao-analyzer/zentao_file_21043[_21043.png]`/`zentao_file_21199` 重复 PNG；`captcha-recognizer/` 整目录未跟踪；`.gitignore` 缺 `dsh/**/.pytest_cache/`、`dsh/**/.task-state/`；遗留 `dsh/token-guard/_bak_20261112-160336/`。
- 重复：`agent-cost-hygiene/SKILL.md` 与 `dsh-token-policy/SKILL.md` 至少 4 处重复；`dsh-token-policy` 的 `references/plan-contract.md`、`dual-model-prompts.md` 正文无入口（孤儿）。
- 测试缺口：`dsh/token-models` 无 selftest。
- 废弃脚本：`zentao_fetch.py`/`zentao_resolve.py`、`cursor-model-routing/validate-offtask.ps1`（与 `-signal.py` 并存）。

## 三、实施方案（分组，均不含凭据/记忆数据）
按风险从低到高，可分 PR：
1. **仓库卫生**：
   - `.gitignore` 增 `dsh/**/.pytest_cache/`、`dsh/**/.task-state/`（已核实这两类**当前均未被跟踪**，故只需加 ignore，无需 `git rm --cached`）、`tool-call-hygiene/tool-error-today.json`。
   - `tool-error-today.json` 已跟踪 → `git rm --cached tool-call-hygiene/tool-error-today.json`（保留本地文件）。
   - `captcha-recognizer/` 现为 `??` 未跟踪：先 `git -c core.quotepath=false add -n captcha-recognizer/` 列出将纳入清单，确认无运行态产物（如临时图片/out）后再 `git add`；必要时先在其下补局部 `.gitignore` 排除产物。
   - 删除 `dsh/token-guard/_bak_20261112-160336/`（未跟踪，直接删目录）。
   - `zentao-analyzer/` 下 `zentao_file_21043`、`zentao_file_21043.png`、`zentao_file_21199`、`zentao_file_21199.png`（约 1.2MB 重复 PNG）：`git rm --cached` 后删除本地，或在 `.gitignore` 增 `zentao-analyzer/zentao_file_21*` 并 `git rm --cached`。
2. **文档漂移**：重写根 `README.md` 技能清单（对齐实际目录）；`dsh-explore/SKILL.md` hook 名统一为 `agent-guard·exploration`；`token-frugal/SKILL.md` 路径改 `templates/workflow-audit.mjs`；`tool-call-hygiene/SKILL.md` 补 `daily-report.mjs` 说明。
3. **注释/配置漂移**：
   - `dsh/plan-gate/lib/index.js:5` reviewer 名更新（cursor→workbuddy/deepseek-v4.1-flash）；`:187,199` 注释改为 block 语义（仅改注释，不改实现）。
   - `dsh/profiles/headless/cordis.patch.yml:80-99` 的 cursor 三模型：**已核实 headless 确实启用**（改启用项＝行为变更）。默认**只修正误导**：不改启用项，仅按 settings.yaml 的写法补一行注释说明"cursor 系列已因吞吐问题在 settings 停用，此处保留待评估"；是否真正注释停用见"待人确认项"，不在默认实施范围。
4. **硬编码路径**（逐处写明 env 名 / 回退根 / 空值默认）：
   - `token-frugal/verify-profile.mjs:31`：删 `D:\nvm\nodejs` 首选，改为依次尝试 `process.env.DSH_BIN` → `os.homedir()` 下的 nvm 常见路径 → PATH 查找；全部失败抛错（保留现有多级回退语义）。
   - `controller-bench/compare.ps1:2`：改 `$PSScriptRoot` 相对拼 `score-full.json`。
   - `captcha-recognizer/scripts/fetch-captcha.mjs:20`：默认输出改 `path.join(os.tmpdir(), 'fresh_captcha.jpg')`（仍可被 argv[2] 覆盖）。
   - `dsh/token-models/lib/index.js:21` 与 `cordis.patch.yml`：默认值改 `process.env.DSH_ORCH_SESSIONS_DIR || <相对 dsh/langgraph-orchestrator/.sessions>`。
   - `dsh/mcp-gateway`、`dsh/orchestrator`、`dsh/orchestrator-gate` 的 cordis.patch.yml：绝对路径改 `$DSH_*` env 优先 + 相对回退（每个插件沿用自身已有 env 名，无则新增 `DSH_<PLUGIN>_DIR` 并写注释）。
5. **去重与收编**：`agent-cost-hygiene/SKILL.md` 与 `dsh-token-policy` 去重（token 阈值统一收敛到 dsh-token-policy，agent-cost-hygiene 只留读文件/反空转/构建止损）；`dsh-token-policy` 孤儿 references 补正文入口指针。
6. **测试与归档**：
   - 为 `dsh/token-models` 补最小 `selftest.mjs`（覆盖 aggregate 聚合与 sessionsDir 解析默认值/env 覆盖）。
   - 废弃脚本：`zentao-analyzer/zentao_fetch.py`、`zentao-analyzer/zentao_resolve.py`、`cursor-model-routing/validate-offtask.ps1`。删除前先 `grep`/`rg` 确认无被 SKILL/其他脚本引用，无引用则移入各自目录 `_deprecated/`；有引用则保留并改文档。

## 四、验证计划
- 每步改完：`git -c core.quotepath=false status --short <范围>` 核对只动了预期文件。
- `.gitignore`/`git rm --cached`：`git status --short` 确认不再出现对应噪音，且 openviking-data/openviking-memory **无变化**（回归确认记忆数据未受影响）。
- 插件代码改动（plan-gate/headless/token-models）：跑对应 `node dsh/<plugin>/selftest.mjs`（token-models 新补后跑新测试）。
- 路径改动：对每个改过的脚本/配置做**解析自检**——设置/不设 env 两种情况下打印实际解析出的路径，确认指向预期目录（仅 `node --check`/语法检查发现不了路径解析错误）；PowerShell 脚本用 `pwsh -NoProfile -File <ps1> -?` 或 dry-run 段验证 `$PSScriptRoot` 拼接正确。
- 文档改动：人工核对 README 与目录一致、SKILL 命令可复制执行。
- 全程 `git diff` 复核后收尾按用户选择提交。

> 变更受 git 管理，git revert 即可。openviking-data/openviking-memory 不做任何删除或 ignore。

## 五、待人确认项
- **headless cursor 三模型**：默认只补注释不改启用项。若你希望 headless 也彻底停用 cursor（与 settings.yaml 对齐），请一并告知，否则本步骤仅做注释澄清。
- **是否删除重复 PNG**（`zentao_file_21043/21199`）：若其中含未归档的历史证据需保留，请说明改移入 `imgs/`（已 ignore）而非删除。
- **废弃脚本**：确认可删/归 `_deprecated/`，或保留。

---
name: agent-cost-hygiene
description: 会话 token/成本卫生规范。读文件策略（grep 定位 + 窄读）、会话配置稳定性、本机 vite 构建卡死与 cost-meter 首次警告止损、收口时机与收尾格式。当会话 token 消耗过高、要跑 npm test/vite build、或上下文接近窗口压力时使用。
---

# agent-cost-hygiene

## 读文件
- 先 `grep -n` 拿行号表，再 `read offset/limit`，单次 ≤120 行；禁止整读 >300 行的文件。超过 200 行且没给 offset/limit 的 read，只看前 40 行，然后改成按行号窄读。
- grep 先缩到本会话已读过的模块目录，禁止从仓根开搜；命中超过 20 条只留文件列表和每文件前 3 条，全文不回灌。
- 同一文件同一段落不重复读；需要多处时一次读「行号表 + 3 段窄读」。
- skill/文档用 grep 定位章节后只读该区间，不从 offset 39 试到 142。
- **该 grep 的不整读**：只为确认函数签名/常量值时，`grep "export function xxx"` 一行即可，不要整读几百行。
- **跳过无关文件**：占位页、README、与任务无引用关系的 utils，未被引用就不读。
- **探索并成 2 步**：第 1 步并行 `glob "**/*"` + `read package.json` + `read .env.example`；第 2 步并行读 4–5 个核心文件（入口页/核心 store/request/配置）。不要列根→列 src→再逐个读地散着摸结构。
- **pwsh 输出乱码立即换 `read`**：看到 `涓?` `鍒嗘敮` 这类 GBK 乱码说明 pwsh 编码不对，直接用 `read` 工具重读该文件，不要对着乱码猜关键变量名。

## 会话稳定性
- 同一会话不中途改模型、不改 reasoningEffort（改则整段缓存失效）。
- 上下文接近窗口 60% 即收口；根因判定用「1 次评论 + 1 次目录 SQL + 1 次 grep + 1 次窄读」封顶，不做长链反复推演。

## 反空转（cost-meter 已自动升级，这里是配套纪律）
- 出现 `[reasoning-watchdog]` 且带「已连续 N 步无工具调用」= 已经第 2 个纯推理步，**下一步第一件事必须是工具调用**（一条 SQL / 一次窄读 / 一次 grep 定位），不准再列 Option 1/2/3、不准再自我辩论。
- 判定词自检：写出「Option 1/2/3」「要不要」「我纠结」「让我想想」时，视为缺事实，立刻查一条命令，而不是继续脑内演算。
- 单步 reasoning 输出 >1.5k tokens 且无工具调用即停：先取数或直接下结论。

## 读前守卫（大文件先 grep 再读）
- 目标文件 >150 行且本 turn 还没 grep 过它 → 先 `grep -n` 拿行号表（或确认函数/常量位置），再 `read offset/limit`，禁止直接整读。
- 压缩（compaction/prune）会 shadow 掉整读结果；被 `edit` 过的文件优先保留其片段，不要「读→被压→再读」。二次读同一文件时只读变更段。
- `token-guard` 已对 >500 行或超预算的 read 做头尾裁剪/落盘，看到它的裁剪提示就改用 offset/limit 续读，不要再整读一次。

## 增量注入 / 工具注册（诊断 & 规避）
- catalog / memory / runtime context 重复注入会拉高首屏未命中；若发现同一 skill 目录列表 / memory 在一会话里注入两次，说明是会话结构问题，不是本 turn 可修，收尾时记一笔。
- tools 全量 schema 首屏很大是宿主行为，插件层改不了；规避办法只有「任务简单就少加载 skill、少触发 MCP 工具」。
- **平台不可行项（已评估）**：① `maxReasoningTokens` 硬上限——reasoningEffort/token 上限在 turn 开始时固定，cost-meter 的 pre-step 只能在 enter/reject 间选，无法中途下调，只能靠上面的「反空转」行为层截断；② tools 懒注册 / MCP 工具懒暴露——属宿主注册表行为，插件无法按需注册；③ `analyze_image` 低成本/区域 OCR 模式——MCP 侧能力，插件改不了，只能靠规则「默认不看」。

## 截图策略
- 默认不看截图：文案、显隐、单字段、计数口径、纯文字描述类需求一律不读图。
- 只有涉及布局/像素对齐/多字段对照/难以文字描述的视觉问题时才读，且最后读、一次一张（图片打穿 prefix cache，读 1 张后后续 step 全价计费）。
- 需要看图时优先看宿主/日志里已有的文字描述或 DOM，别为了确认一个文案去读 43k 的整图。

## skill references 懒加载
- skill 正文提到的 `references/*` 按需读：正文说「进入该子场景才 read」就不要一次性全读；用到哪一条读哪一条。
- skill 正文与 references 属高优先级上下文，压缩时不应被丢弃后又回填；若发现 skill 正文被 prune 再 replace 回填，说明读得过多，收尾时记一笔。

## 环境预检与命令失败缓存
- 跑 test/build 前先看 `package.json` 脚本与本机已知坑（见下「本机构建与止损」）；`vitest` 版本与 `vite` 不匹配类错误（`ERR_PACKAGE_PATH_NOT_EXPORTED`）改走 `vue-tsc` 等替代，不要反复重试同一条坏命令。
- 同一 test/build 命令失败一次后，本 turn 内不再原样重试，直接换备用路径；失败原因写进交付说明。

## 收尾
- git 检查开工一次（worktree list + status -sb + fetch）、收尾一次即可；中间只跑单条 `status -sb`。
- 最终报告 = 结论 + 证据表 + 未验证项，不复述改动细节。
- **结尾必须用 `ask_user_question`**：需要用户选择时（如仅提交/提交并推送/暂不处理）弹选项卡片，禁止在正文末尾用「要吗」提问。
- **成本超预期先说清**：cost-meter 触发后，总结里一句话说明主要成本来源，再收尾。
- **不确定性给验证方法**：接口路径/参数不确定时，给出可执行的验证命令 + 失败改哪一行，而非只标注「可能不对」。
- **死代码显式标注**：发现已无调用方的新遗留代码，在交付说明里写明「已知遗留 X 待清理」，不只留在内部推理。

## 本机构建与止损（bug6402）
- 本机 `npm test`（`node scripts/vite-build.mjs build --mode test --logLevel error`）会在写出 `version.json` 后卡死（CPU 约为 0）。默认不跑，交付写「构建未执行」；要构建证据走 CI。
- 若仍要跑：先 `New-Item -ItemType Directory -Force` 建日志目录；`Start-Process -PassThru` 拿 PID；约 30 秒查一次 CPU，为 0 立即 kill。禁止连续 3 次以上 `job_output` 长等。
- `--logLevel error` 下禁止 `Out-String | Select-Object -Last`（进程不结束就永远无输出）；日志用 `*>` 流式重定向。`Out-File` 不会建不存在的目录。
- cost-meter 首次警告（约 150k，且代码与 eslint 已完成）即止损：放弃本地 build，提交并标注未验证。不要在卡死的构建上把 150k 拖到百万级。

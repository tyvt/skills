---
name: agent-cost-hygiene
description: 会话 token/成本卫生规范。读文件策略（grep 定位 + 窄读）、会话配置稳定性、本机 vite 构建卡死与 cost-meter 首次警告止损、收口时机与收尾格式。当会话 token 消耗过高、要跑 npm test/vite build、或上下文接近窗口压力时使用。
---

# agent-cost-hygiene

## 读文件
- 先 `grep -n` 拿行号表，再 `read offset/limit`，单次 ≤120 行；禁止整读 >300 行的文件。
- 同一文件同一段落不重复读；需要多处时一次读「行号表 + 3 段窄读」。
- skill/文档用 grep 定位章节后只读该区间，不从 offset 39 试到 142。
- **该 grep 的不整读**：只为确认函数签名/常量值时，`grep "export function xxx"` 一行即可，不要整读几百行。
- **跳过无关文件**：占位页、README、与任务无引用关系的 utils，未被引用就不读。
- **探索并成 2 步**：第 1 步并行 `glob "**/*"` + `read package.json` + `read .env.example`；第 2 步并行读 4–5 个核心文件（入口页/核心 store/request/配置）。不要列根→列 src→再逐个读地散着摸结构。
- **pwsh 输出乱码立即换 `read`**：看到 `涓?` `鍒嗘敮` 这类 GBK 乱码说明 pwsh 编码不对，直接用 `read` 工具重读该文件，不要对着乱码猜关键变量名。

## 会话稳定性
- 同一会话不中途改模型、不改 reasoningEffort（改则整段缓存失效）。
- 上下文接近窗口 60% 即收口；根因判定用「1 次评论 + 1 次目录 SQL + 1 次 grep + 1 次窄读」封顶，不做长链反复推演。

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

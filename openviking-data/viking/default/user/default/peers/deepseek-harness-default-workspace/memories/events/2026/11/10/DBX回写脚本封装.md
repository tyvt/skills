# Summary
用户在 2026-11-10 建议将 DBX 回写封装成脚本替代文档提醒（connection_name 第三次复发证明文档管不住）。助手创建 D:\repository\skills\zentao-analyzer\zentao-resolve.mjs，仅暴露 bugId 与 commentHTML 参数，生成全套 8 步 mcp_gateway 调用（每步必带 connection_name）及核验点，自测通过；DBX.md 回写段改为「首选跑脚本，手工流程仅降级用」，并去掉 commit 后第二次无 session 复核的冗余要求。已提交 6e4c1252。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: ...这不是“没读文档”，是读了也不照做。文档约束对这种“顺手省略参数”的行为无效。

→ 建议改机制而非改文档：在 mcp_gateway 调用 dbx_execute_query 前做参数校验，缺 connection_name 直接拒绝并回提示；...
...
**user [peer=deepseek-harness-default-workspace]**: ...cost-meter 阈值 15k→10k 这次必须落地。连续三轮未执行，这条已经不是“建议”，是方案 3.2 的验收项。

DBX 回写封装成脚本，替代“靠文档提醒”。文档已证明管不住。

AGENTS.md 阈值条补一句：grep 优先限定到目标业务目录，全 src/** 的 grep 必须先缩范围或走 orchestrate。

末尾提问违规：这条没成本，但违反了核心规范第 5 条，重读即可。
...
**assistant [peer=deepseek-harness-default-workspace]**: DBX.md 读完。现在写 `zentao-resolve.mjs` 固定回写脚本：
...
**assistant [peer=deepseek-harness-default-workspace]**: 脚本自测通过。现在把 DBX.md 回写段指向脚本，并补 AGENTS.md 窄 grep 规则：
...
**assistant [peer=deepseek-harness-default-workspace]**: 落地完成。改动状态：`.dsh` 仓库里 AGENTS.md 已改（另有两个非本次的脏文件），skills 仓库有 DBX.md 改动 + 新脚本。
...
**assistant [peer=deepseek-harness-default-workspace]**: ...js:29` 已是 `?? 10_000`（今天早些时候已覆盖）。本轮仍报 ">15k" 是运行中旧进程，重启 web 后新会话生效。
2. **DBX 回写封脚本**：新增 [zentao-resolve.mjs](<D:\repository\skills\zentao-analyzer\zentao-resolve.mjs>)，参数只暴露 `bugId` 和 `commentHTML`，生成全套 8 步 `mcp_gateway` 调用（每步必带 `connection_name`）及核验点，已自测通过；[DBX.md](<D:\repository\skills\zentao-analyzer\DBX.md>) 回写段改为「首选跑脚本，手工流程仅降级用」。同时按上轮观察去掉了 commit 后第二次无 session 复核的冗余要求。...

<!-- MEMORY_FIELDS
{
  "event_name": "DBX回写脚本封装",
  "goal": "封装DBX回写脚本",
  "summary": "用户在 2026-11-10 建议将 DBX 回写封装成脚本替代文档提醒（connection_name 第三次复发证明文档管不住）。助手创建 D:\\repository\\skills\\zentao-analyzer\\zentao-resolve.mjs，仅暴露 bugId 与 commentHTML 参数，生成全套 8 步 mcp_gateway 调用（每步必带 connection_name）及核验点，自测通过；DBX.md 回写段改为「首选跑脚本，手工流程仅降级用」，并去掉 commit 后第二次无 session 复核的冗余要求。已提交 6e4c1252。",
  "ranges": "8,13,38,42,47,55,56,57",
  "source_extraction_id": "7cbade9e69fc4f3fb8d82d9259412d8d",
  "version": 1,
  "memory_type": "events"
}
-->
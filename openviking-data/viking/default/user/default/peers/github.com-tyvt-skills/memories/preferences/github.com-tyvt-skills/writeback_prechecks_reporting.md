- Before writeback, confirm the apply script path: it is in the project scripts directory and the working directory is D:/repository/skills.
- Before writeback, run a final privacy and sensitive-information scan on all candidate bodies; after completion, clean temporary validation scripts and keep only cache intermediates.
- Judgment result fields use judgment only as valid/invalid, note truncated to 500 characters, and reread sha verification before writeback; any body change must update the sha or readback verification fails.
- After audit writeback, run stats to obtain accurate coverage numbers; use the stats result for the coverage figure in the brief.
- Long-running apply jobs may perform many sequential `ov write --wait` plus read-back calls and print only at the end, so silence is expected; monitor progress by checking the audit log (audit.jsonl) timestamp and counting this round's applied records instead of repeatedly issuing the same wait.
- 批量回写时用脚本从 select.json 读取 uri/sha，结合逐条判定生成 result.json 后再执行 apply，避免手写几十条记录出错；长时 apply 可转入后台运行后再收集结果。
- 当 apply 卡住超过十分钟无输出时，先窄读 apply 实现，判断是否有进度落盘、单次 ov 调用超时上限（120s）和逐条多调用的正常耗时，确认慢属正常后再继续等待，不盲目反复查后台状态。
- 审计简报按固定结构给出：覆盖率行（总记忆数、已抽查数与百分比、剩余数、累计 valid/invalid）、本轮结果（抽查数→valid/invalid 计数）、逐条列出 INVALID 项的编号、关键符号与不成立的证据，以及收尾范围声明（未改记忆正文语义、未删除记忆、未提交 git）。
- 回写时若记忆文件名含空格（如 `coluna esquerda com scroll limitado.md`），会导致 URI 漂移、back_status=null 而被 skip；此类条目本轮跳过即可，不强行修复，并在简报中如实说明 skipped 数量与原因。

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "writeback_prechecks_reporting",
  "source_extraction_id": "dab11d3dd721421585b22e1163f92da8",
  "peer_id": "github.com-tyvt-skills",
  "version": 5,
  "memory_type": "preferences"
}
-->
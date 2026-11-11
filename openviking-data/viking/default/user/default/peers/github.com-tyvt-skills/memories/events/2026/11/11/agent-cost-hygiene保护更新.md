# Summary
2026-11-11，agent-cost-hygiene 技能更新：超200行只读前40行；grep先缩到已读模块，超20条只留文件列表。源于用户建议3、4。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...### 建议 3：grep 默认 scope 收敛
- 工具层：在 Vue 项目里，若本会话最近 read 过 `src/views/<模块>/**`，grep 的默认 path 建议到该模块；对 >20 matches 的结果**只回文件列表 + 每文件前 3 条**，全文落盘不回灌。
- 现日志正是 39 matches + spill 触发的 20k 未命中。

### 建议 4：read 大文件保护
- 当文件 >200 行且未指定 `offset/limit` 时，read 先返回前 40 行 + 「已定位？建议 grep 后 read offset/limit」提示。可避免 step 10 的 6k 整读。

### 建议 5：skill 内置 gate
- 在 `zentao-analyzer` 的 `references/dbx....
...
**assistant [peer=github.com-tyvt-skills]**: ...selftest 通过，并已覆盖到 `profiles\web\node_modules\dsh-cost-meter`，重启 Web 后新会话生效 |
| grep/read 默认保护 | `agent-cost-hygiene`：超 200 行只看前 40 行；grep 先缩到已读模块，超 20 条只留文件列表 |
| 先查一条再读代码 | `zentao-analyzer` 第 5 条改为阻塞项；`references/dbx.md` 给了 `ALL_TAB_COLUMNS` 和一行样本的固定 SQL |...

<!-- MEMORY_FIELDS
{
  "event_name": "agent-cost-hygiene保护更新",
  "goal": "记录技能变更",
  "summary": "2026-11-11，agent-cost-hygiene 技能更新：超200行只读前40行；grep先缩到已读模块，超20条只留文件列表。源于用户建议3、4。",
  "ranges": "19-21,97-98",
  "source_extraction_id": "114cae7623bc498d9bf1b83f57880dd7",
  "version": 1,
  "memory_type": "events"
}
-->
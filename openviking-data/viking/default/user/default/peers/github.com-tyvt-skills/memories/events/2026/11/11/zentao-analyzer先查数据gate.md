# Summary
2026-11-11，zentao-analyzer 第5条改为阻塞项，references/dbx.md 给出 ALL_TAB_COLUMNS 和一行样本固定SQL，要求先查真实数据再读代码。源于用户建议5。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...建议 grep 后 read offset/limit」提示。可避免 step 10 的 6k 整读。

### 建议 5：skill 内置 gate
- 在 `zentao-analyzer` 的 `references/dbx.md` 流程里，把「读业务代码」设为**阻塞项**：必须先完成「一条真实数据查询」（表结构或样本行）才能进入代码阅读。日志中 step 21 的 DB 查询若提前到 step 10 之前，可省掉 step 12–20 大半推理。...
...
**assistant [peer=github.com-tyvt-skills]**: ...grep 先缩到已读模块，超 20 条只留文件列表 |
| 先查一条再读代码 | `zentao-analyzer` 第 5 条改为阻塞项；`references/dbx.md` 给了 `ALL_TAB_COLUMNS` 和一行样本的固定 SQL |...

<!-- MEMORY_FIELDS
{
  "event_name": "zentao-analyzer先查数据gate",
  "goal": "记录技能变更",
  "summary": "2026-11-11，zentao-analyzer 第5条改为阻塞项，references/dbx.md 给出 ALL_TAB_COLUMNS 和一行样本固定SQL，要求先查真实数据再读代码。源于用户建议5。",
  "ranges": "21-22,98",
  "source_extraction_id": "114cae7623bc498d9bf1b83f57880dd7",
  "version": 1,
  "memory_type": "events"
}
-->
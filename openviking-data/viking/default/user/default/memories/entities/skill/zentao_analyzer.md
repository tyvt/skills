# zentao-analyzer
DSH 技能，用于禅道缺陷根因分析。

## 功能
- 根因顺序：症状 → 先查真实数据 → 再读代码。
- 2026-11-11 起第 5 条改为阻塞项：必须先完成一条真实数据查询（表结构或样本行，如 ALL_TAB_COLUMNS 与一行样本固定 SQL）才能进入代码阅读（references/dbx.md 提供）。
- 2026-11-24 实践补充：codeerror 类 UI 缺陷须先用 agent-browser 在目标环境复现再写修复方案；zt_action 无评论时改读 zt_bug.steps 分片与附件截图辅助定位。
- 2026-11-24 实践补充：codeimprovement 类型无强制复现要求，可直接以附件截图作证据；截图用缓存下载脚本落到 D:\禅道附件\bug\<bugID>\；DBX 连接名「新禅道」，工具参数为 sql 与 connection_id/connection_name。
- 2026-11-24 实践补充：行号脚本改大文件易引入语法错误（重复 methods/items、缺括号），恢复文件后改用精确字符串替换加断言更稳；注意文件缩进为 20 空格而非 21，区块插入须消耗锚点行否则死循环。

## 关系
- 与 dsh-cost-meter、agent-cost-hygiene 同批次降本优化。

<!-- MEMORY_FIELDS
{
  "category": "skill",
  "name": "zentao_analyzer",
  "source_extraction_id": "5da7744185e4469c8abe8ffd55095b1c",
  "version": 3,
  "memory_type": "entities"
}
-->
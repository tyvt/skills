# DBX 使用手册（仅查询/回写时读）

> 从 SKILL.md 拆出。要做 DBX 查询/回写时再读本文件，不要和入口 skill 一起加载。

## 手册（逐条禁忌，每条最多重试一次；第二次直接换 SQL / 换工具）

- **禁忌第 1 条（Dameng 找表，bug6369 / bug6401）：直接查目录 SQL，不试 dbx_list_tables**——pattern 会被忽略；不带 schema 查业务表会报「无效表名」。固定脚本：
  `SELECT OWNER, TABLE_NAME FROM ALL_TABLES WHERE TABLE_NAME LIKE '%<关键词>%';`
  拿到 schema 后再查列：`SELECT COLUMN_NAME, DATA_TYPE FROM ALL_TAB_COLUMNS WHERE OWNER='<schema>' AND TABLE_NAME='<表名>';`
- **每次 `dbx_execute_query` 都带 `connection_name`（或 connection_id）**，不只是有 session_id 时才要；否则 CONNECTION_NOT_FOUND。
- `dbx_describe_table` 必须显式 owner，否则 No columns found；优先 ALL_TAB_COLUMNS。
- **长文本（steps/comment）按 cell 约 200 字截断，SUBSTRING 顺序分段也拿不全**：改 `UNION ALL` 每段一行，或 `dbx_execute_and_show`。仍拿不全就改 `git log`，不要连续分段试。
- **`INSERT zt_action` 严格 14 列，files 用 NULL**。bug6369 / bug6401 都因过 Column count doesn't match。
- 只读连接写会被拒。事务：`dbx_open_session(enable_transactions=true)` → `dbx_begin_transaction` → 写 → 复核 → `dbx_commit_transaction`（或 rollback）。
- 调 `mcp_gateway` 时 `server: "dbx"` 只用来列工具；执行要带 `tool` 与 `arguments`，SQL 参数名是 `sql`。
- **固定模板，照抄**：
  ```text
  mcp_gateway { "server": "dbx", "tool": "dbx_execute_query",
                "arguments": { "connection_name": "新禅道", "sql": "<SQL>" } }
  ```
  反例：`tool: "query"` → tool not found；只传 session_id 漏 connection_name → CONNECTION_NOT_FOUND。

## 取详情

链接：`m=bug&f=view&bugID=` → `zt_bug`；`m=task&f=view&id=` → `zt_task`；`m=story&f=view&storyID=` → `zt_story` + `zt_storyspec`。

```text
SELECT id,title,status,severity,openedBy,assignedTo,product,project,execution,
       openedBuild,resolution,resolvedBuild
FROM zt_bug WHERE id=<id>;

SELECT 1 seg, SUBSTRING(steps,1,500) txt FROM zt_bug WHERE id=<id>
UNION ALL SELECT 2, SUBSTRING(steps,501,500) FROM zt_bug WHERE id=<id>
UNION ALL SELECT 3, SUBSTRING(steps,1001,500) FROM zt_bug WHERE id=<id>
ORDER BY seg;

SELECT id,name,status,type,assignedTo,openedBy,project,execution,story,parent,`desc`
FROM zt_task WHERE id=<id>;

SELECT id, actor, action, date, comment
FROM zt_action WHERE objectType='bug' AND objectID=<id> ORDER BY id;
```

1. `action='commented'` 是需求变更/后端说明，必须读完再动手；晚于 opening 的评论优先于 steps。
2. 评论里的接口路径、入参、字段名原文抄下来再对代码。
3. 子任务（`parent` > 0）或正文为空时查父任务与 `zt_storyspec.spec`。
4. 跨项目复用：`git log --grep=<关键词>`。
5. **根因顺序：症状 → 先查真实数据 → 再读代码**。bug6369 在一条 `SELECT PLAN_FILE_URL ...` 之前空转推演。这是阻塞项，不是建议：字段名/枚举/返回结构不确定时，下面两条没跑出结果之前，不读业务代码。
   - 表结构：`SELECT COLUMN_NAME FROM ALL_TAB_COLUMNS WHERE TABLE_NAME='<表>' ORDER BY COLUMN_ID`
   - 样本行：`SELECT * FROM <表> WHERE ROWNUM = 1`（达梦）或 `LIMIT 1`

## 回写（唯一推荐路径）

```text
node D:\repository\skills\zentao-analyzer\zentao-resolve.mjs <bugId> --comment-file <path>
node D:\repository\skills\zentao-analyzer\zentao-resolve.mjs <bugId> --comment-b64 <base64>
node D:\repository\skills\zentao-analyzer\zentao-resolve.mjs <bugId> <commentHTML>   # 兼容，仅短文本
```

**comment 含 `'` / 换行 / HTML 时禁止走位置参数**（bug6402 亲历：单引号破坏 PowerShell 单引号字符串 → `ParserError`）。优先 `--comment-file` 写 UTF-8 文件再传，或 `--comment-b64`（`[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($html))`）。脚本内部已把 `'` 转义为 `''`，无需手工处理引号；文件/base64 末尾换行会自动去除。

脚本只**打印** mcp_gateway 序列，不代执行。照抄执行，每步必带 connection_name。禁止手工拼 INSERT。只写新禅道；老禅道库禁止写。回写后复核 resolvedBy/resolvedDate/resolution 已落库。

## 表结构速查

- `zt_bug`：`id,title,status,severity,openedBy,openedDate,resolvedBy,resolvedDate,resolution,resolvedBuild,assignedTo,product,project,execution`（是 `resolvedBuild`，没有 `build`）。
- 状态：`active` → `resolved` → `closed`。
- resolution：`bydesign, duplicate, external, fixed, notrepro, postponed, willnotfix, productized`。

## 附录 A：脚本缺失时的应急 SQL（禁止跳过脚本）

1. `dbx_open_session(connection_id=<新禅道>, enable_transactions=true)` 拿 `session_id`；
2. `dbx_begin_transaction(session_id=...)`；
3. UPDATE + INSERT 都带同一 session_id 与 connection；
4. 事务内 SELECT 复核；
5. `dbx_commit_transaction` 后再无 session 复核一次；`dbx_close_session`。

```text
SELECT id,status,assignedTo,openedBy,product,project,execution,resolution
FROM zt_bug WHERE id=<id>;

UPDATE zt_bug SET status='resolved', resolution='fixed', resolvedBuild='trunk',
  resolvedBy='tiany', resolvedDate=NOW(), assignedTo='<openedBy>',
  lastEditedBy='tiany', lastEditedDate=NOW()
WHERE id=<id>;

INSERT INTO zt_action
  (objectType,objectID,product,project,execution,actor,action,date,comment,files,extra,`read`,efforted,vision)
VALUES ('bug',<id>,'<product>',<project>,<execution>,'tiany','resolved',NOW(),'<根因+修复+验证 HTML>',NULL,'fixed',0,0,'rnd');
```

- `product` 可写纯数字或逗号包裹，与同产物其他 bug 一致。
- `extra` 写 resolution；`vision` 写 `'rnd'`；`` `read` `` 必须反引号。列数必须是 14。
- comment 用 HTML：根因 + 修复 + 验证证据（构建时间、部署站点、提交号）。

## SQL 合并与长文本（审计 P1-8 / F1）

- 同一连接、同一对象的多条查询**合并成一条多语句**（`dbx_execute_query` 的 `sql` 支持分号分隔），减少往返与每步未命中。不要分 4、5 次各查一点。
- 长文本（steps/comment）固定动作，四步一次完成（bug6520 复盘 O4：量了 LENGTH=352 仍续读一次，禁止复现）：
  1. `SELECT LENGTH(steps) FROM zt_bug WHERE id=<id>;` → 得 `L`；
  2. 心算段数 `ceil(L/500)`；
  3. 一条 SQL 一次取完（段数按 L 定）：`SELECT seq, SUBSTRING(steps,(seq-1)*500+1,500) FROM zt_bug WHERE id=<id>` 按段数写多条 `UNION ALL SELECT <n>, SUBSTRING(steps,(<n>-1)*500+1,500) ...`（例 352 字两条即全取）；
  4. 禁止先取一段、等截断提示再续读（seq 46→58 用了 3 次才拿全 371 字）。返回若被截断带 `next_cell_char_offset`，用总长减已读一次补齐。仍拿不全改 `git log`；禁止同一形态连试三次。

## INSERT 列数预校验（审计 F2，已在 mcp_gateway 落地）

- `mcp_gateway` 对 `dbx_execute_query` 的 INSERT 做**发送前列数 vs 值数预校验**：不匹配直接抛错并点出常见漏项（zt_action 固定 14 列、`files` 写 NULL、`extra` 写 resolution、`` `read` `` 反引号、vision `'rnd'`），不会再等 MySQL 报 `Column count doesn't match`（seq 614）。
- 即便如此，回写**只用 `zentao-resolve.mjs` 生成的模板照抄**，别手拼 INSERT。


## 回写链路现状（审计 P5-18 / P5-19）

- `zentao-resolve.mjs` 已支持 `--comment-file` 与 `--comment-b64`（P5-19 的 base64 规避引号/HTML 转义**已落地**），脚本内部把 `'` 转成 `''`。
- 脚本仍只**打印** 8 步 mcp_gateway 序列，不代执行：`dbx_open_session → begin → UPDATE → INSERT → 复核 → commit → close` 需要 MCP 会话编排，本地插件/离线脚本无法直接驱动（P5-18 的"复合事务工具"是 MCP 服务端能力，不在本仓可改范围）。照抄打印的序列执行，每步必带 `connection_name`+`session_id`。

# DBX 使用手册（按需读，避免重复试错）

> 本文件从 SKILL.md 拆出。要做 DBX 查询/回写时再读本文件，SKILL.md 不再内联这些细节。

## 手册（逐条禁忌，每条最多重试一次；第二次直接换 SQL / 换工具）

- **首次 `dbx_execute_query` 也必须带 `connection_id`（或 connection_name）**，不是只有传 session_id 时才要；否则 CONNECTION_NOT_FOUND。
- `dbx_list_tables` 的 pattern 参数会被忽略（Dameng），直接查目录 SQL：`SELECT TABLE_NAME FROM USER_TABLES WHERE TABLE_NAME LIKE '%X%'`；列信息：`SELECT ... FROM ALL_TAB_COLUMNS WHERE OWNER='<schema>' AND TABLE_NAME='<t>'`。
- `dbx_describe_table` 必须显式 owner，否则返回 No columns found；优先用 ALL_TAB_COLUMNS。
- **长文本字段（steps/comment）被 MCP 按 cell 200 字截断，SUBSTRING 顺序分段也拿不全**：改用 `UNION ALL` 每段一行（见下），或直接用 `dbx_execute_and_show`。
- `INSERT zt_action` 严格照抄 14 列，files 列用 NULL 占位（列数不匹配是高频错误）。
- 写策略：只读连接写会被拒；事务化写需 `dbx_open_session(enable_transactions=true)` 再 `dbx_begin_transaction` / `dbx_commit_transaction`（或 `dbx_rollback_transaction`）。
- 调 `mcp_gateway` 时 `server: "dbx"` 只用来列工具，真正执行要再带 `tool` 与 `arguments`；执行 SQL 的参数名是 `sql`。

## 取详情

链接形态：`m=bug&f=view&bugID=` → `zt_bug`；`m=task&f=view&id=` → `zt_task`；`m=story&f=view&storyID=` → `zt_story` + `zt_storyspec`。

```text
-- Bug
SELECT id,title,status,severity,openedBy,assignedTo,product,project,execution,
       openedBuild,resolution,resolvedBuild
FROM zt_bug WHERE id=<id>;

-- steps 长文本：UNION ALL 每段一行，绕开 200 字截断
SELECT 1 seg, SUBSTRING(steps,1,500) txt FROM zt_bug WHERE id=<id>
UNION ALL SELECT 2, SUBSTRING(steps,501,500) FROM zt_bug WHERE id=<id>
UNION ALL SELECT 3, SUBSTRING(steps,1001,500) FROM zt_bug WHERE id=<id>
ORDER BY seg;

-- 任务（`desc` 是保留字，须反引号）
SELECT id,name,status,type,assignedTo,openedBy,project,execution,story,parent,`desc`
FROM zt_task WHERE id=<id>;

-- 全部操作 + 评论（开工第一步，先于任何代码检索）
SELECT id, actor, action, date, comment
FROM zt_action WHERE objectType='bug' AND objectID=<id> ORDER BY id;
-- comment 过长时分段：SUBSTRING(comment,1,500) / (,501,500) / ...，用 UNION ALL 每段一行
```

要点：

1. `action='commented'` 的记录就是需求变更/后端说明，必须全部读完再动手；评论时间晚于 opening 的优先级高于 steps。
2. 评论里的接口路径、入参、字段名要**原文抄下来**再对代码。
3. 子任务（`parent` > 0）或 `desc`/`story` 为空时查父任务与需求：`zt_storyspec.spec` 才是需求正文；父任务描述常含原型/参照系统。
4. 跨项目复用（标题带「参照苏住房/江阴已做」）：`git log --grep=<关键词>`、`git grep` 找同名页面。

## 回写（事务化 UPDATE zt_bug + INSERT zt_action）

1. `dbx_open_session(connection_id=<新禅道>, enable_transactions=true)` 拿 `session_id`；
2. `dbx_begin_transaction(session_id=...)`；
3. 执行 UPDATE + INSERT（都要带同一 `session_id`、同一 connection_id）；
4. 事务内 `SELECT` 复核 `status/resolution/resolvedBy/resolvedDate/assignedTo` 与新增 action；
5. `dbx_commit_transaction(session_id=...)`；提交后再用无 session 查询复核一次；`dbx_close_session`。

```text
-- 1) 查现状（拿到 product/project/execution、原提交人 openedBy）
SELECT id,status,assignedTo,openedBy,product,project,execution,resolution
FROM zt_bug WHERE id=<id>;

-- 2) 回写状态
UPDATE zt_bug SET status='resolved', resolution='fixed', resolvedBuild='trunk',
  resolvedBy='tiany', resolvedDate=NOW(), assignedTo='<openedBy>',
  lastEditedBy='tiany', lastEditedDate=NOW()
WHERE id=<id>;

-- 3) 补操作历史（action=resolved；`read` 是保留字，必须加反引号！）
INSERT INTO zt_action
  (objectType,objectID,product,project,execution,actor,action,date,comment,files,extra,`read`,efforted,vision)
VALUES ('bug',<id>,'<product>',<project>,<execution>,'tiany','resolved',NOW(),'<根因+修复+验证 HTML>',NULL,'fixed',0,0,'rnd');
```

- `product` 列可写纯数字（如 `60`）或逗号包裹（如 `,60,`）；与同产物其他 bug 写法一致即可。
- `zt_action.extra` 写 resolution（`'fixed'`）；`vision` 写 `'rnd'`；`read` 必须 `` `read` `` 反引号。
- comment 用 HTML：写根因 + 修复 + 验证证据（构建时间、部署站点、提交号）。
- 只对新禅道库写；老禅道库禁止写。回写后必须复核 `resolvedBy/resolvedDate/resolution` 已落库。

## 表结构速查

- `zt_bug` 关键列：`id,title,status,severity,openedBy,openedDate,resolvedBy,resolvedDate,resolution,resolvedBuild,assignedTo,product,project,execution`（是 `resolvedBuild`，没有 `build` 列）。
- 状态：`active`（激活）→ `resolved`（已解决）→ `closed`（关闭）。
- resolution 可选值：`bydesign, duplicate, external, fixed, notrepro, postponed, willnotfix, productized`。

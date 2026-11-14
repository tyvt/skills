---
session: session-fc9aaa9b-fcd8-4569-8194-ec7a76c35b90
title: 禅道附件本地留存与复用改造方案
status: approved
human_confirmed: true
---

# 禅道附件本地留存与复用改造方案

## 一、前因后果（≤3 句）

当前 `zentao_file.py` 把附件下到 `<repo>\.tmp-bug<id>\`（项目目录内、临时、随仓库走），文件名只有 fileID，无内容留存、无本地索引。每次分析同一条 bug/任务/需求都要重新走 token + HTTP 拉取，重复拉取成本高、附件散落在各项目目录难以复用。改造目标：附件统一落 D 盘「禅道附件」目录，按 `对象类型+ID` 分目录并留存内容，重复拉取先查本地、命中即复用。

## 二、现状与证据（只写文件:行号 / 字段 / diff 要点）

- **下载脚本** `zentao-analyzer/zentao_file.py`
  - `download(file_id, out_path, BASE)`（第 38-50 行）：输出路径完全由调用方传入，无默认目录、无缓存判断、不写元数据。
  - `main()`（第 53-72 行）：`out = args[1] if len(args)>1 else "zentao_file_%s" % file_id`（第 64 行）——无第二参时裸落到 cwd。
- **Skill 约定** `zentao-analyzer/SKILL.md:3` 与 `references/attach.md:4`：明确要求落 `<repo>\.tmp-bug<id>\`（项目目录内），并强调「不落仓库根、不提交」。与本次「不落项目目录、统一 D 盘」直接冲突，需同步改文档。
- **元数据来源** `zt_file` 表字段（D 盘真实数据已确认）：`id, objectType, objectID, title, pathname, size, addedDate`。`objectType` 实际取值：`bug`(13680) / `story`(5471) / `task`(500) / `requirement`(545) / ``(空 989) / `comment`(129) / `epic`(6) / `chat`(4) / `execution`(4)。
- **致命点**：`title` 大量重名（同一 bug 下多张都叫 `image.png`，如 fileID 22831/22830），**文件名必须带 fileID 前缀**，否则同目录互相覆盖。
- 凭据集中在 `credentials.py`（`resolve()` / `base()`），脚本内读取，不进会话——缓存脚本沿用此约定。

## 三、目录结构与命名设计

根目录：`D:\禅道附件\`

```
D:\禅道附件\
  bug\6576\
    _index.json            # 该对象全部附件元数据+校验
    file22802_修复01.gif
    file22805_image.png
  task\1234\
    _index.json
    file22901_xxx.png
  story\880\
    _index.json
    file23000_xxx.png
  requirement\545\
    ...
  _other\<objectType>\<id>\   # 空对象类型/comment/epic 等归此处兜底
```

- **对象类型 → 目录映射**（含用户点名的 bug/任务/需求）：
  - `bug` → `bug\`
  - `task` → `task\`
  - `story` / `requirement` → `story\`（禅道「需求」objectType 兼容两种取值，统一进 story 目录，`_index.json` 里记录原始 objectType）
  - 其余（空 / `comment` / `epic` / `chat` / `execution`）→ `_other\<objectType或unknown>\<id>\`
- **文件名**：`file<id>_<安全化 title>`，`<id>` 前导防重名；title 去非法字符、限长 80；无 title 退化为 `file<id>`。
- **`_index.json`**（每对象一份，缓存索引核心）：
  ```json
  {
    "objectType": "bug",
    "objectID": 6576,
    "syncedAt": "2026-11-14T09:30:00+08:00",
    "files": [
      {"fileID": 22802, "title": "修复01.gif", "pathname": "202611/1318202305790e08.gif",
       "size": 1770319, "localName": "file22802_修复01.gif", "sha1": "…", "downloadedAt": "…"}
    ]
  }
  ```

## 四、实施方案（改哪里，不写具体代码）

### 4.1 脚本改造：`zentao_file.py`
1. 新增 `--object-type`（bug/task/story/requirement…）与 `--object-id` 可选参数；提供时走「目录化缓存」模式，未提供时保持旧行为（`<fileID> <out_path>`），向后兼容现有调用。
2. 新增根目录常量：`ATTACH_ROOT = os.environ.get("ZENTAO_ATTACH_ROOT") or r"D:\禅道附件"`（可环境变量覆盖，便于迁移/测试）。
3. 新增函数：
   - `object_dir(object_type, object_id)` → 按上面映射返回目录，自动建。
   - `safe_name(file_id, title)` → `file<id>_<title>` 安全化。
   - `load_index(dir)` / `save_index(dir, data)` → 读写 `_index.json`。
   - `sha1_of(path)` → 校验本地文件完整性。
4. 缓存命中逻辑（本地优先）：
   - 读 `_index.json`，按 `fileID` 查：
     - 命中且本地文件存在且 **size 一致**（可选 sha1）→ 直接返回本地路径，**不发 HTTP**。
     - 未命中 / 文件丢失 / size 不符 → 走 token 下载，落盘后回写 `_index.json`。
5. **批量入口**（可选增强）：`--sync-object <objectType> <objectID>` 或读 DBX 一次性拉 `zt_file` 清单，把该对象下所有附件全部落地并写索引（重复拉取时整批命中，零下载）。清单可由调用方传入（skill 里 DBX 查 `zt_file`），脚本不直连 DB，保持职责单一。
6. 下载仍用现有 `download()` 的 Token 逻辑，只是落盘路径改为对象目录。PNG 魔数校验保留。

### 4.2 文档改造
- `SKILL.md:3`：把「落 `<repo>\.tmp-bug<id>\`」改为「附件下载走 `zentao_file.py --object-type <t> --object-id <id> <fileID>`，统一落 `D:\禅道附件\<类型>\<id>\`，本地已有则复用」。
- `references/attach.md:4`：落盘章节改写为对象目录规则 + `_index.json` 缓存说明 + 「先查本地再拉取」。
- `SKILL.md` 脚本章节表补一行说明缓存模式。

### 4.3 兼容与迁移
- 旧 `--out` / 位置参数路径模式保留，老调用不报错。
- 提供一次性说明：旧的 `.tmp-bug*` 目录可手工删，不需自动迁移（临时文件本就可弃）。
- 加 `.gitignore` 说明：`D:\禅道附件` 在盘外，天然不进仓库，无需 gitignore；但文档提醒「不要在项目内再生成附件副本」。

### 4.4 四项硬化（用户确认必加）

1. **路径兼容 / 权限兜底（跨平台）**
   - 平台感知默认根：Windows 用 `D:\禅道附件`，非 Windows 用 `$ZENTAO_ATTACH_ROOT` 或 `~/禅道附件`；始终允许环境变量 `ZENTAO_ATTACH_ROOT` 覆盖（最高优先级，便于 CI/迁移）。
   - 建目录/写文件用 `os.makedirs(exist_ok=True)` 包裹 try/except；写权限失败（PermissionError/OSError）时**不静默**，打印明确错误并返回非 0，提示改用 `ZENTAO_ATTACH_ROOT` 指向可写目录；绝不回落到项目目录。
   - 路径用 `os.path.join` / `pathlib.Path` 拼，不手写分隔符，兼容中文与空格。
2. **缓存校验强化：sha1 为默认**
   - `_index.json` 每个文件记录 `sha1` 与 `size`。命中判定默认 **size 一致且 sha1 一致**（sha1 默认开）。
   - 提供 `--fast` 开关可退化为仅 size 校验（大批量且信任本地时才用）。
   - 本地文件缺失 → 视为未命中重下；sha1 不符 → 重下并覆盖 + 更新索引。
3. **JSON 并发原子性**
   - `save_index` 写入采用「临时文件 + `os.replace` 原子替换」（同目录 `_index.json.tmp.<pid>` → `os.replace`），避免半写坏文件。
   - 写入前 `try` 读旧索引合并（读-改-写），保留其它线程/进程已写入的其它 `fileID` 条目，减少并发覆盖。
   - 损坏的 `_index.json`（解析失败）不崩溃：备份为 `_index.json.bad.<ts>` 后重建空索引并告警。
   - 下载到最终文件名也走「先写 `.part` 再 `os.replace`」，避免半截文件被当作命中。
4. **大模型调用契约明确**
   - 在 `SKILL.md` / `attach.md` / 脚本 `--help` 三处写死契约：
     - **调用形态**：`python zentao-analyzer/zentao_file.py --object-type <bug|task|story|requirement> --object-id <id> <fileID> [--fast]`
     - **批量**：`python zentao-analyzer/zentao_file.py --object-type <t> --object-id <id> --sync-object <fileID1,fileID2,...>`（fileID 清单由主模型先 DBX 查 `zt_file` 得到后传入；脚本不直连 DB）。
     - **stdout 契约**：成功首行 `OK <abs_local_path>`（模型可直接拿去 `analyze_image`）；命中打印 `CACHE_HIT <abs_local_path>`；失败打印 `ERR <reason>` 并退出非 0。**路径永远是绝对路径、单行、无其它前缀**，便于模型解析。
     - 兼容旧形态：`python zentao_file.py <fileID> <out_path>` 仍可用，但文档标注「已不推荐」。
   - 脚本不把凭据/Token 打到 stdout。

### 4.5 构建/测试说明
- 本仓库为纯 skills/脚本仓（根目录无 `package.json`），无 npm build；改动为 Python + 文档，验证以功能测试为准（见第五节）。构建基线：未执行（无 build 目标）。

## 五、验证计划

1. **单文件命中/未命中**：取已知 fileID（如 22802）：
   - 首次 `--object-type bug --object-id 6576 22802` → 下载到 `D:\禅道附件\bug\6576\file22802_修复01.gif`，`_index.json` 生成，stdout `OK <abs>`。
   - 再次执行 → stdout `CACHE_HIT <abs>`，不发 HTTP（临时打印 token 请求次数断言为 0）。
2. **重名不覆盖**：同一 bug 22830/22831 两张 `image.png` 各自落成 `file22830_image.png` / `file22831_image.png`，互不覆盖。
3. **sha1 校验（默认）**：手改本地文件内容但保持 size 不变 → sha1 不符 → 自动重下；`--fast` 下则命中（对比验证）。
4. **size 变更重拉**：手改本地文件使 size 不符 → 再拉自动重下。
5. **原子性**：并发起两个进程同时下载同对象不同 fileID → `_index.json` 不损坏，两条都入索引（读-改-写 + `os.replace`）；损坏 `_index.json` 后运行不崩溃，自动备份重建。
6. **目录映射**：bug / task / story / requirement / 空类型 各跑一条，落到对应目录，空类型落 `_other\unknown\<id>\`。
7. **权限兜底**：`ZENTAO_ATTACH_ROOT` 指向无写权限目录 → 明确报错 `ERR` 且非 0，不回落项目目录。
8. **向后兼容**：旧式 `python zentao_file.py <fileID> <outpath>` 仍正常。
9. **看图链路**：stdout 中 `OK/CACHE_HIT` 的绝对路径能直接喂 `mcp__magpie-vision__analyze_image`。

## 六、已确认决策

1. 根目录：`D:\禅道附件\`（可用 `ZENTAO_ATTACH_ROOT` 覆盖；非 Windows 自动换 `~/禅道附件`）。
2. `story` 与 `requirement` **合并到 `story\`** 目录，`_index.json` 记原始 objectType。
3. **要批量同步**入口（`--sync-object`），校验 **size + sha1（sha1 默认开）**。
4. 附加硬化：路径跨平台/权限兜底、sha1 默认、`_index.json` 原子写 + 并发合并、大模型调用契约（stdout `OK/CACHE_HIT/ERR` + 绝对路径）。

（变更受 git 管理，git revert 即可回滚。）

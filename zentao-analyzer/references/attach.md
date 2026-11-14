# 取截图/附件（仅确定要看图时读）

Web 登录任何请求都被 302 到「修改密码」。用禅道 REST v1 Token 下二进制。

**看图默认 `mcp__magpie-vision__analyze_image`（文字描述），不要用 `read_image`。** 图片 attachment 打穿 prefix cache，后续步全价计费（bug6401 一张截图约 43k）。不足再读原图，一次一张。列宽/截断/显隐/单字段不读截图：`grep "label: '<列名>'"` → 带 offset/limit 的 read → edit。

## 附件本地留存（统一 D 盘，本地优先复用）

附件**不再落项目目录**，统一落 `D:\禅道附件\<类型>\<id>\`（非 Windows 落 `~/禅道附件`，可用环境变量 `ZENTAO_ATTACH_ROOT` 覆盖）。每对象目录一份 `_index.json` 记录 `sha1/size/title`，**重复下载先查本地，size+sha1 命中则不发 HTTP、直接复用**。

**目录映射**：`bug→bug\`，`task→task\`，`story`/`requirement→story\`（需求两种 objectType 合并），其余（空/comment/epic…）→ `_other\<type或unknown>\<id>\`。

**调用契约（脚本 stdout 可被模型直接解析，绝对路径单行）**：

1. 先 DBX 查清单：
   `SELECT id,title,pathname,size FROM zt_file WHERE objectType='bug' AND objectID=<bugID> ORDER BY id;`
2. 下载（缓存模式，推荐）：
   ```
   python zentao-analyzer/zentao_file.py --object-type bug --object-id 6576 --titles "22802:修复01.gif,22805:x.png" 22802 22805
   python zentao-analyzer/zentao_file.py --object-type bug --object-id 6576 --sync-object 22802,22805
   ```
   - `--titles "id:title,..."` 传 DBX 查到的 title（拿不到 title 也会按文件头 magic 补扩展名，不会没后缀）。
   - `--fast` 只按 size 校验（默认 size+sha1）。
   - stdout：`OK <abs>`（新下载）/ `CACHE_HIT <abs>`（本地命中）/ `ERR <reason>`（失败，退出码非 0）。
   - 拿到的 `<abs>` 绝对路径直接喂 `analyze_image`。
3. 旧形态 `python zentao_file.py <fileID> <out_path>` 仍可用（不推荐，裸路径不缓存）。

**凭据**在 `credentials.py`（`resolve()`/`base()`），脚本内读，不进会话。**不问用户、不裸 `Invoke-WebRequest`、不用 vision 读内部 URL。**

Token 细节：`POST http://zentao-biz.zhi.com/api.php/v1/tokens`，body `{account,password}`，HTTP 201 的 `token`；下载 `GET /api.php/v1/files/<fileID>`，Header 名 `Token`，**不要用带 `/download` 的端点**。PNG/GIF 等魔数校验在脚本内做。库里 `zt_user.password` 是 `md5(明文)`；只有 hash 就换有明文的账号，不要猜，也不要 DB 容器 `LOAD_FILE`（DB 与 Web 是两个容器）。

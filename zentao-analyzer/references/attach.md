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

## 上传附件 / 合成 GIF（回写内嵌证据，已实测）

**合成 GIF（展示操作过程）**：agent-browser 无原生录屏/GIF，只能截静态 PNG。多帧合成：
```
python zentao-analyzer/zentao_gif.py <帧目录> <out.gif> --fps 5 --width 900
```
stdout `OK <abs>` / `ERR <reason>`。ffmpeg 路径取 `$ZENTAO_FFMPEG` 或 `D:\ffmpeg-8.0.1-essentials_build\bin\ffmpeg.exe`。GIF 按图片内嵌（`{id.gif}`）、自动循环播放；禅道评论 `<video>` 无先例，优先 GIF。

**上传拿 fileID**：
```
python zentao-analyzer/zentao_upload.py <本地png/gif>          # stdout: OK <fileID> <ext>
python zentao-analyzer/zentao_upload.py <path> --object-type bug --object-id 6576  # 回退通道直挂
```
实测契约（2026-11-19，新禅道实例）：
- `POST /api.php/v1/tokens` 取 token（复用 `credentials.py`，不问用户）。
- `POST /api.php/v1/files`：multipart 字段名 **`imgFile`**（**不是 `file`**——用 `file` 会 400「文件格式不在规定范围内」）+ `uid`，Header `Token`。返回 `{"id":"23497","url":"/index.php?m=file&f=read&t=png&fileID=23497"}`。
- 通道 A 失败且带了 `--object-type/--object-id` 时回退 `POST /api.php/v1/attachments`。
- PNG/GIF 均实测上传成功；上传后在 DB `zt_file` 生成 `objectType='' objectID=0` 的行。

**comment 内嵌格式（DB 实证 4398 条，0 条直链）**：
```
<img src="{<fileID>.<ext>}" alt="index.php?m=file&amp;f=read&amp;t=<ext>&amp;fileID=<fileID>" />
```
把收集到的 `fileID:ext` 传给 `zentao-resolve.mjs <bugId> --attach "23494:png,23178:gif"`，脚本自动生成上述标签、把 `files` 列写成逗号分隔 fileID，并 `UPDATE zt_file SET objectType='bug',objectID=<bugId>` 挂到 bug。`files` 列格式已 DB 实证（如 `22907,22908,22909`）。

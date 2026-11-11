# 取截图/附件（仅确定要看图时读）

Web 登录任何请求都被 302 到「修改密码」。用禅道 REST v1 Token 下二进制。

**看图默认 `mcp__magpie-vision__analyze_image`（文字描述），不要用 `read_image`。** 图片 attachment 打穿 prefix cache，后续步全价计费（bug6401 一张截图约 43k）。不足再读原图，一次一张。列宽/截断/显隐/单字段不读截图：`grep "label: '<列名>'"` → 带 offset/limit 的 read → edit。

1. DBX 查真实 fileID：`SELECT id,title,pathname,size FROM zt_file WHERE objectType='bug' AND objectID=<bugID> ORDER BY id;`
2. Token：密码传明文（服务端自己 md5），只在脚本内读，不要读进会话。`POST http://zentao-biz.zhi.com/api.php/v1/tokens`，body `{account,password}`，HTTP 201 的 `token`。
3. 下载：`GET /api.php/v1/files/<fileID>`，Header 名是 `Token`。**不要用带 `/download` 的端点**。`/api.php/v1/bugs/<id>` 的 JSON 不含图片二进制。
4. 落盘：`<repo>\.tmp-bug<id>\`，不落仓库根，不提交。PNG 魔数 `89 50` 再写文件。
5. 库里 `zt_user.password` 是 `md5(明文)`。只有 hash 就换有明文的账号，不要猜。不要去 DB 容器 `LOAD_FILE`：DB 与 Web 是两个容器。

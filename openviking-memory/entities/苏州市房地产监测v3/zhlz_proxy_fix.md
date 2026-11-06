# 登记证明地址代理与类型修复
苏州市房地产监测V3 修复登记证明地址 `/zhlz/...` 前端无法加载 PDF 及附件类型误判问题。

## 问题原因
- 网关/Nginx 未代理 `/zhlz`，访问返回 200 + `text/html`（SPA index），非 PDF，导致 `el-image`/`<img>` 加载失败出现红色错误块
- 附件 `fileType` 常为字典码（如 `0`），`getAppendixFileExtension` 优先用 `fileType` 误判 PDF 为图片走 `el-image` 报错
- 路径在对象存储正确，但浏览器请求前端站点无反代拿到 HTML

## 修复内容
- `vite.config.js`、`deploy/nginx.conf`：增加 `/zhlz`、`/zhlz-dev`、`/zhlz-test` 静态资源代理（与 `/zhi2*` 一致）
- `resolveServerAssetUrl.js`：`/zhlz*` 按站点根路径拼 URL，并处理误带后缀

## 验证与归属
- 涉及文件：`index.html`、`vite.config.js`、`deploy/nginx.conf`、`resolveServerAssetUrl.js`、`appendix.js`
- 所属项目：苏州市房地产监测V3；来源会话：0f726903-9779-445d-b98b-87b46eb8ece1；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3",
  "name": "zhlz_proxy_fix",
  "source_extraction_id": "512a39ba2e844a0aac60c3d59941b745",
  "version": 1,
  "memory_type": "entities"
}
-->
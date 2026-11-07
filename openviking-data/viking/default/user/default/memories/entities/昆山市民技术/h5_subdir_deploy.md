# 昆山市民H5子目录部署模式（wyzx）
昆山市民H5常部署在服务器子目录（如 /wyzx/），通过 hash 路由与 relativeBasePlugin 实现资源正确解析。

## 部署形态
- 实际访问 URL 为 `https://<domain>/wyzx/index.html#/pages_home/home?code=xxx`，应用内无 `wyzx` 路由名。
- `manifest.json` 使用 hash 模式、`base: ./`；构建由 `vite.config.js` 的 `relativeBasePlugin` 注入脚本。
- 插件按 `location.pathname` 动态写 `<base href>`，使 `./assets` 解析到子目录而非域名根。
- 代码库无 `wyzx` 字符串，判定为 Nginx 子目录转发。

## 参数读取
- 新增 H5 登录参数（如鹿路通 code）应从当前 URL query 读取，与 hash 路由并存。
- 避免将 query 参数误当作 hash 路由路径处理。

## 验证与归属
- 验证：会话 38f18afc 探索结论，含 relativeBasePlugin 片段与访问形态说明。
- 涉及文件：`src/manifest.json`、`vite.config.js`、`index.html`。
- 所属项目：昆山市民；代码基线：8307de5；来源会话ID：38f18afc-96e1-4341-aebd-46d880b667ca。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "h5_subdir_deploy",
  "source_extraction_id": "227214d675d14725964edfb851677a3e",
  "version": 1,
  "memory_type": "entities"
}
-->
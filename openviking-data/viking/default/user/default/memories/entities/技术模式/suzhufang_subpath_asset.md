# 苏住房G 子路径资源地址解析
苏住房G 前端部署在 /test/ 等子路径时，后端返回的相对资源路径须按当前页面地址解析，禁止写死部署前缀。
## 问题现象
- 生产部署在 https://xxx.com/test/#/ 子路径，后端下发 /zhi2/file/abc.jpg 被解析为 https://xxx.com/zhi2/... 导致 404
- resolvePublicAssetUrl 对以 / 开头的路径直接原样返回，浏览器按站点根解释
- 用 window.location.origin 拼接同样丢失子路径前缀
## 解决方案
- resolvePublicAssetUrl 内部改为委托 resolveServerAssetUrl
- resolveServerAssetUrl 用 new URL(relative, window.location.href) 以当前页面地址为基准解析，子路径前缀自动继承
- bulkImportDialog.vue 中 window.location.origin + path 写法同步替换为相对解析
- hash 路由下取 window.location.href 而非 pathname，才能带上 #/ 前后真实目录段
## 涉及与来源
- resolveServerAssetUrl 是图片/文件地址统一收口点（logo、头像、detail-template 图片预览与附件下载均走它）
- 涉及文件：zhi2-web-admin/src/utils/resolveServerAssetUrl.js、bulkImportDialog.vue、detail-template.vue
- 所属项目：苏住房G；来源会话：7c122dc2-e6a9-4323-b70f-2d6b9c7beff1；代码基线：e590ffa

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufang_subpath_asset",
  "source_extraction_id": "d4f9217e4b834d00b440bed176913edd",
  "version": 1,
  "memory_type": "entities"
}
-->

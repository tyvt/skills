# 第三方人脸跳转backUrl用Base64
生产 H5 为 hash 路由时，将完整回跳地址作为外层 query 的 backUrl 须用 Base64 编码，不能仅用 encodeURIComponent。

## 问题根因
- 生产 H5 为 hash 路由（如 https://wygl.wxwgzx.com:8989/szh5/sfb/#/pages/webview/home?...）
- 将完整回跳地址作为外层 query 的 backUrl 时，#、?、& 会使参数被截断或拆成多个 query 段
- encodeURIComponent 虽可转义，但对接方若按 Base64（atob）解析 backUrl，仅做 URI 编码会导致重定向失败

## 解决方案
- backUrlFull → Base64 → 作为单个 query 值传递（外层再做标准 query 转义）
- 联调前与第三方确认解码方式

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/portal.js、src/pages/face/face.vue、src/pages/face/bdc.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：2adff739-19f3-452a-bfc9-ae1b4ad9efc9；代码基线：7de00b1

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "face_backurl_base64",
  "source_extraction_id": "778f1362caf64c32a2a51ac9df1ba72f",
  "version": 1,
  "memory_type": "entities"
}
-->
# static/images 死链清理需路径与文件名双匹配
清理小程序 static/images 未使用图片时，须同时用完整路径与文件名（含中文/zhishu 间接引用）匹配，零引用才删除。

## 扫描约定
- 遍历 .vue/.js/.ts/.json/.scss/.css（排除 unpackage、node_modules、dist）
- 同时匹配 static/images/...、/static/images/...、@/static/... 等路径
- 源码常见 resolveZhishuAsset("xxx.png") 或 /static/images/zhishu/... 间接引用仅文件名

## 删除规则
- 仅当工程内零引用时才删除
- 本会话示例：仅 static/images/location.png 无引用已删，其余 64 个均有引用

## 验证与归属
- 验证证据：「同时用文件名作为补充匹配，避免误判为未使用」「仅 1 个文件在工程内无任何引用：location.png」「其余 64 个图片文件在源码中均有对应引用（含通过 resolveZhishuAsset 间接引用）」
- 涉及文件：static/images/ ; static/images/location.png ; pages/webview/externalWebview.vue
- 所属项目：小程序；来源会话ID：b1d684d7-0aba-4f92-948d-241c1309f18c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "static_images_deadlink_cleanup",
  "source_extraction_id": "f6fe17b59d124d2a9018edb7331037df",
  "version": 1,
  "memory_type": "entities"
}
-->
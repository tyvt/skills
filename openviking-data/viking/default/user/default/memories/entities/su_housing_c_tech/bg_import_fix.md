# pages_my 背景图 import 失败修复
苏住房C 小程序 pages_my 分包因重构改用 import 静态资源导致背景图不显示，已改用 resolveStaticUrl 按分包解析修复。

## 问题原因
- 重构将图片引用从条件编译的 background-image 改为 import 静态资源
- 微信小程序分包 pages_my 中 import 生成路径无法正确访问分包内静态图片

## 修复方式
- TypeChoose.vue 改用 `resolveStaticUrl('images/verification-bg-1.png', 'pages_my')` 等按分包解析
- H5 输出 `{base}/pages_my/static/images/verification-bg-1.png`，小程序输出 `/pages_my/static/images/verification-bg-1.png`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/pages_my/verification/TypeChoose.vue`、`src/pages.json`、`src/pages_owner/authentication/TypeChoose.vue`
- 来源会话ID：00a9d48a-4fa1-45d7-911c-3c025eccb8fc

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "bg_import_fix",
  "source_extraction_id": "ae26486ba9aa4613a958cec2e7fe24fa",
  "version": 1,
  "memory_type": "entities"
}
-->
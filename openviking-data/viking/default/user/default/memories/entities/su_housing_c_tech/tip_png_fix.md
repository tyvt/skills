# pages_my 分包 tip.png 缺失修复
苏住房C 小程序 pages_my 分包因缺少 static/icon/tip.png 导致 ZsImage 渲染 500 错误，已从 pages_owner 复制修复。

## 问题原因
- FormManual.vue 中 `<ZsImage src="icon/tip.png" subpackage="pages_my" />` 经 resolveStaticUrl 解析为 `/pages_my/static/icon/tip.png`
- pages_my 分包下仅有 `static/images/camera.png`，缺少 `static/icon/tip.png`
- tip.png 实际存在于主包 `src/static/icon/tip.png` 与业主分包 `src/pages_owner/static/icon/tip.png`

## 修复方式
- 从 pages_owner 复制 `src/pages_owner/static/icon/tip.png` 到 `src/pages_my/static/icon/tip.png`
- 重新编译/刷新微信开发者工具，必要时清缓存

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/pages_my/verification/FormManual.vue`、`src/components/ZsImage/ZsImage.vue`、`src/pages_owner/authentication/components/FormManual.vue`
- 来源会话ID：6bcdb466-adaa-4603-a19b-9a1f67130e4a

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "tip_png_fix",
  "source_extraction_id": "ae26486ba9aa4613a958cec2e7fe24fa",
  "version": 1,
  "memory_type": "entities"
}
-->
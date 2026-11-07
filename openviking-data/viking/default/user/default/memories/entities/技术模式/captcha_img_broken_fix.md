# captcha_img_broken_fix
园区物管2.0 登录页验证码初始破图问题的根因与修复。

## 问题根因
- `codeUrl` 初始为空字符串时 `<img src="">` 仍渲染，浏览器显示破图，导致标题换行后变一行等异常观感。

## 修复方案
- 条件渲染：仅 `codeUrl` 有值时显示 `<img>`，接口返回前不渲染图片。
- 加载占位：请求期间显示「加载中...」占位框（56px 高），样式与验证码区域一致。
- 错误处理：接口失败清空 `codeUrl`，占位显示「点击刷新」，点击整个验证码区域可重新获取。
- 直接使用 base64：验证码是 `data:image/...` 格式，不再走 `resolveServerAssetUrl`，避免多余处理。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/components/SvgIcon/index.vue；所属项目：园区物管2.0；来源会话 80ec8712-2d9a-40e3-9d5a-6f593b0483e2。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "captcha_img_broken_fix",
  "source_extraction_id": "57a4873f974d4683bd6bc4d140393662",
  "version": 1,
  "memory_type": "entities"
}
-->
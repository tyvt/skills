---
audit_status: invalid
last_checked: 2026-11-27T15:45:23+08:00
verdict_note: 纯 shell tr -d 提取 base64 的技巧性记忆，不指向任何文件/函数/接口，无代码证据可核对，按无法证明有效判无效。
---
# 验证码图片 base64 提取的 tr 引号陷阱
从页面 data URL 提取 base64 验证码图片时，把 tr 的删除字符集放在双引号里会让字母 n 被当成待删字符，破坏 base64 串；放在单引号里只删回车换行才能得到有效 JPEG。

## 现象
- 双引号写法中 shell 转义把字母 n 交给 tr 当作待删字符，base64 串里的 n 被全部删除，图片读取失败。
- 改用单引号包裹回车换行字符集后只删除回车与换行，得到 160x60 的有效 JPEG。

## 适用场景
- 浏览器自动化中从 data URL 提取验证码图片，再送视觉模型逐字识别算术验证码。
- 出现于禅道 2953 工作台新增入口及跳转 H5 任务的 B端登录验证跳次。

## 验证与归属
- 修复前图片读取失败；修复后验证码图可正常识别，两轮算术验证码均经视觉逐字与计算双确认。
- 发现于 2026-11-26，来源为防汛C端 H5 登录验证会话。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "captcha_base64_extract",
  "source_extraction_id": "26a3b8b44a7f405cb6ac8678ff60c2da",
  "version": 1,
  "memory_type": "entities"
}
-->
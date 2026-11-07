# 复用wx.login码致手机号授权报40029
i淮安H5 在 verifyUser 页面预缓存 `wx.login` 的 `js_code`，用户授权时复用已过期或已使用的 code 调用 `auth.code2Session` 返回 40029。

## 问题根因
- `src/pages/verifyUser/index.vue` 页面加载时预缓存 `wx.login` 的 `js_code`
- 用户授权时复用已过期或已使用的 code 调用 `auth.code2Session` 返回 40029

## 解决方案
- 移除预取逻辑
- 在点击授权后、调用接口前实时执行 `getWechatLoginCode()` 获取新 code

## 验证与归属
- 验证证据：extracted source=cursor project=i淮安H5
- 验证证据：src=cursor session=00e8365d-4895-43a2-b717-a01fd5aa463d
- 涉及文件：d:/repository/i淮安H5/src/pages/verifyUser/index.vue、d:/repository/i淮安H5/src/api/security.js、d:/repository/i淮安H5/src/api/index.js
- 所属项目：i淮安H5；来源会话：00e8365d-4895-43a2-b717-a01fd5aa463d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "wx_login_code_40029",
  "source_extraction_id": "11ae8be425bf4675afd3f62a0549acbb",
  "version": 2,
  "memory_type": "entities"
}
-->
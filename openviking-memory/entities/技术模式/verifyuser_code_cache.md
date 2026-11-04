# verifyUser手机号授权code缓存致40029
i淮安H5 的 verifyUser 页面因缓存过期的 wx.login code 调用 auth.code2Session 返回 40029 invalid code。

## 问题根因
- src/pages/verifyUser/index.vue 页面加载时弹窗自动打开，提前调用 wx.login() 并把 code 缓存在 wechatLoginCode
- 用户填写姓名、身份证号耗时较久，点击「同意授权」时直接复用缓存旧 code 而非重新获取
- 后端用已过期或已使用过的 code 换 session 返回 40029 invalid code

## 修复方案
- 移除弹窗打开时预取 wx.login code 的逻辑
- 在用户点击授权后、调用接口前实时调用 getWechatLoginCode() 获取全新 code
- 删除不再需要的 wechatLoginCode 缓存变量

## 验证与归属
- 验证证据：extracted source=cursor project=i淮安H5
- 涉及文件：src/pages/verifyUser/index.vue、src/api/security.js、src/api/index.js
- 所属项目：i淮安H5；来源会话：00e8365d-4895-43a2-b717-a01fd5aa463d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "verifyuser_code_cache",
  "source_extraction_id": "d7385f0789234873a5f09e9954f78313",
  "version": 1,
  "memory_type": "entities"
}
-->
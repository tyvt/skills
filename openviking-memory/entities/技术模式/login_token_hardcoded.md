# 登录页 token 写死为 1 致请求假参
src/pages/login/index.vue 中 token 被硬编码为 1 并拼入 URL，且真实 token 读取被注释，导致请求携带假 token。

## 问题现象
- src/pages/login/index.vue 第 100 行硬编码 token=1，第 31 行将其拼入 URL
- doLogin(token: string) 被传入数字类型的 token
- uni.getStorageSync('urlToken') 被注释，导致请求携带假 token

## 解决方案
- 删除测试用的 token=1 赋值
- 恢复真实的 token 读取逻辑
- 将真实 token 转为字符串后传给 doLogin

## 验证与归属
- 验证证据：extracted source=cursor session=e6a6d0c0-4d4e-4d14-9183-9c91662e8402
- 涉及文件：D:/repository/iHome2.0小程序/src/pages/login/index.vue、src/pages/login/index.vue
- 所属项目：iHome2.0小程序；代码基线：none；来源会话：e6a6d0c0-4d4e-4d14-9183-9c91662e8402

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_token_hardcoded",
  "source_extraction_id": "8994a9560a2f44fcbd3e1449beea3404",
  "version": 1,
  "memory_type": "entities"
}
-->
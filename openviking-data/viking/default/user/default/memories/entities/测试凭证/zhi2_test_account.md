# 产品2.0测试登录账号
产品2.0（zhi2-web-admin）测试环境登录账号凭证。

## 账号信息
- 用户名：zsbase
- 密码：ZS001Aa!

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 所属项目：2-0；来源会话：be5b577d-159c-4126-a301-a93c2e1de71f；代码基线：none

## 登录验证发现（2026-11-13）
- zsbase 属于门户系统（门户 Dameng DB），并非禅道账号
- zsbase 账号存在于用户表，status=0（正常）、未删除
- 密码 ZS001Aa! 经 bcrypt 比对确认正确
- 账号 LOGIN_DATE 停在 2023-04-06，惠山 dev 环境从未成功登录过
- 惠山 dev 后端登录持续返回 {"code":1300,"msg":"服务器异常"}，验证码正确、密码正确仍为后端异常，非凭据问题

<!-- MEMORY_FIELDS
{
  "category": "测试凭证",
  "name": "zhi2_test_account",
  "source_extraction_id": "deacda6b2c4a4afbbcbafe7be3231424",
  "version": 2,
  "memory_type": "entities"
}
-->
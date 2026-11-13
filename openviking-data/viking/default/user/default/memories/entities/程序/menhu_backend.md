# 门户后端系统
Spring Boot 后端服务，含网关与业务模块，支撑门户 H5 前端登录与子系统功能。

## 架构与端口
- 前端 nginx 在 8091，代理 /api/v3.0/ → 127.0.0.1:8086（网关）
- common-gateway（网关）监听 8086，路由 /v3.0/** 到 common-portal 服务
- common-portal（业务服务）监听 9222，注册到 Nacos 供网关负载均衡
- 启动需 JDK 21（位于 D:\sdkpps	emurin21-jdk），默认 Java 8 不满足

## 外部依赖
- Nacos 配置/注册中心：nacos.dev.zhi.com（192.168.1.71），命名空间 suzhou-shiqu-fangchanzonghe
- Redis：192.168.1.110:16379，db0，密码 Redis_gqpVKeIEUGia1tQe
- 数据库：远程达梦 DM，192.168.1.101

## 登录接口
- 图形验证码：POST /api/v3.0/portal/appLogin/captcha，返回 uuid + base64 PNG，答案为 4 位存 Redis 键 portal:applogin:captcha:<uuid>（120s 有效），无 /code 明文接口
- 短信：POST /api/v3.0/portal/appLogin/sms，参数 phone/idNumberSuffix/captchaUuid/captchaCode；后端配置万能短信码 CONFIG_SMS_MASTER_CODE=123456
- 登录：POST /api/v3.0/portal/appLogin/login，参数 phone/idNumberSuffix/smsCode，返回 token
- 子系统列表：POST /api/v3.0/portal/appLogin/apps（带 token）
- 验证码生成有按 IP 限流（键 portal:applogin:captcha:cnt:<ip>），超限返回 500

## 测试账号
- 手机号 15962389375 + 身份证后四位 4315 + 短信码 123456 → 用户蒋婷（userName 300832，userId 211）

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "menhu_backend",
  "source_extraction_id": "09f14c17dc4746d59e27adf8cf42d623",
  "version": 1,
  "memory_type": "entities"
}
-->
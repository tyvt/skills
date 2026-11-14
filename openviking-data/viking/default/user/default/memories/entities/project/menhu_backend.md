# 门户后端
Java/Maven 多模块后端项目（Spring Boot 服务），供门户H5等前端调用，含网关与业务模块，支撑登录与子系统功能。

## 架构与部署
- 本地目录 D:/repository/门户后端，当前分支 feature/feat-dzc-261111（HEAD 484848e 固定短信验证码，联调用；禅道1431：管理端APP接入统一门户登录）；模块含 common-gateway、common-portal-server 等。
- 网关 common-gateway 已构建 jar 位于 target/，端口 8086，路由 /v3.0/**、/v2.0/** 不带 /api 前缀（生产入口层剥离，本地 nginx 代剥），处理 /v3.0/portal/...；前端代理 /api/v2.0、/api/v3.0、/zhi2* 均指向该网关，本地门户H5(8091) 改代理到 127.0.0.1:8086 剥除 /api 前缀联调成功；common-portal 业务服务端口 9222 注册 Nacos 供负载均衡。
- 启动需 JDK 21（路径 D:\sdk\apps\temurin21-jdk\21.0.13-9.0，项目用 Java 21 构建 class 65，早先误用 Java 8/17 致 UnsupportedClassVersionError），须用 JAVA_TOOL_OPTIONS 传 JVM 参数避免 PowerShell 吞 -Dfile.encoding=UTF-8；须用 WMI 脱离会话进程树启动防回收，Nacos 注册 common-gateway-portal(192.168.1.129:8086)、common-portal(192.168.1.129:9222)，192.168.10.10 同名实例 enabled=false 仅命中本地。

## 外部依赖
- Nacos：nacos.dev.zhi.com（192.168.1.71），命名空间 suzhou-shiqu-fangchanzonghe，auth nacos/{{ov_privacy:default:viking://~/privacy/credential/nacos-taicang-dev#/values/password}}，profile=dev，本机需连通才能起服务。
- Redis：192.168.1.110:16379，db0，密码 Redis_gqpVKeIEUGia1tQe（存储验证码等键）。
- 数据库远程达梦 DM 192.168.1.101；framework-server 9219 因 dev Nacos 某 URL 含未解析 ${...} 占位符报 Illegal character found in host: '{' 暂不影响门户登录接口。

## 登录接口与测试账号
- 图形验证码 POST /api/v3.0/portal/appLogin/captcha 返回 uuid+base64 PNG，答案 4 位存 Redis 键 portal:applogin:captcha:<uuid>（120s 有效），无 /code 明文接口；按 IP 限流键 portal:applogin:captcha:cnt:<ip> 超限返回 500。
- 短信 POST /api/v3.0/portal/appLogin/sms 参数 phone/idNumberSuffix/captchaUuid/captchaCode，后端万能码 CONFIG_SMS_MASTER_CODE=123456；登录 POST /api/v3.0/portal/appLogin/login 参数 phone/idNumberSuffix/smsCode 返回 token；子系统列表 POST /api/v3.0/portal/appLogin/apps 带 token。
- 测试账号：手机号 15962389375 + 身份证后四位 4315 + 短信码 123456 → 用户蒋婷（userName 300832，userId 211）。

## Relations
- 与「门户H5」前端联动；2026-11-11 用户要求将门户H5接口代理改指本地该后端以联调。


<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "menhu_backend",
  "source_extraction_id": "e050fe4669a1490a906228433c2426c2",
  "version": 5,
  "memory_type": "entities"
}
-->
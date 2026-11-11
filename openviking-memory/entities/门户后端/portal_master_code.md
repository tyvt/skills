# 门户后端万能验证码模式
门户后端（Java）支持万能验证码（master code）联调模式，由配置驱动，无需改源码；分支 feature/feat-dzc-261111 提交 484848e「固定短信验证码（联调用）」实现。

## 机制
- 配置键 `portal.applogin.sms.master.code` 存于 `T_PORTAL_CONFIG` 表（CONFIG_VALUE 为 TEXT）
- 该配置行存在且值为固定码（如 123456）时：
  - `/v3.0/portal/appLogin/sms` 跳过真实短信发送与配额，直接返回成功
  - `/v3.0/portal/appLogin/login` 校验该固定码，旁路 Redis
- 配置行不存在则禁用，生产安全

## 涉及文件
- AppLoginServiceImpl.java：sms 与 login 接口接入万能码逻辑
- PortalConstants.java：相关常量

## 配置与验证
- dev 库 T_PORTAL_CONFIG 已写入该行（config_id=11），值为 `123456`
- getValueByKey 从 PortalConfig（T_PORTAL_CONFIG）按 config_key 读 config_value
- 2026-11-11 拉取 484848e 后重建未改源码的 jar，全链路以固定码 123456 登录通过：captcha→sms(成功)→login(签发 token userId=104)→apps→sso/jump

## Relations
- 支撑 统一门户APP登录H5对接 前端本地/联调登录，免真实短信与 Redis 注入

<!-- MEMORY_FIELDS
{
  "category": "门户后端",
  "name": "portal_master_code",
  "source_extraction_id": "fb9a280de88b443990d021a854993dba",
  "version": 1,
  "memory_type": "entities"
}
-->
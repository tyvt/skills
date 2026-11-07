# 机构注册跳转未配置回退默认地址
平台配置 registerUrl 缺失或接口失败时，登录页机构注册跳转无可用地址。
## 问题根因
- 平台配置 registerUrl 缺失或接口失败时，登录页机构注册跳转无可用地址
- 原逻辑对配置做拦截导致无地址可跳
## 修复要点
- src/store/modules/app.js 新增 DEFAULT_REGISTER_URL 常量（http://58.210.252.230:9002），在 normalizePlatformConfig 中若 registerUrl 为空或未配置则写入默认；getPlatformConfig 请求失败时仍 SET_PLATFORM_CONFIG({}) 经归一化同样落到默认地址
- src/views/login.vue 使用该常量并移除配置拦截
- 配置优先，缺省回退至 http://58.210.252.230:9002；接口失败、字段缺失或为空时注册链接拼在该地址上（例如 http://58.210.252.230:9002/#/companyRegister?step=1）
## 涉及文件
- zhi2-web-admin/src/views/property/culturalTourism/index.vue
- zhi2-web-admin/src/api/property/cultourPlatform.js
- zhi2-web-admin/src/views/login.vue
- zhi2-web-admin/src/store/modules/app.js
## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 来源会话：3afb8aa3-9bf0-4ba2-89fb-792f225e0b5a
- 验证证据：cursor 会话 3afb8aa3-9bf0-4ba2-89fb-792f225e0b5a
- 所属项目：门户

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_url_fallback",
  "source_extraction_id": "efc4aa0efde14a4f8028a6847cc877b0",
  "version": 2,
  "memory_type": "entities"
}
-->
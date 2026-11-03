# 注册页顶栏从系统配置读取图标与名称
苏州市房地产监测V3 中 `RegisterPageHeader/index.vue` 通过 Vuex `mapState` 读取 `platformConfig` 动态绑定名称与 LOGO。

## 关键逻辑
- 通过 Vuex `mapState` 读取 `platformConfig`，动态绑定 `displayPlatformName` 与 `sysLogo`（经 `resolveServerAssetUrl` 处理）
- 无配置时名称回退 prop 默认值、LOGO 保留 `el-icon-office-building` 图标
- 引用该组件的注册页无需改动

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/113.md
- 涉及文件：register/companyRegister.vue、propertyCompanyRegister.vue、components/RegisterPageHeader/index.vue、institutionRegister/index.vue、router/index.js、login.vue、system/platformConfig/detail.vue、main.js
- 所属项目：苏州市房地产监测V3；来源会话：b7ae39a7-4a70-4443-afa8-63ba883783a8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_header_config",
  "source_extraction_id": "7785caa3c5c24e6b944f6400144eda26",
  "version": 1,
  "memory_type": "entities"
}
-->
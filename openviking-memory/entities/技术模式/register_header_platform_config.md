# 注册页顶栏从系统配置读取平台名与LOGO
RegisterPageHeader/index.vue 通过 mapState 读取 Vuex 的 platformConfig，动态展示平台名与 LOGO。

## 实现细节
- `displayPlatformName` 取 `platformName`，无配置时回退 prop 默认值
- `sysLogo` 经 `resolveServerAssetUrl` 处理显示图片，否则用 `el-icon-office-building`
- LOGO 高度 26px 适配 46px 顶栏

## 不变更范围
- `companyRegister.vue` 与 `institutionRegister/index.vue` 无需改动

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/157.md
- 涉及文件：register/companyRegister.vue、propertyCompanyRegister.vue、components/RegisterPageHeader/index.vue、institutionRegister/index.vue、router/index.js、login.vue、system/platformConfig/detail.vue、main.js
- 所属项目：苏州市房地产监测V3；来源会话：b7ae39a7-4a70-4443-afa8-63ba883783a8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_header_platform_config",
  "source_extraction_id": "f6c19f19494240c78561d94bce477288",
  "version": 1,
  "memory_type": "entities"
}
-->
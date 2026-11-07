# 开发企业与经纪机构注册页顶部菜单栏统一
苏州市房地产监测V3 新建公共组件 RegisterPageHeader，统一了开发企业与经纪机构注册页的顶部菜单栏样式。

## 新建公共组件
- 路径：`zhi2-web-admin/src/components/RegisterPageHeader/index.vue`
- 深蓝背景 `#06375f`，高度 `46px`
- 左侧建筑图标 + 平台名称，右侧自定义样式返回按钮
- 支持 `testId` prop 和 `@back` 事件

## 更新页面
- `companyRegister.vue` 改用 `<RegisterPageHeader test-id="register-header" @back="goLogin" />`，移除原亮蓝顶栏样式及 logo / title / resolveServerAssetUrl 相关代码
- `institutionRegister/index.vue` 同步更新
- E2E 文件 `e2e/register/property-register-entry.spec.js` 同步

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：68d82378-123e-4cc2-9f31-e6e96769846c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_header_fix",
  "source_extraction_id": "48df189a4d5045ffbb5db9580c9d5c11",
  "version": 1,
  "memory_type": "entities"
}
-->
# 首页超级管理员包含所有业务板块的验证
修正：isHomeSuperAdmin 必须要求门户的三个业务板块的全部授权。

## 问题
- 原始的 isHomeSuperAdmin 仅使用了 store.isSuperAdmin，忽略了拥有所有板块权限的用户
- 拥有所有业务板块权限的用户未被识别为超级管理员

## 解决方案
- homeLayout.js: 新函数 hasAllBizSectionPerms(codes) 验证 commodityHouseTrade/secondHandHouseTrade/housingRental
- homeDataMixin.js: computed isHomeSuperAdmin 统一了 layoutVariant, showHomeNavMenu 和 mergeBusinessFlows

## 文件
- src/views/home/config/homeLayout.js 和 src/views/home/mixins/homeDataMixin.js (权限逻辑)
- src/utils/terminalUser.js, src/api/portal/menu.js, src/store/getters.js (权限支持)
- tests/e2e/fixtures/portalHomeMock.ts, HomeLayoutAdmin.vue, src/views/home/index.vue (集成与测试)

## 验证
- 验证证据: src=门户/020.md; 会话: 7a743bfd-c7dc-4a0b-b359-5f6b0f208c13

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_super_admin_perms",
  "source_extraction_id": "eedff5713f73492399aa37cd69b61f82",
  "version": 1,
  "memory_type": "entities"
}
-->
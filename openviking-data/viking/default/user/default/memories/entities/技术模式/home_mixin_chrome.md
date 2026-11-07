# 在 homeDataMixin 中重置标志导致顶部菜单重新出现
homeDataMixin 在 created 中设置 hideLayoutChrome=true，并在 beforeDestroy 中将其恢复为 false，导致离开 home 时顶部水平菜单重新出现。

## 问题根因
- homeDataMixin 在 created 中定义 hideLayoutChrome=true
- 在 beforeDestroy 中恢复为 false
- 离开 home 时顶部水平菜单重新出现

## 修复
- portalLayout.js 在管理端没有水平菜单
- 登录后 syncHideLayoutChrome
- homeDataMixin 仅在非管理端退出时恢复
- TagsView/GenerateRoutes 使用侧边栏的完整树

## 涉及的文件
- zhi2-web-admin/src/views/home/mixins/homeDataMixin.js
- zhi2-web-admin/src/layout/index.vue
- zhi2-web-admin/src/layout/components/Navbar.vue
- zhi2-web-admin/src/settings.js
- zhi2-web-admin/src/views/home/config/homeLayout.js
- zhi2-web-admin/src/store/modules/app.js
- zhi2-web-admin/src/store/modules/permission.js
- zhi2-web-admin/src/layout/components/Sidebar/index.vue

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 来源会话：40f4d280-b5c1-4c8e-8477-9f099246ba53
- 验证证据: cursor 会话提取
- 所属项目: portal; session: 40f4d280-b5c1-4c8e-8477-9f099246ba53

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_mixin_chrome",
  "source_extraction_id": "f86567dce52645b8804500e484bf9fdb",
  "version": 1,
  "memory_type": "entities"
}
-->
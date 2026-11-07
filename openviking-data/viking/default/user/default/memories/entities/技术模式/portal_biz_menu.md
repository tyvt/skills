# 通过界面配置渲染的首页业务中心菜单
在门户中，业务中心菜单完全根据 API 配置进行渲染。

## 行为
- `homeDataMixin.js` 的 `fetchFunctions` 直接将 `data.businessCenters` 映射以渲染区块
- 移除内置的强制覆盖 `mergeBusinessFlows`
- `homeLayout.js` 的 `mapFlowsFromApi` 添加通过 `resolveServerAssetUrl` 解析的 `functionIcon` 字段
- 在界面异常时，回退到 `DEFAULT_BUSINESS_FLOWS`

## 涉及的文件
- `home.js`, `layout/index.vue`, `homeDataMixin.js`, `HomeNavMenu.vue`, `homeLayout.js`, `HomeLayoutAdmin.vue`, `HomeBizSection.vue`, `resolveServerAssetUrl.js`

## 验证与归属
- 验证证据: `src=门户/026.md`
- 所属项目: portal (门户)
- 会话: `f4b6f504-0c81-40e8-a14a-fc8a60a930be`
- 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_biz_menu",
  "source_extraction_id": "ec77fd4578154a9cba32bd5e7b4903cc",
  "version": 1,
  "memory_type": "entities"
}
-->
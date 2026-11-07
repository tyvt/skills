# 侧栏按用户类型显隐逻辑
门户登录后左侧菜单栏是否渲染由 `shouldShowLayoutSidebar` 控制，按用户类型（G 端管理端 vs B 端企业端）区分，而非仅超级管理员。

## 逻辑说明
- 布局里侧栏由 `showLayoutSidebar` 控制（layout/index.vue 中 `<sidebar v-if="showLayoutSidebar && ...">`）。
- 该 getter 来自 `shouldShowLayoutSidebar`，核心条件与顶栏「门户首页」隐藏逻辑相同，调用 `shouldPersistHideLayoutChrome(rootState)`。
- 规则：仅管理端（G 端 / 超管）展示左侧菜单栏；B 端企业、经纪机构等不展示。超级管理员只是其中一种「始终显示」的情况。

## 涉及文件
- `zhi2-web-admin/src/layout/index.vue`
- `zhi2-web-admin/src/utils/portalLayout.js`
- `zhi2-web-admin/src/store/getters.js`

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：cursor 提取
- 所属项目：门户
- 来源会话ID：92954991-a2a3-4de6-bff0-9d78b9e27081
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_type_sidebar",
  "source_extraction_id": "04a383200b2048969f86cf9638b3ae40",
  "version": 1,
  "memory_type": "entities"
}
-->
# 地名(dmsp) iframe 页面迁入 V3 与环境变量改造
已将旧仓库苏州市房地产监测/apps/chanpin中 VUE_APP_Place_URL 相关的地名 iframe 页面迁入 V3，并改为 Vite 环境变量 VITE_APP_Place_URL。
## 新增文件
- `zhi2-web-admin/src/utils/placeDmsp.js`：读取 VITE_APP_Place_URL、待办 URL 白名单校验
- `zhi2-web-admin/src/views/IframePage/index.vue`：`/landName/*` 菜单（地名咨询/审批/检索等）
- `zhi2-web-admin/src/views/placeManage/index.vue`：调整范围 justificationrange
- `zhi2-web-admin/src/views/placeApproval/index.vue`：地名审批（智在云换票 dmspgld=1）
- `zhi2-web-admin/src/views/announcement/index.vue`：通知公告 userTemp
## 环境变量变更
- 原环境变量 `VUE_APP_Place_URL` 改为 `VITE_APP_Place_URL`
- 写在 `env/` 下各环境文件中
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/utils/placeDmsp.js、IframePage/index.vue、placeManage/index.vue、placeApproval/index.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：2babe7dd-0254-4d05-849d-9a99a05365df；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "place_dmsp_iframe_migration",
  "source_extraction_id": "165456c449fa4d7da22f43201a818ef9",
  "version": 1,
  "memory_type": "entities"
}
-->
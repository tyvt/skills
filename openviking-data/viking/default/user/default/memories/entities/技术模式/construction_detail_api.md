---
audit_status: valid
last_checked: 2026-11-26T19:43:43+08:00
verdict_note: 泰兴小程序 maintainProject.js/construction-manage.vue 存在，selectConstructionDetail、mapConstructionDetail 均已实现，属实。
---
# 施工详情链路对接
泰兴小程序维修项目施工详情链路已继续完成并核对，相关接口与页面渲染已打通。

## 接口与映射
- `maintainProject.js` 封装 `selectConstructionDetail(params)`，请求地址为 `/v2.0/maintenance/miniapp/owner/selectConstructionDetail`。
- `parsePictureFiles` 处理 `pictureFiles`，支持 JSON 字符串、逗号分隔和换行分隔。
- `mapConstructionDetail` 将接口 `data.list` 映射为页面可直接渲染的 `detailList`，并把 `usccBName -> companyName`。
- `fetchConstructionManage(projectNo)` 已改为真实接口查询，不再使用 mock。

## 页面改造
- `construction-manage.vue` 按 `projectNo` 加载：`onLoad` 读取 `projectNo`，并兼容旧参数 `projectId`。
- `construction-manage.vue` 调用 `maintainProjectStore.fetchConstructionManage(projectNo)` 渲染施工明细与照片。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序；来源资料：`src=泰兴小程序/024.md`。
- 涉及文件：`D:/repository/泰兴小程序/src/pages_maintain_project/maintainProject.js`、`D:/repository/泰兴小程序/src/pages_maintain_project/construction-manage.vue`、`D:/repository/泰兴小程序/src/pages_maintain_project/object-detail.vue`。
- 来源会话ID：22fe4f1f-aa9d-455d-8e56-4eb40a3a876f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "construction_detail_api",
  "source_extraction_id": "886227d69a4c4d8ea47f9fd200dcd0da",
  "version": 1,
  "memory_type": "entities"
}
-->
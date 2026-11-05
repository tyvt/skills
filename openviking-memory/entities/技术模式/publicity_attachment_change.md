# 公示附件按 publicityId 查询改造
泰兴小程序维保项目模块已将公示附件查询改为按 publicityId 获取，修复原按记录 ID 取附件的问题。

## 改动内容
- `src/pages_maintain_project/maintainProject.js` 的 `fetchPublicityDetail` 原调用 `getFiles('12312312', dto.id)`。
- 改为先取 `dto.publicityId`，再调用 `getFiles('12312312', publicityId)`。
- `publicity-detail.vue` 展示的附件即通过 `publicityId` 调 `listAppendixPackage` 接口拿到。
- 改动未引入 lint 报错。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/pages_maintain_project/maintainProject.js、publicity-detail.vue、completion-acceptance.vue、src/api/common.js
- 来源会话ID：b12f2065-0f78-457c-a14c-f12885a72c60
- 所属项目：泰兴小程序；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publicity_attachment_change",
  "source_extraction_id": "2762fdd53c074d90b150c24c3dcb49e4",
  "version": 1,
  "memory_type": "entities"
}
-->
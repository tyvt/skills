# 附件上传导入 busCode 不匹配致失败
泰兴G 费用申报批量导入时，上传组件使用 route.meta.busCode 作为导入 busCode，导致部分页面匹配不到后端业务配置而失败。

## 问题根因
- 成功请求 busCode 为 3010（附件体系识别码），失败请求 busCode 为 feeDeclare2Detail
- 失败请求额外携带 path:/Propertyfees/feeDeclare2，大小写与路径值参与后端校验
- feeDeclare2/excelImport 接口按 busCode+path 做权限或业务配置匹配，feeDeclare2Detail 匹配不到导致失败

## 解决方案
- 不要直接用 this.$route.meta.busCode 作为导入 busCode
- 改为传后端认可的固定业务码（如 3010）
- path 建议传后端配置标准值（通常全小写，如 /property/feeDeclare2），或先去掉 path 让后端确认是否必填
- bulkImportDialog.vue 中改为 const params = { busCode: this.bus || '3010', complexId, declareYear }

## 验证与归属
- 所属项目：泰兴G
- 验证：extracted source=cursor session=7590eb72-ea98-4d1e-bf6a-32ed8129172e
- 涉及文件：zhi2-web-admin/src/views/property/feeDeclare2/components/bulkImportDialog.vue、components/AnnexUpload/index.vue、utils/request.js、api/index.js
- 来源会话：7590eb72-ea98-4d1e-bf6a-32ed8129172e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "upload_buscode_fix",
  "source_extraction_id": "45146488f5bd4e3b8e06716675a0c458",
  "version": 1,
  "memory_type": "entities"
}
-->
# 报修及踏勘详情附件未传显示[]可点击
后端以 JSON 字符串返回附件字段，无附件时为 "[]"，前端按逗号分割误判为有效附件，已新增归一化工具修复。

## 现象
- 报修/踏勘详情页无附件时显示 "[]" 且为蓝色可点击链接，点击请求 /"[]"。
- detail.vue 的 normalizeAttachments 仅按逗号分割，将 "[]" 当文件名渲染。

## 根因
- 后端（C端写入数据）把附件字段以 JSON 字符串返回，无附件时为 "[]"。
- 前端未解析 JSON，直接 split(',') 导致 "[]" 成为单个无效附件。

## 解决方案
- 新增 src/utils/attachments.js 的 normalizeAttachmentList，兼容 JSON 字符串、逗号分隔串、数组、对象数组，过滤 "[]"/"null" 等占位。
- repair/detail.vue 改为调用工具函数，无附件显示 "-"。
- repairDtlDialog.vue 踏勘明细"现场图片"同样的 split 问题一并修复。
- detail-template 相关组件同步修复。

## 验证与归属
- 验证证据：extracted source=workbuddy project=惠山二期G。
- 涉及文件：src/utils/attachments.js、views/maintenance/repair/detail.vue、views/maintenance/repair/components/repairDtlDialog.vue、components/detail-template/detail-。
- 来源会话ID：2e3e3715-17fd-4cbd-ac98-5ebaa291c503；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "repair_attachment_blank",
  "source_extraction_id": "e715db2dfbbd45d092aba2acf15396d8",
  "version": 1,
  "memory_type": "entities"
}
-->
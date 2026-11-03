# C 端附件 JSON 字符串 "[]" 被当有效 URL
惠山二期G 项目中，后端以 JSON 字符串返回附件致空附件 "[]" 被渲染为可点链接的缺陷与统一修复。

## 现象
- 报修/踏勘等详情无附件却出现蓝色「[]」链接，点击请求 /%22[]%22
- 后端（尤其 C 端写入）把附件以 JSON 字符串返回，空附件为字面量 "[]"

## 根因
- 页面只做 split(',') 或把非数组当单条 URL，会把 "[]"/"null" 当成一条有效路径

## 修复方案
- 抽 utils/attachments.js 的 normalizeAttachmentList，统一兼容 JSON 字符串、逗号分隔串、数组、对象数组（取 url/path 字段），过滤 "[]"、"null"、空白
- 无有效项详情展示 -
- DetailTemplate 的 type:'image' 丢弃无效 URL；type:'images' 先归一化数组再 v-for，否则对字符串按字符迭代出破损缩略图
- ImageUpload 监听值时解析 JSON 字符串，避免编辑态出现 "[]" 假图
- 与「逗号分隔 attachments + resolveServerAssetUrl」套路互补：先判形态再拆路径

## 验证与归属
- 边界单测 17/17 通过（"[]"、'["a.png"]'、逗号串、对象数组、null 等）
- 涉及文件：utils/attachments.js、maintenance/repair/detail.vue、repair/components/repairDtlDialog.vue、components/detail-template/detail-template.vue、components/ImageUpload/index.vue
- 所属项目：惠山二期G；来源会话：2e3e3715-17fd-4cbd-ac98-5ebaa291c503；代码基线：d52a061

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "c_attachment_json",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 2,
  "memory_type": "entities"
}
-->
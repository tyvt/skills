# 预售楼幢附件查询 GET 改 POST 修复
苏州市房地产监测V3 的 zhi2-web-admin 修复了预售楼幢操作按钮附件查询报 405 的问题。

## 原因
- /file/appendix/ 在加密白名单内，$get 会发真实 GET 请求
- listByAppendixConfigIdAndBusIdAndBusCode 接口只支持 POST，因此返回 405

## 修改
- PresaleProgressDialog.vue 的 checkExistingAttachments 中将 $get 改为 $post，调用方式与 companyRecord.js 中同类接口一致

## 涉及文件
- zhi2-web-admin/src/views/presale/permit/components/PresaleProgressDialog.vue
- zhi2-web-admin/src/api/company/companyRecord.js

## 验证与归属
- 重新打开「工程形象进度维护」弹窗验证，查询已有附件请求应为 POST，不再报「HTTP请求方法不支持」
- 所属项目：苏州市房地产监测V3；来源会话：fb0248ef-0ab1-4952-b167-0d4b0ecc5257；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_attachment_fix",
  "source_extraction_id": "11c8801bf8684342866a4b4661e1ae1f",
  "version": 1,
  "memory_type": "entities"
}
-->
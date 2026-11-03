# 上传组件校验与prop大小写修复
园区公共收益项目中，上传组件因文件类型校验未转小写且 prop 大小写错误导致 PDF 上传失败，已统一校验并修正 prop。

## 问题根因
- zs-file-upload.vue 文件类型校验未统一转小写，且 accept 缺 MIME 类型
- 资金拨付页 pubAllotNotice/detail.vue 误用 :file-type 非驼峰写法

## 解决方案
- 组件增 MIME 映射与 isAllowedFileType 双重校验
- accept 补 MIME 类型
- 页面 prop 改为 :fileType 驼峰写法

## 验证与归属
- 来源会话：a28865de-bc9e-4a81-8cd6-95d66e5ba32a
- 涉及文件：zs-file-upload.vue、FileUpload/index.vue、pubAllotNotice/detail.vue、property/allotNotice/detail.vue、assetLeaseApply 子组件、pubVerificationReceipts/detail.vue、ImageUpload/index.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "file_upload_mime_fix",
  "source_extraction_id": "aba4a2b6479d4f45a2363f3e0f9679b4",
  "version": 1,
  "memory_type": "entities"
}
-->
# 资金拨付详情PDF上传修复
园区公共收益项目资金拨付详情页「上传支付凭证」无法上传 PDF 的问题已修复，涉及 zs-file-upload 组件与 pubAllotNotice/detail.vue。

## 问题原因
- zs-file-upload 文件类型校验未统一转小写，Windows 下 .PDF 被误判为非法格式
- accept 属性不完整，只写 .pdf,.png,.jpg，部分浏览器文件选择框偏向只显示图片
- 资金拨付页用 :file-type（kebab-case），其他页面用 :fileType（camelCase）导致 prop 未生效

## 解决方案
- zs-file-upload.vue 增加 PDF/图片 MIME 类型映射（如 application/pdf）
- accept 同时包含扩展名和 MIME 类型
- 新增 isAllowedFileType 方法按扩展名和 MIME 类型双重校验
- pubAllotNotice/detail.vue 将 :file-type 改为 :fileType

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益；来源会话：a28865de-bc9e-4a81-8cd6-95d66e5ba32a；代码基线：none
- 涉及文件：zs-file-upload.vue、pubAllotNotice/detail.vue

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "puballot_pdf_upload",
  "source_extraction_id": "4b566ffdc76e457fbb659ffa7cef0027",
  "version": 1,
  "memory_type": "entities"
}
-->
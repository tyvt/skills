# 文件凭证类字段承载方式
表单里的凭证预览/附件图片字段，查看态走 DetailTemplate 的 type:'image'，编辑态用 ImageUpload，底部不再单挂缩略图。

## 适用场景
- 表单出现「凭证预览/附件图片」类文件字段，且该表单已被 DetailTemplate 封装成只读详情
- 用户要求：凭证预览也是一个表单字段，用 imageupload 组件，详情状态需要使用 detail-template 封装

## 解决方案
- 查看态改渲染 `<DetailTemplate :data="xxxDetailItems" />`，items 与表单字段一一对应，文件字段作最后一项 { type:'image', value:voucherFileUrl }（link 分支只认 item.link，附件必须走 image 类型）
- 编辑/新增态在同一表单加整行 el-form-item，控件用 ImageUpload，v-model 绑逗号分隔地址串，limit="1"，透传 isFormDisabled 保证只读禁用上传、隐藏 tip
- 弹窗底部不再放独立缩略图展示凭证，统一收敛到 DetailTemplate 或表单项，避免同一份数据两个入口两种样式

## 数据契约
- ImageUpload 的 v-model 是逗号分隔的图片 URL 串
- 后端若只存 voucherFileId 而非可访问地址，必须在接口层补全 URL，或打开详情时把可访问地址写进 voucherFileUrl，否则 DetailTemplate 图片列恒为空且不报错

## 验证与归属
- 验证证据：会话 c26c8f38 结论 simplifiedLayout && dialogFormMode==='view' 时改渲染 DetailTemplate，凭证预览 type:'image' 用 voucherFileUrl、无则回退 voucherFileId，编辑态末尾加 ImageUpload(limit=1)，弹窗底部去掉左侧缩略图
- 涉及文件：zhi2-web-admin/src/views/benefit/components/BankReceiptDetailDialog.vue、src/components/HeadTitle/index.vue、src/views/benefit/pubBankReceiptApply/detail.vue
- 所属项目：产品2.0；来源会话ID：c26c8f38-d604-41d2-b12e-edbdfd3c8e06；代码基线：6b9d9d7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "voucher_field_pattern",
  "source_extraction_id": "1feff99c09f5411780734b6be1b7bdaf",
  "version": 1,
  "memory_type": "entities"
}
-->
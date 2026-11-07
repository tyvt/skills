# StandaloneAppendixField 全局附件标签能力
苏州市房地产监测V3 中 `StandaloneAppendixField` 底层组件支持传入 `label` 自动套用预售宫格外壳，实现附件标题统一展示。
## 功能说明
- `zs-file-upload` / `FileUpload` 底层传入 `label` 时自动套 `appendix-requirement-grid` + 标题条 + 缩略图左边距
- 任意页面使用带 `label` 的上传组件即可，无需再包业务组件
## 全局样式
- `appendix-requirement-grid.scss` 已在 `index.scss` 引入
- 表单项使用 class `appendix-labeled-field-form-item`：`label-width="0"`，去除 Element 侧栏标签避免重复
## 页面用法
- 统一写法：`<el-form-item prop="attachmentUrl" class="appendix-labeled-field-form-item" label-width="0"> <zs-file-upload v-model="form.attachmentUrl" label="建设工程规划许可证" ...>`
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`appendix-requirement-grid.scss`、`index.scss`、`CertificateFixedAppendixField.vue`、`detailAttachmentDisplay.js`
- 所属项目：苏州市房地产监测V3；来源会话ID：f08e4450-7e4c-4f7a-8514-96638563fc99；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端组件",
  "name": "standalone_appendix_field",
  "source_extraction_id": "ecb2c916fe7a444b9f3afc876a11bd7c",
  "version": 1,
  "memory_type": "entities"
}
-->
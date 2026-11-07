# 委托代售详情页要件上传布局对齐
苏州市房地产监测V3 已完成委托代售详情页「要件上传」布局对齐到全局 `AnnexUpload`，业务逻辑未改。

## 修改文件
- zhi2-web-admin/src/views/presale/entrustSale/detail.vue
- EntrustSaleAddAppendix.vue（位于 src/views/presale 相关目录）

## 重构内容
- `EntrustSaleAddAppendix.vue` 新增态要件上传 UI 对齐全局 `AnnexUpload`：复用 `FileList` / `ImageGrid` 子组件，增加顶部工具栏（批量选择、列表/网格切换），折叠面板展示配置名、已上传数、版本号，上传区域显示文件类型提示（`.el-upload__tip`），支持批量删除/下载
- `detail.vue` 在 `operation-btn-group` 上增加 `:show-attachment="false"`，避免 view 模式下顶栏「附件」抽屉与页面内联要件区块重复
- 业务逻辑不变：仍为先上传要件、保存时通过 `v-model` 提交 `attachmentList`；`validateRequired()` 行为不变

## E2E 兼容性
- 选择器 `.el-collapse-item.required`、`.already-upload`（格式 `(已上传: N)`）、折叠项内 `i` 保持不变，`uploadRequiredAppendix(page, 'entrust-sale-appendix')` 无需修改

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：ea5712c4-59ac-4c16-8f4b-79c895e6b7b4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_sale_appendix_layout",
  "source_extraction_id": "a49f22e6571844eeb473d75963a3686e",
  "version": 1,
  "memory_type": "entities"
}
-->
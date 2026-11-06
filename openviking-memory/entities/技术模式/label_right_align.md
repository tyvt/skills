# 编辑态横向表单标签右对齐全局调整
苏州市房地产监测V3 已完成编辑态横向表单标签右对齐全局调整，默认仍 top。

## 核心逻辑
- `zs-form.vue` 在 `detail-from` 场景增加 `label-position="right"` 分支（`labelWidth:auto`），默认 `top` 不变
- `zs-dialog.vue`、`index.scss`、`detail-form.scss` 配套调整

## 页面与组件
- 弹窗去掉 `label-position="left"` 及硬编码 `label-width`：NodeDetailsDialog、BuildingChangeDialog、YhwdDialog、ParcelDialog、ExtractDialog 等
- 详情横向编辑改 `right`：toB变更、中介变更备案、companyRecordAgency、assetLeaseApply、companyScheme 等
- 额外修正：ElevatorOpeningDialog、subDialog、CompanyDialog、zs-search-form 列表筛选统一 `right`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zs-form.vue、index.scss、zs-dialog.vue、NodeDetailsDialog.vue 等
- 来源会话：fc1bfee3-7801-4bc0-80fd-6f073ce051f3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "label_right_align",
  "source_extraction_id": "79b5aa53d4d3492ab1e8446e4879e7ca",
  "version": 1,
  "memory_type": "entities"
}
-->
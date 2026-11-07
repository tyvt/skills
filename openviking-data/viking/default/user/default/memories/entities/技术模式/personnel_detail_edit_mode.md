# 已备案企业从业人员详情编辑模式
已备案（bizState=2）企业从业人员在 ToB/管理端详情页展示「编辑」而非「变更」，保存调用 `companyUpdatePersonnel`。

## 关键事实
- 已备案状态 bizState=2 的企业从业人员详情页显示「编辑」按钮，不显示「变更」
- 保存操作调用 `companyUpdatePersonnel` 接口
- 涉及 ToB 端与管理端详情页

## 涉及文件
- `src/views/company/staffManagement/components/detail.vue`
- `src/views/toB/personnelRecord/components/detail.vue`
- `src/components/OperationBtnGroup/index.vue`
- `src/views/company/staffManagement/components/index.vue`
- `src/mixins/detailMixins.js`、`src/mixins/form.js`
- `e2e/fixtures/company-helpers.js`、`e2e/company/personnel-record.spec.js`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/030.md
- 来源会话ID：7cf9d7c3-1aa5-441c-b2af-a459deebc0b4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_detail_edit_mode",
  "source_extraction_id": "cc2294dc61514faebe82642a30e5fb6e",
  "version": 1,
  "memory_type": "entities"
}
-->
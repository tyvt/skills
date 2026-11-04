# 苏住房G
苏住房G 是用户提及的一个 frontend 管理项目，包含房地产管理、企业登记等模块。

## Description
- Frontend zhi2-web-admin 涵盖房地产合同、企业登记、月度报告、评估等模块。
- 用户积累了多个调试和重构的工作流。

## Significance
- 用于偏好和技术模式记忆的项目上下文。

## 已知技术模式
- detail_readonly_dual: 子表 readOnly 判断 formMode 和 bizState，仅编辑+草稿可操作。
- showsave_formmode: showSave 在 operation-btn-group 中限制为 formMode=='edit'。
- fee_declare_submit_edit_only: showSubmit 由 formMode 控制，编辑时隐藏。
- rectification_bizstate_default: bizState 在 rectificationNotice index 中默认为 undefined。
- company_change_bizstate_multivalue: bizState 不应是 companyChange 中的多值字符串 '1,2'。
- pending_oper_headers: 审计仅在保存编辑和列表删除时。
- change_double_fetch: 变更详情不应使用登记 detail 覆盖 form。
- shell route storedPath: shell 路由在 getRouteFilePath 中返回 '' (见偏好)。
- todo_shell_menu: single menu Layout shell mistaken as valid component.
- jump_align_pattern: top nav + empty state link + URL preset trio change.
- zsprint_panel_sizing: ZsPrint remove min-height to flow.
- bizstate_search_bug: zs-search-form global multiple flip history.
- filing_menu_config: empty state link old filePath parse fail.
- dialog_col_width: dialog table column width minmax equal.
- fee_declare_step_layout: step bar vertical to avoid overflow.
- shared_api_filter_param: multi-page shared api specific param only at call site.
- navbar_menu_width_sync: style and JS const sync 120px.
- home_variant_ready_bug: homeVariantReady add roles second signal.
- company_founding_asset_validation: companyManagement/detail.vue mandatory foundingDate/registeredAssets.
- regulatory_agreement_print: frontend only adjusts field order by prototype.
- log_feature_branch_sync: new files in both develop branches cherry-pick.
- minus_score_dropdown_tooltip: dropdown flex with tooltip to prevent truncation.
- bulk_import_feemode: bulkImportDialog requires feeMode else block.

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房G",
  "source_extraction_id": "365bab52c52f4179bd3a6d0ab0e8c6cc",
  "version": 7,
  "memory_type": "entities"
}
-->
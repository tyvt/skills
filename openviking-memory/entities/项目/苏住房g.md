# 苏住房G
苏住房G é um projeto frontend de administração mencionado pelo usuário, com módulos de gestão imobiliária, registro de empresas, etc.

## Description
- Frontend zhi2-web-admin abrange módulos de contrato imobiliário, registro de empresas, relatórios mensais, avaliação.
- Usuário acumulou vários fluxos de trabalho de depuração e refatoração.

## Significance
- Contexto de projeto para memórias de preferências e padrões técnicos.

## Padrões Técnicos Conhecidos
- detail_readonly_dual: sub-tabela readOnly julga formMode e bizState, só edição+rascunho operável.
- showsave_formmode: showSave em operation-btn-group restrito a formMode=='edit'.
- fee_declare_submit_edit_only: showSubmit controlado por formMode, oculto em edição.
- rectification_bizstate_default: bizState padrão undefined em rectificationNotice index.
- company_change_bizstate_multivalue: bizState não deve ser string multi-valor '1,2' em companyChange.
- pending_oper_headers: auditoria só em save edição e delete lista.
- change_double_fetch: detalhe de mudança não deve sobrepor form com detail de registro.
- shell route storedPath: rotas shell retornam '' em getRouteFilePath (ver preferência).
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
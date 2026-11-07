# 苏住房G已知技术模式
苏住房G项目积累的技术模式索引，详细修复见各技术模式实体。

## 已知技术模式
- detail_readonly_dual: 子表 readOnly 判断 formMode 和 bizState，仅编辑+草稿可操作。
- showsave_formmode: showSave 在 operation-btn-group 中限制为 formMode=='edit'。
- fee_declare_submit_edit_only: showSubmit 由 formMode 控制，编辑时隐藏。
- rectification_bizstate_default: bizState 在 rectificationNotice index 中默认为 undefined。
- company_change_bizstate_multivalue: bizState 不应是 companyChange 中的多值字符串 '1,2'。
- pending_oper_headers: 审计仅在保存编辑和列表删除时。
- change_double_fetch: 变更详情不应使用登记 detail 覆盖 form。
- shell route storedPath: shell 路由在 getRouteFilePath 中返回 '' (见偏好)。
- todo_shell_menu: single menu Layout shell mistaken as valid component。
- jump_align_pattern: top nav + empty state link + URL preset trio change。
- zsprint_panel_sizing: ZsPrint remove min-height to flow。
- bizstate_search_bug: zs-search-form global multiple flip history。
- filing_menu_config: empty state link old filePath parse fail。
- dialog_col_width: dialog table column width minmax equal。
- fee_declare_step_layout: step bar vertical to avoid overflow。
- shared_api_filter_param: multi-page shared api specific param only at call site。
- navbar_menu_width_sync: style and JS const sync 120px。
- home_variant_ready_bug: homeVariantReady add roles second signal。
- company_founding_asset_validation: companyManagement/detail.vue mandatory foundingDate/registeredAssets。
- regulatory_agreement_print: frontend only adjusts field order by prototype。
- log_feature_branch_sync: new files in both develop branches cherry-pick。
- minus_score_dropdown_tooltip: dropdown flex with tooltip to prevent truncation。
- bulk_import_feemode: bulkImportDialog requires feeMode else block。
- area_cascade_clear: area.js mixin 集中实现级联清空，区域/街道变化清空下级，详情回显(_lastRegionCode比较)不清空。
- fee_declare_noReject: request.js 支持 noReject 返回 res.data；错误文件 URL 用 window.location.origin + filePath 拼接；导入请求加 noMessage:true 避免重复提示。
- screen_responsive_fix: 物业管理区域信息页小屏幕自适应修复，合并至 develop/v2.6.2 等分支。
- study_panel_download_jump: 学习园地 StudyPanel 条件下载与详情跳转，新增 studyNav.js 映射 type 1-5。
- work_bank_query_param: queryStartBank 统一传入 sourceModel 与 regionCode，新增 workBank.js 工具。
- account_status_dict: 银行账户状态字典统一到 ACCOUNT_STATUS，销户编码6回显。
- personnel_role_fix: toB人员详情角色下拉移除硬编码 organType，按机构类型动态加载。
- bizstate_dict_fix: 监管账户列表改用 biz_state 字典修复已备案/审核中筛选对调。
- complex_change_bizstate_default: complexChange index bizState 默认 undefined（placeholder 全部）
- complex_query_management_subject: publicQuery/complex 新增管理主体/收费方式列与筛选
- zs_region_select_unsuitable: 只读行政区域改用 zs-select 替代 zs-region-select
- statistic_fields_vo_mapping: 详情统计字段对齐后端 VO（totalHouseholds/totalArea 等）
- dynamic_admin_region: 资产/资金全景监管区域图表改为动态解析接口行政区域（后端已改，2026-11-05合并）
- todo_detailid_compat: ruoyi.js 兼容 detailId，用 dataId??detailId 提取主键，缺参返回 missingId 阻止错误跳转，移除 console.log
- version_check_root: version-check.js 从入口 script[type=module] 推断部署根路径避免嵌套路由误解析，fetchVersion 校验 res.ok 与 Content-Type 防 SyntaxError；vite.config.js 抽 writeVersionJson 并增 middleware 响应 /version.json
- region_tree_leaf: regionTree.vue 按 deptTypes 最大层级强制街道节点为叶子移除 children；CSS 隐藏 .el-tree-node__expand-icon.is-leaf 及第3级展开箭头
- suzhufang_more_dropdown: Navbar.vue 更多功能下拉补 width:max-content 等宽度策略，父级 overflow:visible 防裁切
- suzhufang_platformconfig_detail: platformConfig/detail.vue 去掉 getDetail id 校验，兼容 response.data 两种结构
- suzhufang_monthly_unit: 月报统计详情新增单位列，monthlyReport.js 拆出 unitName
- suzhufang_indicator_layout: 基础信息列表列宽与多行换行优化，修复 zs-table-column className 合并
- home_region_dynamic: 首页 index-v2 区域筛选改为动态拉取行政区划（fetchCityRegionTabOptions + regionOptionsFetchSeq 防竞态）
- credit_summary_fix: 考评列表底部统计改用 ZsSummaryText 避免 footer 省略号截断
- map_overlay_reinforce: 共管小区地图蓝绿气泡叠层二次加固（_markerRedrawSeq/_overlayLayers 池防残留）
- map_xaxis_fix: 监管账户数量横坐标区县>6 倾斜显示修复
- zsprint_relative_path_fix: ZsPrint打印路径改用resolveServerAssetUrl拼相对部署路径
- company_register_truncation_fix: companyRegister.vue布局冲突导致截断，改min-height整页滚动
- ruoyi_shell_route_path_fix: ruoyi.js壳路由返回空路径走storedPath
- pub_parking_rate_align_fix: pubParkingRate金额列右对齐修复

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "su_housing_g_patterns",
  "source_extraction_id": "fe0d6d2b918c4a599f472aedc212ae79",
  "version": 1,
  "memory_type": "entities"
}
-->
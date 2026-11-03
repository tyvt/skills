# B端项目上下文complexId注入口径
物业合同等B端业务列表需带全局当前项目complexId，详情新增态仅在缺值时从store兜底，防止跨项目数据混查。

## 问题背景
- B端业务列表（如 property/propertyContract/page）要求带全局当前项目 complexId，否则跨项目数据混查。
- 项目选择存于全局 store 的 currentProjectId getter（由B端项目选择弹窗写入），接口不收路由上下文。
- 列表查询参数与详情表单是两处独立构造，只补一处会漏。

## 解决方案
- 列表侧在 getQueryParams 里判 `this.$store.state.user.terminalType === 'B'` 才注入 `result.complexId = this.$store.getters.currentProjectId`，G端一律不传。
- 该组件常被多个菜单共用（物业服务合同备案/前期物业服务合同备案/合同变更/解聘），改一处全域生效，需提前评估放大效应。
- 详情侧新增态（formMode==='add' 且 form.complexId 为空）按 `路由 query.complexId || (B端 ? currentProjectId : null)` 兜底回填，取不到就直接 return 不做处理。
- 写法与 benefit/alert、property/complex 等页面保持一致，不另造项目上下文来源。

## 验证与归属
- 验证证据：会话 35c4f338（基线 401d884）用户诉求「property/propertyContract 接口加 complexId 参数，从全局 store 获取B端选择项目」。
- 落地为 components/index.vue 的 getQueryParams 与 components/detail.vue 的 initComplexFromRoute。
- 涉及文件：src/views/property/propertyContract/components/index.vue、detail.vue、src/utils/projectContext.js、src/mixins/listMixins.js。
- 所属项目：产品2.0；来源会话：35c4f338-b3f4-4660-b726-f1bf15f29ea7；代码基线：401d884

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_contract_complexid",
  "source_extraction_id": "5310be18648c497aa40048c7aadc88c2",
  "version": 1,
  "memory_type": "entities"
}
-->
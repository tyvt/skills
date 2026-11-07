# 列表页 list-container/list-card 标准包裹结构
园区物管2.0 Web 后台列表页应采用 list-container > zs-search-form + div.list-card 标准结构，弹窗保持在 list-card 外部。

## 背景
- 历史上大量列表页 index.vue 有 class="list-container" 却缺 <div class="list-card"> 包裹，全局排查后 44 处补齐。
- list-card 承担卡片边框、内边距与滚动边界，缺失导致样式与同模块页面不一致；但弹窗等浮层包进 list-card 会受卡片布局影响。

## 标准结构
- 固定为 list-container > zs-search-form + div.list-card（内含 ListOperationButtonContainer、zs-table、zs-pagination），弹窗组件保持在 list-card 外部。
- 特殊落点：左树右表在 sort-right 内 zs-search-form 之后包 list-card；左树右表单在 sort-right 内包表单内容；组件转发页用 list-card 包内部组件；地图页在搜索表单后主内容区包裹；打印配置页把原 table-container 改成 list-card。

## 做法
- 新增列表页按此结构直接落地，存量排查以 ListTemplate.js 为参照。

## 关联信息
- 涉及文件：zhi2-web-admin/src/mixins/ListTemplate.js；所属项目：园区物管2.0；来源会话 ID：d7cb3247-4f21-4218-9399-5bdae428c354；代码基线：f101dd464 / fc994977f。
- 验证：全局排查 179 个带 list-container 的 index.vue，44 个缺 list-card 包裹已补齐，含特殊布局处理表。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_card_struct",
  "source_extraction_id": "ac7ed565a11941f68e3ba3d720da30ae",
  "version": 1,
  "memory_type": "entities"
}
-->

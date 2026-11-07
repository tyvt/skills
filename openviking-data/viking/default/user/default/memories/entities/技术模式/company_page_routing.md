# 苏住房G企业模块页面路由模式
苏住房G 项目 zhi2-web-admin 的 company 模块页面采用后端菜单动态注册路由，并通过 mixin 拼装 REST 请求路径。

## Description
- 6 个页面均在 `zhi2-web-admin/src/views/company/` 目录下。
- 路由由后端菜单动态注册，文件路径即路由路径（如 `company/companyManagement/property`），无独立 `src/api/company/*.js`。

## 列表与请求机制
- 列表/详情通过 `src/mixins/table.js` 的 mixin 拼 REST 路径：`this`$${this.apiMethod}``。
- 业务状态字典来自全局 store（`main.js` 注入 `bizStateOptions`），列表 `bizState` 列用 tag 渲染。

## 物业服务企业页
- 列表入口：`src/views/company/companyManagement/property/index.vue`。
- 列表逻辑为多个企业页共享。

## 页面清单与共享组件
- 采用「薄入口 + 共享组件」模式：无独立 api/companyRecord.js，列表/详情请求由 mixin 按 moduleName + businessName 动态拼 REST 路径。
- 物业服务企业：companyManagement/property/，共享 components/index.vue + detail.vue，organType="02"。
- 信托公司：companyManagement/trust/，同上，organType="30"。
- 企业变更记录：companyManagement/change/，同上，isChange=true。
- 机构注册审核：companyRegister/，独立实现，businessName=companyRegister。
- 项目经理：staffManagement/personnelRecord/，共享 components/index.vue + detail.vue，备案模式。
- 项目：同上共享组件模式。

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G。
- 涉及文件：`src/api/company/*.js`、`src/mixins/table.js`、`main.js`、`src/views/company/companyManagement/property/index.vue`。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_page_routing",
  "source_extraction_id": "27ebcb9277314cbd801f4e9338b27dda",
  "version": 2,
  "memory_type": "entities"
}
-->
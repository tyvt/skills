# 部门管理页旧接口重写修复
产品2.0 中部门管理页展开子部门时仍请求旧接口 `system/dept/list`，原因是懒加载路径缺少前导 `/`，`portalApiRewrite` 无法匹配重写规则。

## 问题根因
- 懒加载请求路径 `system/dept/list` 缺少前导 `/`，`portalApiRewrite` 重写规则无法匹配，导致请求旧接口而非 `/portal/dept/list`

## 修复方案
- `portalApiRewrite.js` 新增精确映射 `/system/dept/list` → `/portal/dept/list`，并在重写前自动补全前导 `/`，避免 `system/dept/list` 这类路径漏匹配
- `dept/index.vue` 修正 `load()` 中的请求路径，统一为 `/${moduleName}/${businessName}/${apiSuffix}`

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：刷新部门管理页后，展开子部门应请求 `/portal/dept/list?parentId=100`，不再请求 `/system/dept/list?parentId=100`
- 涉及文件：src/utils/portalApiRewrite.js、src/views/system/dept/index.vue、src/utils/request.js、src/mixins/subTableMixins.js、src/mixins/table.js
- 所属项目：产品2.0；来源会话：06d23df6-d9e0-472b-bdcb-895195ece6ab；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dept_list_rewrite_fix",
  "source_extraction_id": "d70fba0bcec84f65b76e0f60a1dcc6b0",
  "version": 1,
  "memory_type": "entities"
}
-->
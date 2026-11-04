# 门户前端无仓库级 TypeScript 校验
zhi2-web-admin 门户前端以 Vue 2 + JS 为主，仓库层面不提供 TypeScript 类型检查。

## 现状
- 仓库无 tsconfig 文件
- package.json 无 typecheck 脚本
- 以 Vue 2 + 原生 JS 开发为主

## 审查约束
- 审查/回归 publicPortal 的 .vue 组件不能依赖 tsc
- E2E 的 .ts 文件属 Playwright 侧，与业务 SFC 类型检查分离
- 可用 eslint 对具体 Vue 文件做静态检查

## 验证与归属
- 会话 a8453950 明确未执行 tsc，PortalDetailHeader/PropertyDetailDialog eslint 通过
- 涉及文件：zhi2-web-admin/package.json、zhi2-web-admin/src/views/home/publicPortal/
- 所属项目：门户；代码基线 e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "portal_no_typecheck",
  "source_extraction_id": "b517f13e5b474bc8acf59afc78f5febc",
  "version": 1,
  "memory_type": "entities"
}
-->
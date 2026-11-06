# 合同范本跳转改造
苏州市房地产监测V3 中 `commercialHousingSales/presale/template/detail.vue` 的 `gotoContractTemplate` 改为使用公共路由解析函数，跳转更可靠。

## 改动说明
- `gotoContractTemplate` 不再硬编码 `name: 'ContractTemplate/:type/:tableid'`，改用 `buildNavigationByFilePath` 按 `contract/index` 组件路径查找合同正文编辑页路由
- 用 `pathHint: 'cash' | 'pre'` 区分现售/预售，用 `preferDetail: true` + `routeId` 填入范本 `templateId`
- 未找到路由时提示「没有授权相关菜单，请联系管理员」；`router.push` 增加 `.catch(() => {})` 避免重复导航报错

## 验证情况
- 已尝试运行 `npm run test:e2e:contract-template`，因 E2E 登录凭据错误未能完成自动化验证
- 代码实现与计划一致，可在有权限环境中手工点击验证

## 验证与归属
- 涉及文件：`zhi2-web-admin/src/views/commercialHousingSales/presale/template/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：abab47cb-8bf9-42ce-b594-9c7268af90e8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_nav_fix",
  "source_extraction_id": "828ec5e928bc4e768c9341b93118b60e",
  "version": 1,
  "memory_type": "entities"
}
-->
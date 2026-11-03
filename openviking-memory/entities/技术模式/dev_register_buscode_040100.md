# 开发企业注册与入网认证共用 busCode 040100
开发企业注册与入网认证取附件配置共用同一 busCode `040100`，靠复用同一常量保证一致；经纪/租赁必须分开。

## 代码链路
- 常量定义：`src/api/company/companyRegister.js` 中 `const BUS_CODE = '040100'`
- 入网侧 `src/api/company/companyRecord.js` 直接 `import { BUS_CODE as ... }` 并导出 `ENTRY_NETWORK_APPENDIX_BUS_CODE`
- 两条链路（企业端/管理端入网详情、主管入网确认）均调 `/file/appendix/listAppendixPackage`，busCode 恒为 `040100`，仅 busId 不同

## 跨主体编码
- 经纪机构注册 `030100`、经纪入网认证/确认/基本信息 `030110`
- 租赁入网 `030300`、租赁开业/G端审核 `030310`（见 `institutionRegister.js`）
- 产品2.0 注册包与入网包为 `040900` 与 `040100`，不可外推本条结论到其他主体

## 查码位置
- 注册侧：`RegisterUploadItem.vue` 的 `resolvedBusCode = busCode || BUS_CODE` 兜底
- 入网侧：`DeveloperBasicInfoDetail.vue` 的 `displayAppendixBusCode`/`toolbarBusCode`，最终由 `AppendixPackageSection` 传接口

## 涉及文件与归属
- 文件：`companyRegister.js`、`companyRecord.js`、`DeveloperBasicInfoDetail.vue`、`DeveloperEntryNetworkAdminDetail.vue`、`RegisterUploadItem.vue`、`AppendixPackageSection/index.vue`
- 来源会话：`session-f030e21f-90d1-4e58-867a-89aef8b09352`；代码基线：`a86bf95`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dev_register_buscode_040100",
  "source_extraction_id": "2f0285f8b19a47cf8f04cc41b8d6c128",
  "version": 1,
  "memory_type": "entities"
}
-->
# 5 个 Vue 列表页改用 ListTemplate + listMixins
产品2.0 中将 5 个列表页统一改造为标准 ListTemplate + listMixins 模式。

## 改造文件与配置
- `contractView/index.vue`：moduleName=presale，businessName=contractMainInfo，permsPrefix=contractView:contractView，primaryKey=contractId；保留 isSuzhouzhizai 条件列；getList 走 listContractViewInfo；含导入/导出按钮、ChooseHouseDialog 注入；操作列仅「查看」
- `specialcontract/index.vue`：moduleName=presale，businessName=specialcontract，permsPrefix=specialcontract:specialcontract
- `exchangeContract/index.vue`、`verifyRecord/index.vue` 等其余列表页同样改造

## 改造要点
- 标准 ListTemplate + formItems / columns / operationButtons 配置驱动
- 统一列表模板与混入逻辑，减少重复代码

## 验证与归属
- 验证证据：extracted source=cursor session=43c84fe7-2b4f-4b61-b5ff-d697d2feb8ba
- 涉及文件：contractView/index.vue、specialcontract/index.vue、exchangeContract/index.vue、verifyRecord/index.vue
- 项目：产品2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listtemplate_listmixins",
  "source_extraction_id": "9f333107872e469e979c4d40d93df257",
  "version": 1,
  "memory_type": "entities"
}
-->
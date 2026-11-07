# 6个Vue列表页统一改造为ListTemplate+listMixins
产品2.0 将 6 个列表页改为 `ListTemplate` + `listMixins`（script-only），参考 `xy/index.vue`。

## 已改造文件
- `xy/index.vue`：参考模板
- `progress/gcht/index.vue`：moduleName=prefund / businessName=engContract / permsPrefix=xmxx:gcht / primaryKey=contractId / apiSuffix=list；保留 ProjectDialog + ExtractDialog（baseTemplate.replace 注入）；保留提取按钮（权限 xmxx:gcht:extract）、setProject/setExtract 自定义新增流程；搜索：项目名称、合同类别（CONTRACT_CLASS）；列：项目名称/合同号（link）、合同名称、合同类别、金额、开始日期、业务状态
- `progress/change/index.vue`：moduleName=prefund / businessName=proChange（其余配置截断待补充）
- `progress/bdcdj/index.vue`（其余文件待补充）

## 涉及文件与来源
- 文件：`xy/index.vue`、`progress/gcht/index.vue`、`progress/change/index.vue`、`progress/bdcdj/index.vue`
- 项目：产品2.0；来源会话：0c55b984-d193-404d-80bd-37db6196ab05；代码基线：none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_list_template_conversion",
  "source_extraction_id": "57e872b5424442ffaddb2a2cb119a7a7",
  "version": 1,
  "memory_type": "entities"
}
-->

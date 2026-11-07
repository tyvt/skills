# 列表页迁 ListTemplate/listMixins 映射口径
将手写 el-table 列表页统一迁到 ListTemplate + listMixins 时，需按 URL 拆 businessName、权限串拆 permsPrefix、自定义流程靠 baseTemplate.replace 注入。

## 映射口径
- moduleName/businessName 从接口 URL 拆：/prefund/engContract/list 即 moduleName='prefund'、businessName='engContract'，默认 apiSuffix='list'
- permsPrefix 从原 v-hasPermi 逐条反推，用冒号分段（xmxx:gcht、capital:change、riskmanage:riskregister）
- primaryKey 逐页人工核对（contractId / proChangeId / realTransactionId / projectDeliveryId / versionId / riskProRegisterId），错一个则查看/删除静默失效
- 搜索项差异补进 queryParams，否则接口收不到条件

## 保留手段
- 页面独有弹窗（ProjectDialog/ExtractDialog）、额外按钮、动态列名、disableButton 等自定义逻辑，通过 baseTemplate.replace 注入模板片段或在 mixin 钩子里覆写
- 有自定义 getList 的页面保留并注明分支接口，不可改回手写表格

## 回归与验证
- 迁移后按「搜索项—列顺序—行内 link 跳转—删除回调」四项逐页回归
- 参考会话 0c55b984：6 个 supervision 列表页按 xy/index.vue 批量迁移
- 涉及文件：mixins/ListTemplate.js、mixins/listMixins.js、views/supervision/agreement/xy/index.vue，代码基线 39e3114

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "list_migration_mapping",
  "source_extraction_id": "fe98c453fafb46bda36d6363aa048c3d",
  "version": 1,
  "memory_type": "entities"
}
-->
# 监管协议详情页框架改造
产品2.0 完成 xy/detail.vue 与 AgreementDetailsTable.vue 新版框架改造，对齐同目录 end/detail.vue 等模式。

## 主要变更
- 顶部操作区 operation-container → operation-btn-group，移除 zs-attachment
- 框架配置：moduleName 'prefund'、businessName 'superviseAgree'、primaryKey 'regulatoryAgreementId'、permsPrefix 'zjjg:xy'
- 表单结构：外层 zs-form 包裹；view 模式用 DetailTemplate，edit/add 保留 el-form-item
- 打印：zs-print 放入 slot，custom-print=true，权限 zjjg:xy:print，显示条件 form.bizState != '0'

## 业务保留与文件
- 保留 AgreementDetailsTable 及全部弹窗业务逻辑
- 文件：xy/detail.vue、AgreementDetailsTable.vue、end/detail.vue、version/detail.vue
- 所属项目：产品2.0；来源会话：0e5f49e3-e419-41e8-86f5-2009c4cfc14f；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "xy_detail_refactor",
  "source_extraction_id": "9a39b38a52124808ace9dff74296b3b4",
  "version": 1,
  "memory_type": "entities"
}
-->

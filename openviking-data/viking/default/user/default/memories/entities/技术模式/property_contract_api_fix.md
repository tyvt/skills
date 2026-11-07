# 物业合同列表接口路径与参数修复
产品2.0 项目修正物业合同列表接口实际路径并注入 B 端当前项目 complexId。

## 修改文件
- property/propertyContract/components/index.vue（列表页）
- property/propertyContract/components/detail.vue（详情页）

## 主要改动
- 列表接口实际路径为 /property/propertyContract/page（moduleName + businessName + apiSuffix）
- 列表页 index.vue 在 getQueryParams 中，B 端（terminalType === 'B'）从全局 store 读取当前选中项目并作为 complexId 传给列表接口
- 该组件被以下页面共用：物业服务合同备案、前期物业服务合同备案、合同变更 / 解聘等

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：35c4f338-b3f4-4660-b726-f1bf15f29ea7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_contract_api_fix",
  "source_extraction_id": "d29ececa168b4f758ad876f7efb26ee0",
  "version": 1,
  "memory_type": "entities"
}
-->
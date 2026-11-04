# xy/detail.vue 框架模式对齐
xy/detail.vue 对齐同目录 end/detail.vue 与 version/detail.vue 的框架模式。
## 顶部改造
- operation-container 改为 operation-btn-group，移除 zs-attachment
- 配置 moduleName: 'prefund'、businessName: 'superviseAgree'、primaryKey: 'regulatoryAgreementId'、permsPrefix: 'zjjg:xy'
## 结构模式
- 外层 zs-form 包裹
- view 模式用 DetailTemplate，打印 zs-print 入 slot 且 :custom-print="true" 受控于 form.bizState
## 验证与归属
- 验证证据：src=产品2.0/067.md
- 涉及文件：supervision/agreement/xy/detail.vue、end/detail.vue、version/detail.vue、xy/components/AgreementDetailsTable.vue、api/zjjg/xy.js 等
- 来源会话：0e5f49e3-e419-41e8-86f5-2009c4cfc14f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "xy_detail_framework",
  "source_extraction_id": "4c9a5b08c29142c6941e338d2fd48101",
  "version": 1,
  "memory_type": "entities"
}
-->
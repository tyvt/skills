# 详情页迁移新版框架operation-btn-group传主键字段名
产品2.0的zhi2-web-admin中，supervision/bank下cbyh/jgwd/wtjgxy三个旧detail.vue迁到新版详情框架，operation-btn-group的primaryKey传字段名而非值。

## 关键约定
- moduleName与businessName是接口路径段（如prefund/workBank），primaryKey传主键字段名（workBankId/bankBranchManageId/entrustSupervisionAgreeId）而非主键值
- 组件放模板顶部只传moduleName/businessName/primaryKey/:form/:biz-state，接@save/@refresh/@update
- 删旧zs-attachment与operation-container，内置附件流程已集成；权限用zs-button的:permission数组而非v-hasPermi
- view模式用DetailTemplate+Headline区块contentInfo/contentInfo2，edit/add用zs-form包zs-input/zs-select

## 业务保留
- 保留cbyh的prefixUrl、isSuzhouzhizai条件字段、YhwdTable子表、WtmcDialog选网点等专有逻辑，只换外壳

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话b653273d改造三个详情页，逐页给出参数
- 涉及文件：supervision/bank/cbyh/detail.vue、jgwd/detail.vue、wtjgxy/detail.vue、maintenance/bank/detail.vue、mixins/detailMixins.js
- 所属项目：产品2.0；来源会话：b653273d-87b4-4092-97cd-01c7ae965dff；代码基线：39e3114

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_detail_migration",
  "source_extraction_id": "67b23d034f0041818d5b4edc1485c979",
  "version": 1,
  "memory_type": "entities"
}
-->
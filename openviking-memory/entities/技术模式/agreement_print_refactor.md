# 监管协议签署打印组件下沉
协议签署与带押过户场景中，公共打印组件已回退，业务逻辑下沉到协议模块专用组件。

## 变更内容
- ZsPrint 移除 regulatoryType / hideTransferOnFullRegulatory 相关逻辑
- OperationBtnGroup 恢复原样
- 新增 agreement/components/AgreementPrint.vue 专用于监管协议签署场景

## 业务规则
- 当 regulatoryType === '2'（全额监管）时，过滤名称包含「自行划转」的打印模板
- 两个详情页均设置 :show-print2="false" 关闭公共打印按钮
- 在 operation-btn-group 插槽内使用 AgreementPrint

## 验证与归属
- 涉及文件：ZsPrint/index.vue、OperationBtnGroup/index.vue、agreement/components/AgreementPrint.vue、agreement/detail.vue
- 所属项目：淮安存量房；来源会话：1380cc44-ab73-4c9b-ad7a-d5b711689e32；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agreement_print_refactor",
  "source_extraction_id": "73aa677d5dcc4c69894037c8c069e86e",
  "version": 1,
  "memory_type": "entities"
}
-->
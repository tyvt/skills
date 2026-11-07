# 申报变更记录详情页头位置修复
信用管理申报变更记录详情页因 operation-btn-group 置于 detail-container 外，页头显示到了页面底部，已修复。

## 问题根因
- 申报变更记录详情页（`creditChangeDeclaration/detail.vue`）将 `operation-btn-group`（标题+返回/附件/流程查看/打印信息）放在 `detail-container` 外的 `list-container` 中
- `.detail-container` 使用 `flex-direction: column-reverse`，容器内页头正常在顶部；外层 `list-container` 为普通纵向布局，页头被排到表单内容下方，出现在页面底部

## 修复方案
- 去掉多余 `list-container` 嵌套，将 `operation-btn-group` 移入 `detail-container`，与同模块其他详情页（如 `creditDeclarationComponents/detail.vue`）保持一致

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/evaluation/creditChangeDeclaration/detail.vue、creditDeclarationComponents/detail.vue、components/OperationBtnGroup/index.vue、evaluation/companyReport/components/detail.vue
- 所属项目：产品2.0；来源会话：7f4c692f-1a01-4348-afe9-003fd8ee2a08；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "credit_header_fix",
  "source_extraction_id": "b837a06438f441dda7f1aae99615b63a",
  "version": 1,
  "memory_type": "entities"
}
-->

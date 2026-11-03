# 子表列与弹窗表单字段共用同一份定义
苏房子表列、查看弹窗与编辑表单的字段清单必须派生自同一份常量/构造器，避免分别维护漂移且列 prop 易错填成相邻字段。

## 问题现象
- 子表表格字段与弹窗字段未按设计图修改，要求字段完全一致
- 子表某列 prop 误写为 `channelInstitution`（相邻字段），实际应为接口字段 `loanDirction`，导致静默展示错数据且不报错

## 根因
- 子表列配置、查看弹窗 contentInfo、编辑表单三者各写一套字段清单，设计稿改一次要改三处，漏一处即不一致
- 列 prop 错填多来自相邻字段手误复制

## 解决方案
- 将该业务字段清单收敛成一份常量/构造器，子表 columns、DetailTemplate items、表单 fieldPlan 均从其派生（既有惯例：build*ContentInfo 构造器 + constants），列只补宽度/对齐等纯展示属性
- 改字段名时列只改 label 与取值映射，prop 必须与接口字段逐字核对，不可凭意思对填写
- 验收时按「同一单据在列表子表 / 详情弹窗 / 编辑表单三处字段序列逐个比对」自检，而非只看设计稿截图

## 验证与归属
- 验证证据：会话 c26c8f38 用户诉求「子表表格字段与弹窗字段未按设计图修改，要求完全一致」；结论「借贷方向列 prop 已从 channelInstitution 改为 loanDirction」
- 涉及文件：d:\repository\产品2.0\zhi2-web-admin\src\views\benefit\pubBankReceiptApply\components\detailTable.vue、d:\repository\产品2.0\zhi2-web-admin\src\views\benefit\components\BankReceiptDetailDialog.vue
- 所属项目：产品2.0；来源会话：c26c8f38-d604-41d2-b12e-edbdfd3c8e06；代码基线：6b9d9d7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subtable_field_shared",
  "source_extraction_id": "864f8e223f1e4bbc8b0262bd6bfcb62d",
  "version": 1,
  "memory_type": "entities"
}
-->
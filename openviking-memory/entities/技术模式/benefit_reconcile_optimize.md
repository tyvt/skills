# 公共收益业务对账界面优化
产品2.0 项目完成公共收益→账务对账→业务对账界面优化，涉及 benefit/pubBankDetailDay 与 benefit/bankDetailDay。

## 搜索表单
- 管理账户：增加 placeholder「请选择管理账户」并显示搜索图标
- 承办银行：设为只读，placeholder「请输入承办银行」（选择管理账户后自动带出）
- 字段顺序调整为：管理账户→承办银行→对账方式→对账状态→记账日期→关键字

## 操作按钮区
- 移除重复的隐藏提示文案
- 按钮文案「手工核销」改为「手工对账」
- 操作按钮右对齐，左侧保留「业务对账列表」标题

## 提示信息框
- 文案：「左侧业务数据为系统平台与银行系统交互数据，右侧银行对账数据为银行对账单数据。只有系统核销后，才可以生成凭证」
- 样式：橙色背景+边框，上下间距8px，左对齐

## 双表布局与来源
- 左右并排展示「业务数据」与「银行对账单数据」，表头、边框、金额右对齐等样式统一
- 涉及文件：benefit/pubBankDetailDay/index.vue、benefit/bankDetailDay/index.vue
- 所属项目：产品2.0；来源会话：a42d5cdd-87c9-4207-ab15-4eaa0e897ab6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_reconcile_optimize",
  "source_extraction_id": "ffd3dd5456804c4ea536ebe90a7ba6e5",
  "version": 1,
  "memory_type": "entities"
}
-->
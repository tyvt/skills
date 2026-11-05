# 资产租赁申请详情表格样式修复
产品2.0 项目修复「资产租赁申请详情」中「资产列表」表格样式问题。

## 问题原因
- 缺少竖线：全局样式 index.scss 中表格竖线仅在 .sub-container 容器内且开启 border 时生效，houseTable.vue 未使用 sub-container 包裹。
- 列间距不足：序号列固定 width=120，其余列未设 min-width，空数据时列宽过窄。

## 修改内容
- houseTable.vue 用 <div class="sub-container"> 包裹表格区域。
- 序号列改为默认宽度 80px。
- 各数据列设置 min-width（编号120、名称150、面积120、位置150、拟租金额140）。
- 「拟租金额」列增加 slot-width=120。
- 该组件也用于合同备案等页面，一并受益。

## 验证与归属
- 所属项目：产品2.0；来源会话：598aac99-dabd-44cd-9cf8-08c0eb4260e3；代码基线：none
- 涉及文件：houseTable.vue、index.scss、zs-table.vue 等

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_table_fix",
  "source_extraction_id": "ec764d6069214ea2adcdb6b65018e194",
  "version": 1,
  "memory_type": "entities"
}
-->
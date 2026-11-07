# zs-table-column宽度计算修复
产品2.0 的 zhi2-web-admin 中 zs-table-column 仅对未写 width 的列按内容计算宽度，修复业务账号列省略号问题。

## 问题根因
- zs-table-column 仅对未写 width 的列动态计算列宽；写了 width 则原样透传固定宽度，不再按内容算 min-width
- guaranteeDepositAccount/index.vue 中「业务账号」列原配置 width:180
- 业务账号为长数字串（如 3205050000000000422），180px 放不下，加 showOverflowTooltip:true 出现 ... 省略

## 已做修改
- guaranteeDepositAccount/index.vue：去掉「业务账号」列 width:180，改由 zs-table-column 按内容计算宽度
- guaranteeDeposit/components/index.vue 同步调整

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：guaranteeDepositAccount/index.vue、zs-table-column.vue、guaranteeDeposit/components/index.vue
- 所属项目：产品2.0；来源会话：c317fddb-86ba-44b7-bf23-24b241e4ba3e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "column_width_fix",
  "source_extraction_id": "c5172269f24c433381c4000831c218d5",
  "version": 1,
  "memory_type": "entities"
}
-->
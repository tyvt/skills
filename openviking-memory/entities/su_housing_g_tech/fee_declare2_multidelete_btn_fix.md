# 物业费简易申报批量删除按钮缺失修复
苏住房G 项目物业费简易申报（feeDeclare2）列表页因自定义 operationButtons 覆盖 mixin 默认批量删除按钮，导致「批量删除」按钮缺失，已补充。

## 问题原因
- `feeDeclare2/index.vue` 自定义 `operationButtons`，只保留「批量导入申报数据」和「一键申报」
- 覆盖了 `table.js` mixin 里默认的 `multiDeleteButton`

## 修复方案
- 在操作按钮区域最前面加入 `multiDeleteButton`，文案为「批量删除」
- 按钮显示在「批量导入申报数据」左侧
- 需先勾选记录才可用；仅「待提交」(`bizState == '0'`) 可勾选删除，其他状态不可选
- 删除前弹确认框，确认后调用 `/property/feeDeclare2/{ids}` 接口

## 验证与归属
- 涉及文件：`feeDeclare2/index.vue`、`table.js`、`main.js`、`ListOperationButtonContainer/index.vue`
- 所属项目：苏住房G；来源会话：8f5a7920-d8cf-4d5f-87f8-e65dc0975dae；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "fee_declare2_multidelete_btn_fix",
  "source_extraction_id": "7df15038cece4f95bd450f7119a4cdf0",
  "version": 1,
  "memory_type": "entities"
}
-->
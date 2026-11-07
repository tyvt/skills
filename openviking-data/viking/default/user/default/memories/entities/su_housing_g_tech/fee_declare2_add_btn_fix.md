# 物业费简易申报新增按钮缺失修复
苏住房G 项目物业费简易申报（feeDeclare2）列表页因自定义 operationButtons 未包含 mixin 默认新增按钮，导致「新增」按钮不显示，已修复。

## 问题原因
- `feeDeclare2/index.vue` 自定义了 `operationButtons`，仅放置「批量导入申报数据」和「一键申报」
- 未带上 mixin 里默认的 `this.addButton`（「新增」按钮）

## 修复方案
- 在操作按钮列表最前面补回 `this.addButton`，权限标识为 `property:feeDeclare2:add`
- 点击后跳转新增页；刷新列表页应能看到「新增」按钮
- 若仍不显示，检查当前账号是否拥有 `property:feeDeclare2:add` 权限

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：`feeDeclare2/index.vue`、`detail.vue`、`bankReceiptApply/index.vue`
- 所属项目：苏住房G；来源会话：f4e0ac7d-a0ef-4129-865f-513d5d38a34d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "fee_declare2_add_btn_fix",
  "source_extraction_id": "7df15038cece4f95bd450f7119a4cdf0",
  "version": 1,
  "memory_type": "entities"
}
-->
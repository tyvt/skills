# 监管项目备案子表弹窗修复
苏州市房地产监测V3 项目修复了监管项目备案子表弹窗 `SupervisionAddDialog.vue` 点确定不消失的问题。

## 原因说明
- `regulatorStandard` 在 rules 必填但模板无对应 el-form-item，校验失败无提示
- 列表接口返回 `regulatoryStandard` 而表单用 `regulatorStandard`，编辑时字段为空卡校验
- 金额输入未失焦导致模型值未同步
- 提交覆盖 `priceRecordId` 为 undefined 致接口失败弹窗不关

## 已做修改
- 打开时 `normalizeFormFromRow` 合并默认值并做字段映射
- 版本校验绑在「版本名称」
- 提交前触发 blur 同步 v-money 字段
- 修复 `priceRecordId` 声明与赋值逻辑

## 归属信息
- 所属项目：苏州市房地产监测V3
- 来源会话：e88f9902-f489-41f1-a8b8-9ae1ba2925b4
- 涉及文件：`SupervisionAddDialog.vue`、`SupervisionTable.vue`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervision_dialog_fix",
  "source_extraction_id": "8ac21a9135c44085aa6571c2f9166d98",
  "version": 1,
  "memory_type": "entities"
}
-->
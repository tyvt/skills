# 业主开户详情账户类型显示数字修复
园区公共收益项目修复业主开户详情页「账户类型」显示数字的问题，改用 `ACCOUNT_TYPE` 字典。

## 问题原因
- `OpenDetailDialog.vue` 的 `initDict()` 原使用 `/maintenance/acctype/list`（`dictValue` 为 `acctypeId`）
- `form.accountType` 存的是 `acctypeVal`（如 `50`），选项 `dictValue` 与字段值不一致
- `DetailTemplate` 的 `tag` 匹配失败后回退显示原始数字

## 修复内容
- 将账户类型选项改为使用 `ACCOUNT_TYPE` 字典：`this.getDicts('ACCOUNT_TYPE').then(...)` 赋值 `accountTypeOptions`
- 修改位置约 238:240 行

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/OpenDetailDialog.vue
- 所属项目：园区公共收益；来源会话：3ef9c696-10c0-4826-b1f5-80042dfc681b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "open_acctype_fix",
  "source_extraction_id": "7b233f10022e4baea6cc408744781873",
  "version": 1,
  "memory_type": "entities"
}
-->
# 承办银行网点详情回显修复
苏州市房地产监测V3 的承办银行网点子表查看/编辑详情回显已修复，涉及 `YhwdDialog.vue` 与 `YhwdTable.vue`。

## 修改内容
- `YhwdDialog.vue` 新增 `detailApiFull` 动态指向 `/prefund/bankBranch/detail` 或 `/estate/mfBankBranch/detail`
- 新增 `loadDetail(bankBranchManageId)`：查看/编辑时调详情接口填充表单
- 新增 `normalizeFormValues()`：将 `isStart`、`isSupervisionBank` 转字符串保证单选框回显
- 重构 `onOpen()`：新增仅 `resetForm()`+注入银行名；查看/编辑 `resetForm()` 后调 `loadDetail()`，无 ID fallback 列表行数据
- `YhwdTable.vue` 的 `handleView`/`handleUpdate` 对行数据浅拷贝 `{...row}`，`$nextTick` 后再开弹窗避免 prop 未更新触发 `@open`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 在银行网点子表分别点查看/编辑，确认网点名称、联行号、地址、联系人等字段回显
- 所属项目：苏州市房地产监测V3；来源会话：224ebc32-0868-4266-a756-0afa83014b18
- 涉及文件：`cbyh/components/YhwdDialog.vue`、`cbyh/components/YhwdTable.vue`、`api/jgyh/yhwdgl.js`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "yhwd_dialog_fix",
  "source_extraction_id": "638fb30e6cd94513816c8de2632f1313",
  "version": 1,
  "memory_type": "entities"
}
-->
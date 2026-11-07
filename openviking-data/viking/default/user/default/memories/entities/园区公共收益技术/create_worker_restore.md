# 恢复登记详情创建工作人员按钮
园区公共收益项目在登记详情页（detail.vue、directDetail.vue）恢复了「创建工作人员」按钮及跳转逻辑。

## 修改内容
- 在「公示」按钮后增加「创建工作人员」按钮
- 显示条件：`formMode != 'add' && form.committeeVersionId && form.bizState == 2`（仅已备案详情显示，待提交不显示）
- 恢复 `goCreateCommitteeWorker()`，跳转到业委会工作人员新增页并带上 `committeeId`、`complexId` 等 query
- `directDetail.vue` 同样恢复按钮与 `goCreateCommitteeWorker()`，行为与登记详情一致

## 未恢复内容
- 未恢复 9 月提交中删掉的自定义「返回」、「物管会类型」等字段，仅恢复工作人员入口

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：zhi2-web-admin/src/views/autonomy/record/components/detail.vue、directDetail.vue
- 所属项目：园区公共收益；来源会话：16feeb76-4fb6-4182-823c-4dd71eb00369；代码基线：none
- 关联 bug1282，建议在已备案（bizState=2）物管会/业委会登记详情页显示按钮

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "create_worker_restore",
  "source_extraction_id": "7b233f10022e4baea6cc408744781873",
  "version": 1,
  "memory_type": "entities"
}
-->
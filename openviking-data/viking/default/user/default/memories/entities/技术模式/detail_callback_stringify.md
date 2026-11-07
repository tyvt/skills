# detail_callback_stringify
组织工作人员详情页字典字段显示数字而非文案时，通过 detailCallback 字符串化归一并兜底选项的技术修复。
## 问题原因
- 接口返回 number/混型，而 el-select/字典 options 的 value 为字符串，=== 匹配失败回退显示原值。
- 异步字典列表未加载时 options 为 undefined 加剧错显。
## 修复做法
- 在 detailCallback 入库前将 status、jobType、sex 等字典绑定字段 String() 归一。
- statusOptions 等异步字典列表用 || [] 兜底。
- 字段口径未与后端确认（如 businessType vs accountType）时回退错误改动，只保留字典展示修复，避免误链 committeeVersionId。
## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：dd85a874 诉求4「当前状态显示了数字0」、诉求5-6 要求回退 BusinessType 改动，最终保留字符串化与兜底。
- 涉及文件：zhi2-web-admin/src/views/autonomy/ownerCommitteeWorker/detail.vue
- 所属项目：园区公共收益；来源会话：dd85a874-0175-478e-81cc-c4afa02d3b86；代码基线：635e747

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_callback_stringify",
  "source_extraction_id": "04f44256a020407aa30d82b50cc89746",
  "version": 1,
  "memory_type": "entities"
}
-->
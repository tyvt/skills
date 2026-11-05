# 月报导入成功提示重叠修复
苏住房G 项目修复了月报导入成功提示与详情页重复弹窗重叠的问题。

## 修复内容
- zs-import.vue 新增 silentSuccess 属性：默认false，成功时若 true 跳过组件内默认 msgSuccess
- ReportImportDialog.vue 月报导入专用配置：:silent-success="true" 避免重复弹窗，:auto-close="false" 由 handleImportSuccess 手动关闭
- detail.vue 单条提示：使用 this.$message({offset:80}) 替代 msgSuccess（全局 offset:300），提示显示在顶栏下方不遮挡基本信息

## 验证与归属
- 涉及文件：zs-import.vue、ReportImportDialog.vue、property/complex/detail.vue、publicQuery/monthlyReport/detail.vue 等
- 所属项目：苏住房G；来源会话：6d8979fc-de82-4dd7-a47a-65cec5d98ae6；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "monthly_import_fix",
  "source_extraction_id": "b555c8349a924ea8baf9720c753e2722",
  "version": 1,
  "memory_type": "entities"
}
-->
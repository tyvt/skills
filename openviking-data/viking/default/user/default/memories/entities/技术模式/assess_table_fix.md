# 综合查询页表格表头修复
苏住房G 项目 credit/assessment/search.vue 修复了表头省略、表头与数据列错位及考评周期列过宽问题。

## 修复内容
- 表头不再省略：动态考评列由 div 插槽改为 span 渲染，按文字长度设 minWidth 至少100px，避免被截断
- 表头与数据列错位修复：先加载考评列再请求列表数据，表格加 :key="tableColumnsKey" 重建，数据加载后 doLayout() 重新布局
- 考评周期列收窄：固定 width:220 改为 minWidth:100，适配短文本

## 验证与归属
- 涉及文件：credit/assessment/search.vue、publicQuery/assessment/index.vue 等
- 所属项目：苏住房G；来源会话：6c3d92d7-7d4f-47a5-a873-d3825a9cd6b4；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "assess_table_fix",
  "source_extraction_id": "b555c8349a924ea8baf9720c753e2722",
  "version": 1,
  "memory_type": "entities"
}
-->
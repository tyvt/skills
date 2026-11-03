# zs-table-column 插槽根节点 div 致复杂列定宽截断
综合查询页动态考评列列表头显示成「物业...」，因插槽用 div 被判定复杂列固定宽 80px，且动态列异步追加致错位。

## 问题根因
- zs-table-column 按插槽内容根节点判断复杂列，用 <div> 包裹即进复杂列分支，列宽固定约 80px，表头被截。
- 动态列在 mounted 里异步追加、列表数据先渲染，造成表头与 tbody 列错位。
- 与「窄屏列宽被省略/内容最宽优先」根因不同（那条在宽度测算算法），与「列宽抖动补三处重测」也不同（那条靠重测非 :key 重建）。

## 解决方案
- 插槽内换 <span> 渲染，按表头文字长度设 minWidth（至少 100），不写死 width。
- 改为先加载完列配置再发列表请求，表格加 :key="tableColumnsKey" 让列集合变化时整表重建，数据回填后调 doLayout()。
- 考评周期等短文本列用 minWidth 100 而非固定 width 220，避免挤占剩余均分空间。

## 验证与归属
- 验证证据：会话 6c3d92d7（基线 864b409）用户反馈表头省略、表格错位，改 <span>+minWidth≥100、先加载列再请求数据+:key+doLayout、考评周期 width220→minWidth100。
- 涉及文件：zhi2-web-admin/src/views/credit/assessment/search.vue。
- 所属项目：苏住房G；来源会话ID：6c3d92d7-7d4f-47a5-a873-d3825a9cd6b4；代码基线：864b409

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_slot_div",
  "source_extraction_id": "b318b5f0cb1c4578bf248ffcf2cf1f85",
  "version": 1,
  "memory_type": "entities"
}
-->
# 月报三级树表占位空列导致合并错乱
在苏住房G项目(zhi2-web-admin)物业管理信息月报表填报/统计详情，手工渲染3级树表用placeholder空列补位，造成单元格合并错位。
## 根因
- 展平树时为凑固定列数给前缀节点补empty-cell，再用rowspan合并非末级
- 根级节点下深度不一致(有的3级有的2级)时，实际节点数+placeholder数算出不同可见列数，rowspan累积后与表头错位
- 区别于已知#944(zs-table-column不支持多级表头)，本条是行内单元格列数守恒口径
## 解决方案
- 删掉placeholder/empty-cell逻辑，仅遍历真实路径节点
- 每行末级可见单元格算colspan：1级=3、2级=2、3级=1；模板:colspan="cell.colspan||1"
- 验证逐行断言各单元格colspan之和===表头列数
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：会话871272e2，⛵送立案线索数量colspan:2无右侧空列；信托制物业服务项目数colspan:3横跨3列
- 涉及文件：src/utils/monthlyReport.js、src/views/publicQuery/monthlyReport/components/ReportItemsTable.vue、src/views/publicQuery/monthlyReportStat/detail.vue
- 所属项目：苏住房G；来源会话：871272e2-4c46-4ece-af72-9c897a51118e；代码基线：8ebcdab

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "tree_table_colspan",
  "source_extraction_id": "3c7e2243800241628db95ed98f7b1f96",
  "version": 1,
  "memory_type": "entities"
}
-->
# 月报统计填报单元格合并修复
苏住房G月报模块修复了单元格合并错误，通过动态计算colspan移除占位空列。

## 修复内容
- monthlyReport.js：移除 placeholder 空列逻辑，仅遍历实际路径节点；为末级可见单元格计算 colspan（1级:3, 2级:2, 3级:1）。
- ReportItemsTable.vue 与 monthlyReportStat/detail.vue：层级 td 增加 :colspan="cell.colspan || 1"，移除 placeholder/empty-cell 逻辑。

## 验证结果
- 示例数据验证：「移送立案线索数量」colspan:2，不再出现右侧空白。

## 涉及文件与归属
- 文件：src/utils/monthlyReport.js、src/views/publicQuery/monthlyReport/components/ReportItemsTable.vue、src/views/publicQuery/monthlyReportStat/detail.vue。
- 所属项目：苏住房G；来源会话：871272e2-4c46-4ece-af72-9c897a51118e；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "monthly_report_colspan_fix",
  "source_extraction_id": "aa5097d2d987484dac22db483d630023",
  "version": 1,
  "memory_type": "entities"
}
-->
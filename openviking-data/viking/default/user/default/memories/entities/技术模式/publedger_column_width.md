# 物业管理区域统计表格列宽修复
淮安物管「公共查询 > 物业管理区域统计」页面表格排版优化及列宽计算逻辑修复。

## 问题根因
- `zs-table-column` 组件按表头字数自动计算列宽（字数×16+30），短表头列宽仅约62px，内容被省略。
- 页面配置的 `minWidth` 被该逻辑覆盖，导致「街道」「社区」等列内容挤压成省略号。

## 修复方案
- 修改 `zs-table-column.vue`：列已显式设置 `width` 或 `minWidth` 时，不再按表头字数覆盖，保留页面配置宽度。
- 调整 `pubLedger/index.vue` 各列从 `minWidth` 改为固定 `width`：行政区域120px、街道/社区150px、物业管理区域200px、企业授权情况280px、合同录入情况220px、楼幢授权数量150px、公共收益相关列220–240px，总宽约1950px出现横向滚动条。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管；来源会话：a929e818-7ba0-4b2b-9b44-a7b2c823c54c
- 涉及文件：src/views/publicQuery/complex/index.vue、src/views/property/pubLedger/index.vue、src/mixins/ListTemplate.js、src/components/zs-table-column.vue
- 所属项目：淮安物管；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publedger_column_width",
  "source_extraction_id": "646f1b9c3c7843d3847a9e39d6cf03e2",
  "version": 1,
  "memory_type": "entities"
}
-->
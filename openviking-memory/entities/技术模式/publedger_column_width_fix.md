# 物业管理区域统计页面排版优化
淮安物管「公共查询 > 物业管理区域统计」(pubLedger) 页面表格排版优化，解决内容被压缩省略问题。

## 问题根因
- zs-table-column 组件按表头字数自动算列宽（字数×16+30），短表头（如「街道」「社区」）列宽仅约62px，内容被省略
- 页面配置的 minWidth 被该逻辑覆盖

## 修复内容
- zs-table-column.vue：列已显式设置 width 或 minWidth 时不再按表头字数覆盖，保留页面配置宽度
- pubLedger/index.vue：各列从 minWidth 改为固定 width（行政区域120px、街道/社区150px、物业管理区域200px、企业授权情况280px、合同录入情况220px、楼幢授权数量150px、公共收益相关列220–240px，总宽约1950px），超出屏幕出现横向滚动条，悬停 tooltip 查看完整内容

## 验证与归属
- 验证：extracted source=cursor session=a929e818-7ba0-4b2b-9b44-a7b2c823c54c
- 涉及文件：src/views/publicQuery/complex/index.vue、src/views/property/pubLedger/index.vue、src/mixins/ListTemplate.js、src/components/zs-table-column.vue
- 所属项目：淮安物管；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publedger_column_width_fix",
  "source_extraction_id": "c8bacbb78d664da6a3d9afe7a9815878",
  "version": 1,
  "memory_type": "entities"
}
-->
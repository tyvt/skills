# zs-table-column 按表头字数算列宽覆盖配置
淮安物管 zhi2-web-admin 中 zs-table-column.vue 按表头字数自动计算列宽并覆盖显式 minWidth，导致 pubLedger 短表头列内容挤压。
## 问题现象
- zs-table-column.vue 以「字数×16+30」按表头字数自动算列宽，并覆盖组件传入的 minWidth。
- pubLedger/index.vue 短表头列因被自动算宽挤压，内容显示拥挤。
## 修复方案
- 修改 zs-table-column.vue，保留页面显式设置的 width / minWidth，不再强制覆盖。
- 在 pubLedger/index.vue 将相关列改为固定 width。
## 涉及文件
- zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue
- zhi2-web-admin/src/views/property/pubLedger/index.vue
## 验证与归属
- 所属项目：淮安物管
- 验证证据：extracted source=cursor project=淮安物管
- 来源会话：a929e818-7ba0-4b2b-9b44-a7b2c823c54c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_column表头字数算列宽",
  "source_extraction_id": "14c4f7c09ae048a298848ab2771b6290",
  "version": 1,
  "memory_type": "entities"
}
-->
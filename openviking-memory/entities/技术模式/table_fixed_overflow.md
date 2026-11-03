# 表格固定列层级过高未裁剪覆盖按钮栏
zs-table.vue 固定列 z-index 高于 OperationBtnGroup 按钮栏且缺裁剪，导致溢出穿屏覆盖按钮栏。
## 问题根因
- zs-table.vue 固定列 z-index 高于按钮栏且缺 overflow 裁剪
- 固定列溢出覆盖 OperationBtnGroup 按钮栏
## 解决方案
- zs-table.vue 增 isolation: isolate 与 overflow: hidden
- 按钮栏 z-index 调至 14
- contractInfoTable.vue 数据加载后调用 doLayout()
## 验证与归属
- 验证：extracted source=cursor session=987eab2e-2440-4e1e-bd45-6e4bd72a5860
- 涉及文件：zhi2-web-admin/src/views/maintenance/contractGuard/detail.vue、contractInfoTable.vue、paymentRatioTable.vue、components/zs-operate-column/zs-operate-column.vue、components/zs-table/zs-table.vue、styles/element-ui.scss、styles/index.scss、Headline/index.vue
- 来源会话：987eab2e-2440-4e1e-bd45-6e4bd72a5860；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_fixed_overflow",
  "source_extraction_id": "1f3d457236504fd2a187c4485380c4c8",
  "version": 1,
  "memory_type": "entities"
}
-->
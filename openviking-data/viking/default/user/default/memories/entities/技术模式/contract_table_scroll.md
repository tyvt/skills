# 维修资金合同明细表格固定列穿屏
维修资金合同/报价单管理详情页，合同明细表格滚动后操作列穿屏叠加在顶部按钮与付款比例表格之上。

## 问题根因
- 带「小计」行的表格（show-summary）将固定操作列 z-index 提升至 12，而详情页顶部按钮栏仅 11，操作时操作列叠在按钮之上
- 列表页 .list-card 对固定列做了 overflow:hidden，详情页 Headline 容器为 overflow:visible，固定列易溢出表格区域
- contractInfoTable 自定义 getList 后未调用 doLayout()，多行时固定列高度/滚动不同步

## 解决方案
- zs-table.vue：表格容器增加 isolation:isolate 独立层叠上下文，固定列增加 overflow:hidden 限制操作列在表格内
- OperationBtnGroup/index.vue：顶部按钮栏 z-index 从 11 调整为 14，始终高于固定列
- contractInfoTable.vue：数据加载完成后调用 doLayout() 刷新布局

## 验证与归属
- 所属项目：泰兴G
- 验证：extracted source=cursor session=987eab2e-2440-4e1e-bd45-6e4bd72a5860
- 涉及文件：zhi2-web-admin/src/views/maintenance/contractGuard/detail.vue、components/contractInfoTable.vue、zs-table.vue、OperationBtnGroup/index.vue
- 来源会话：987eab2e-2440-4e1e-bd45-6e4bd72a5860；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_table_scroll",
  "source_extraction_id": "45146488f5bd4e3b8e06716675a0c458",
  "version": 1,
  "memory_type": "entities"
}
-->
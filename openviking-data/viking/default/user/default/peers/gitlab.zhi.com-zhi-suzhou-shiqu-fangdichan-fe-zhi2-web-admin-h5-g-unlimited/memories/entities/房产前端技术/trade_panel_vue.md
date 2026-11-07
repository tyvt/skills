# TradePanel.vue 交易面板组件
marketMonitor 仪表盘中展示商品住房与存量住房交易数据的镜像面板 Vue 组件。

## 位置与结构
- 文件路径：zhi2-web-admin/src/views/property/marketMonitor/components/TradePanel.vue
- 左面板「商品住房」使用 blue 主题色（border-blue-100/80）
- 右面板「存量住房」使用 emerald 主题色（border-emerald-100/80）
- 两面板为镜像布局，类名应完全一致，仅主题色 token 不同

## 关联布局
- 父组件 index.vue 的 row1 为 12 列网格
- trade-panel 占 lg:col-span-8，右侧 agency 与 area-structure 占 lg:col-span-4

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "房产前端技术",
  "name": "trade_panel_vue",
  "source_extraction_id": "246c22d64e0945c6a186d80a2bcd1938",
  "version": 1,
  "memory_type": "entities"
}
-->
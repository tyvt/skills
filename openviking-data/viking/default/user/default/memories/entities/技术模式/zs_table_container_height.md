# zs-table选择弹窗末行裁切与重置停留底部修复
在ScopeSelectDialog内嵌zs-table时，默认table-tr算高导致末行被裁切，且搜索重置后scrollTop未归零使列表停在底部。

## 问题根因
- 用默认table-tr算高（行数×48+表头+1+横向滚动条）比外层overflow:hidden容器略高，末行永久被裁切
- 数据重载（搜索/重置/翻页/勾选楼幢）后el-table内部scrollTop保留，列表停在底部

## 解决方案
- zs-table新增opt-in containerHeight（>0时el-table高度精确等于容器，默认0不影响其余调用方）
- 数据重载后调用setScrollTop(0)
- 弹窗侧用updateContainerHeight()替代仅调table-tr旧逻辑
- depositNotice/company与accountOpen/owner的ScopeSelectDialog需同款改造

## 验证与归属
- 验证：用户报「搜索后重置列表滑到底显示不全」；归因table-tr溢出与未归零scrollTop，已修复
- 涉及文件：src/components/zs-table/zs-table.vue、src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue、src/views/maintenance/depositNotice/company/components/ScopeSelectDialog.vue
- 所属项目：园区公共收益；来源会话：42fa15c9-0259-40e7-af26-00a4b75a3f00；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_container_height",
  "source_extraction_id": "2c504ba9bfd644fe8073772a4088d137",
  "version": 1,
  "memory_type": "entities"
}
-->
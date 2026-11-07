# 选择弹窗 125% 缩放下末行滚不到
zs-select-dialog（及 func 版）在浏览器缩放 125% 时 pageSize=10 的数据最后一条滚动不到，根因为 tableTrCount 写死与行高偏差。

## 问题根因
- tableTrCount 写死为 8 而 pageSize 默认 10，表格高度按 8 行算却展示 10 行，被迫在表格内部滚动
- 125% 缩放下固定 48px 行高与实际渲染高度有偏差，Element UI 表格内部滚动 maxScrollTop 偏小，最后一行永远滚不到
- .dialog-right 是 flex 布局，表格容器被压缩加剧问题

## 解决方案
- tableTrCount 改为 min(实际行数, pageSize)，按实际行数算高度避免表格内滚
- 数据加载后调用 doLayout() 重新布局
- 给 .zs-table-container 设 flex-shrink:0 防被压缩
- zs-table 层改用 DOM 实测行高/表头高度计算表格高度以兼容缩放，首次渲染后二次校准，窗口缩放时重算高度
- 修改要同步 zs-select-dialog.vue 与 zs-select-dialog-func.vue 两个副本

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- tableTrCount 写死 8 与 pageSize 10 不符 + 125% 缩放下 maxScrollTop 偏小 + flex 压缩；修复为 min(行数,pageSize)、doLayout、flex-shrink:0、DOM 实测行高二次校准
- 涉及文件：zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue、zs-select-dialog.vue、zhi2-web-admin/src/components/zs-table/zs-table.vue
- 所属项目：产品2.0；代码基线：dfe69d6；来源会话：319f1f67-a4c9-4880-b1fc-1857c5d03b4b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_select_scroll",
  "source_extraction_id": "339530474fdc41989e139e610acb727b",
  "version": 1,
  "memory_type": "entities"
}
-->
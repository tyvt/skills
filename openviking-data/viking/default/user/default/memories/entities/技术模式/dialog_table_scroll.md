# 弹窗内表格双滚动条的根因与修复
弹窗里表格出现外层弹窗滚、表格不滚的双滚动条，多半是自绘表格没走公共 zs-select-dialog，改用公共组件后高度自适应。

## 问题现象
- 「提取楼幢」弹窗右侧出现两个滚动条，但表格内部本身没有内容超出
- 期望：表格高度自适应，上方项目或地块编号固定顶部，下方页签固定窗口底部，滚动条只在表格内

## 根因
- 自绘表格容器未参与弹窗高度分配，按内容自然撑高把弹窗撑出可滚动区
- 表格溢出被压住看不到表尾数据；本项目老问题，弹窗内表格或楼盘表必须走公共选择弹窗组件

## 修复做法
- 楼盘表或选择类弹窗统一用 zs-select-dialog（可加 building-table-mode 固定尺寸），不要页面自绘
- 公共组件自带固定头尾加内部滚动区布局：上方固定、表格区内部滚动、下方页签固定底部
- 弹窗内表格禁止被压缩（flex-shrink: 0）并保证可横向滚动，否则列被裁掉
- 改完真机或浏览器验证滚动位置，并同步到同类弹窗

## 验证与归属
- 来源会话 session-2627b7f9-4768-41fe-9dce-865dad493f52（基线 235e6ee）
- 子模块提交 2935fcb928（楼幢导入弹窗修复 3 个文件）
- 涉及 ExtractDialog.vue、zs-select-dialog.vue、zs-dialog.vue、zs-table.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_table_scroll",
  "source_extraction_id": "34b9df83b44044cdbe3cd35475c05a76",
  "version": 1,
  "memory_type": "entities"
}
-->
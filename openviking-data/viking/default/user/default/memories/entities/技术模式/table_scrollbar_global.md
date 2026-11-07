# 表格横向滚动条全局常显规则
苏住房G 中表格横向滚动条需始终显示时，必须落到 styles/index.scss 全局规则且横向单独放宽。

## 问题根因
- 原样式写在 .el-table__body-wrapper:hover::-webkit-scrollbar-thumb，仅指针真落轨道/滑块附近才算 hover 命中。
- 指针在表体其它位置或表头/固定列时滑块透明，视觉上只有靠近滚动条才显示。

## 解决方案
- 在 styles/index.scss 既有 hover 规则后追加：.el-table__body-wrapper 与 .el-table__header-wrapper 横向轨道保持 10px，横向滑块非 hover 也给 rgba(0,0,0,0.2)。
- 纵向继续沿用原 hover 规则；选择器挂类上，所有 zs-table/el-table 列表一次生效，不逐页加 scoped。
- 已知边界：:horizontal 仅 Chromium/Edge 生效，Firefox 需另加 scrollbar-color（同时影响纵向，需产品确认）。

## 验证与归属
- 验证：会话 b7218710（基线 9e5c499）用户要求横向滚动条始终展示；改 index.scss 全局规则并说明纵向保留 hover。
- 涉及文件：styles/index.scss、system/regionBankAuth/index.vue；所属项目：苏住房G。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_scrollbar_global",
  "source_extraction_id": "0636d5a52f5e4109813cca86a9966dbb",
  "version": 1,
  "memory_type": "entities"
}
-->
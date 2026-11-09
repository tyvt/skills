# 楼盘表状态统计弹窗样式修复
苏州市房地产监测V3 楼盘表页「状态统计」弹窗（LpbStatisticsDialog.vue）修复文字换行、行高过窄、未居中三个问题。

## 问题根因
- 表头「面积(㎡)」「套数(套)」因列宽不足被折成两行
- el-table 用 size="small" 且行 padding:9px，行高过窄显得拥挤
- el-dialog 用 top="6vh" 贴顶，未做垂直居中

## 修复方案
- 表头与单元格加 white-space:nowrap，强制单行不换行
- 行内边距改为 12px、表头高 40px、内容区 min-height:200px
- 移除 top，新增非 scoped 样式用 .el-dialog__wrapper:has(> .lpb-statistics-dialog) 弹性居中；老内核（Chromium<105）用 html.no-has-support 标记回退到 8vh

## 验证与归属
- 验证：生产构建通过（npm run build exit 0）、ESLint 0 error、首屏渲染确认表头单行/行高舒适/弹窗居中
- 提交：子模块 zhi2-web-admin 提交 10571ec 推 origin/develop/v3.0.0；父仓库 gitlink 提交 a72cac1 快进推送
- 涉及文件：zhi2-web-admin/src/views/projectManagement/buildingTable/components/LpbStatisticsDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：2026-11-09 修复任务

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "lpb_dialog_fix",
  "source_extraction_id": "77369dcd8a3f49688bdec4e1ea2e2dd6",
  "version": 1,
  "memory_type": "entities"
}
-->
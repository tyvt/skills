# zs-import 成功提示与页面提示重叠修复
公共导入组件 zs-import 与宿主页面成功提示重叠，通过 silentSuccess + auto-close 分工解决。

## 问题根因
- 情况：zs-import 成功后自身 msgSuccess，宿主弹窗/详情页在导入成功后又提示「导入成功，请确认数据后保存」，两条 toast 同屏叠加。
- 全局 msgSuccess 默认 offset:300，提示块压在页面上部字段区（物业管理信息月报表填报月份被遮）。
- 根因：重叠非样式问题，是「谁负责成功提示+谁负责关弹窗」职责重叠，成功回调既有组件内提示又有页面提示。

## 解决方案
- 给 zs-import 新增 silentSuccess prop（默认 false），成功时跳过组件内 msgSuccess，不影响其它导入页。
- 导入弹窗传 :silent-success="true" 并改 auto-close=false，由页面 handleImportSuccess 确认后手动关闭，避免先关弹窗再提示时序问题。
- 页面侧改用 this.$message({ offset: 80 })，提示落顶栏下方不再遮挡首个信息区块；校验失败仍走 msgError、无数据仍走 msgWarning。

## 验证与归属
- 验证证据：会话 6d8979fc（基线 320507d）物业管理信息月报表详情上传 Excel 后提示重叠，改动后成功只一条提示位于页面顶部。
- 涉及文件：zhi2-web-admin/src/components/zs-import/zs-import.vue；zhi2-web-admin/src/views/publicQuery/monthlyReport/components/ReportImportDialog.vue；zhi2-web-admin/src/views/publicQuery/monthlyReport/detail.vue；zhi2-web-admin/src/utils/index.js
- 所属项目：苏住房G；来源会话ID：6d8979fc-de82-4dd7-a47a-65cec5d98ae6；代码基线：320507d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_import_silent",
  "source_extraction_id": "e592ee3a3b1f492981b1f3ffdc20f2ce",
  "version": 1,
  "memory_type": "entities"
}
-->
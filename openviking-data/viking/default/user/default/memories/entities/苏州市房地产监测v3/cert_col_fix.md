# 专业资格证书管理表格列溢出与卡顿修复
修复了苏州市房地产监测V3中「专业资格证书管理」页面的表格列溢出遮挡与卡顿问题。

## 问题根因
- 遮挡：测算列使用 overflow: visible，列宽偏窄时长文案（如发证机关）画到下一列，看起来像重影叠字。
- 卡顿：每列对整表做 DOM 扫行测宽，字典加载后再测一遍，反复触发 doLayout / 列宽均分；证书列表列多，开销大。

## 修复方案
- zs-table-column：普通 prop / dict / link 列不再扫 DOM，只用文本测算宽度，恢复 tooltip。
- element-ui.scss / index.scss：测算列改为隐藏溢出 + 省略号（悬停 tooltip 看全文）。
- zs-table：列宽均分增加约 16ms 合并，避免多列同时触发多次布局。

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zs-table-column.vue、element-ui.scss、index.scss、zs-table.vue、personnelCertificate/index.vue、mixins/table.js。
- 所属项目：苏州市房地产监测V3；来源会话：b1715cba-74d5-4dce-8f3b-36a679a8e083。
- 验证：硬刷新（Ctrl+F5）后交互更顺，列不再互相压住；个别列仍偏窄可悬停看全文或加 min-width。

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3",
  "name": "cert_col_fix",
  "source_extraction_id": "844cdb82624f4fef9399a4f794b17314",
  "version": 1,
  "memory_type": "entities"
}
-->
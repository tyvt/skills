# ref8443填报日期日期选择器添加
苏住房C H5 ref8443 汛前检查「填报日期」字段缺失日期选择弹窗与右侧日历图标的根因排查与修复（2026-11-06）。

## 问题根因
- 现象：填报日期为只读 `<input>`，无日期选择弹窗、无右侧日历图标（用户于消息0反馈）
- 根因：`c164dfe` 提交仅改动 `theme.css`（标准模板 `.date-input` 图标），未触及 ref8443 组件；ref8443 填报日期始终为纯只读 input

## 修复方案
- `Ref8443Inspection.vue`：填报日期由只读 `<input>` 改为 `<picker mode="date">` 包裹，点击弹出原生日期选择器；右侧加 `calendar.svg` 图标；日期以 `YYYY/MM/DD` 展示，选择后回填
- `ref8443.css`：新增 `.ref-date-input`（flex 两端对齐）、`.ref-date-text`（占满左侧）、`.ref-date-icon`（固定右侧 16×16）样式；`.ui-ref8443 uni-picker{display:block;width:100%}` 使选择器撑满
- 默认日期值 `2026-10-24`，computed `dateText` 将 `-` 转为 `/`

## 验证与归属
- 验证：测试环境 8095 实测日历图标显示、日期显示 2026/10/24、点击弹出日期选择器（年月日三列+取消/完成，定位 2026-10-24）均通过
- 本地提交 `3c166a5`，合并 `dev` 为 `6a5fab9`；独立 worktree 完成/合并/删除，主工作区干净
- `dist` 已用本版本测试产物覆盖并部署到 nginx 8095
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：2026-11-06 消息0-61

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_date_picker_add",
  "source_extraction_id": "8c2c02dc4e7a498e99bd4aa8234a8031",
  "version": 1,
  "memory_type": "entities"
}
-->
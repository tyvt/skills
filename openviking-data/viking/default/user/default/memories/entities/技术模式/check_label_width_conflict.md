# check 脚本禁 label-width 与历史口径冲突
npm run lint 当前整体失败，check:label-width 禁一切 label-width 与 2026-09-23 要求搜索区显式 70px 防换行互相打架。

## 实测结果
- npm run lint 为 eslint 加 7 个 check 脚本串行；当前整体失败不可写“通过”
- label-width 退出码 1（11 文件）、amount-input-placeholder 1（1 处）、dialog-picker-suffix 1（5 处），其余 0
- 扫描规模：dialog-form-layout 扫 2236 Vue 文件、dialog-double-effective 扫 123 双列弹窗

## 口径冲突
- check:label-width 禁模板一切 label-width，但旧记忆要求搜索区显式 70px 防换行
- 11 处命中混两类（真违规 + 按旧口径该保留），修一条必破另一条，口径未定前不批量改
- 例外：label-width="0px" 承担布局语义（去标签宽度占满控件）不能删
- 同页“窄容器三列+label-width=auto”与“编辑/查看态两套配置”是不同根因不混谈

## 文档规范
- 写验证文档如实报告每个脚本退出码与命中数，不美化为 lint 通过
- 命中数区分两类混合，台账显式标冲突（如 E-004 与 E-019 互引标“口径未定前修一条必破另一条”）

## 验证与归属
- 来源会话 416a4ff8-360e-45ae-a95e-7e170ffdcd65（基线 a86bf95）本轮只读核对 2026-10-30
- 涉及 check 脚本 7 个及 docs/frontend/common-errors.md、verification.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "check_label_width_conflict",
  "source_extraction_id": "e30ec998055842cf9bca08f4e7758748",
  "version": 1,
  "memory_type": "entities"
}
-->
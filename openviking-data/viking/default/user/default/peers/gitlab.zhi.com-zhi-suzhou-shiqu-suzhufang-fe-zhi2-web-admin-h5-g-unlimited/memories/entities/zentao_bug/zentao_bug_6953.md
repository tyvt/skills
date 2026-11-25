# 禅道 Bug 6953
苏住房G（zhi2-web-admin）街道信息/社区信息页面「全称」需排在「简称」之前且相邻的字段展示顺序缺陷，2026-11-25 完成代码修复与实机验证。

## 基本信息
- 来源：2026-11-25 用户直接给出禅道链接（bugID=6953）；类型为 Page，涉及街道/社区名称排序，期望效果仅在两张截图中给出。
- 分析路径：通过 DBX 直连「新禅道」库读取 bug 行与 action 记录（无后端改动相关评论），两张截图下载到 D 盘附件目录后分析。
- 涉及文件：`zhi2-web-admin/src/views/property/subdistrict/components/SubdistrictDialog.vue`、`src/views/property/subdistrict/detail.vue`、`src/views/property/community/detail.vue`。

## 修复内容
- 三个文件各两处、共 6 处调整：新增/编辑模板与查看态 `contentInfo` 字段数组，使「街道全称/社区全称」与「简称」相邻且全称在前，顺序为全称 → 简称 → 代码。
- 行号锚点：SubdistrictDialog.vue `:9/14`、`:152/163`；subdistrict/detail.vue `:9/14`、`:174/185`；community/detail.vue `:30/35`、`:253/264`。
- 计划首轮即获评审通过；评审提示的第四处疑点经 grep 全部「全称/简称」标签核实为街道选择、社区选择弹窗与搜索筛选表单，不在详情表单范围，确认三文件为完整范围。

## 验证与交付
- 目标文件 ESLint 通过；基线构建与改后 `npm run build` 均 exit 0（改后构建曾有瞬时 STALL 警告，128 秒后正常完成）。
- agent-browser 实机 DOM 核对：街道信息弹窗与街道信息详情均为「街道全称 → 街道简称 → 街道代码」，社区信息详情为「社区全称 → 社区简称 → 社区代码」；三张截图（bug6953-street-20261125-102005.png、bug6953-community-20261125-102101.png、bug6953-streetdetail-20261125-102133.png）经用户确认验证通过。
- 用户选择「提交并推送」；三张验证图已上传禅道，fileID 24298 / 24299 / 24300。
- 未完成（因成本交接待续）：禅道回写（resolved/fixed，附三图）、子模块 commit+push、清理 `$env:TEMP\bug6953-*` 与 `.task-state\build-*`。

## 交接
- 2026-11-25 会话成本 1.01M 越过 1.00M 阈值触发 P0 硬交接；文档 `HANDOFF-CHAIN-禅道6953街道社区全称字段排序-hop1-20261125-1023.md`（9 节，chain hop=1/10），排程 `schedule-9e9dd7dd…` 于 10:24:44 投递到新会话 `new_once`。
- 交接链路不设 maxHops，终止由交接文档 §4/§9 决定。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6953",
  "source_extraction_id": "5f960a2134214afbbaf33c08a3fc0ed1",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->
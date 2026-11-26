# 镜像面板类名一致性防高度溢出
marketMonitor 的 TradePanel.vue 中「商品住房」与「存量住房」两个对照面板须保持类名与结构完全一致（仅主题色差异），否则右侧因多余内边距/边框被撑高并超出所在行高度。

## 问题根因
- 现象：右侧「存量住房」面板内容贴右边缘，且比左侧「商品住房」偏高、超出该行底部；用户要求两边类名完全一致。
- 前序问题：右侧面板容器缺少左面板已有的 `p-2 sm:p-2.5`，导致内容紧贴右边缘。
- 根因：右侧统计块容器多了 `bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-white p-2 sm:p-2.5`，右侧首行多了 `border-b border-emerald-100/80`，把右侧撑高。

## 修复要点
- 右侧面板容器（约第 126 行）补 `p-2 sm:p-2.5`，与左侧对齐。
- 右侧统计块容器与首行（约第 135–136 行）去掉多余渐变背景、内边距与 `border-b`，改为与左侧完全一致，仅保留 emerald/blue 主题色差异。
- 颜色 token 归一后逐条比对 class 属性验证镜像一致性（本批 58/58 完全相同）。

## 验证与归属
- 文件：zhi2-web-admin/src/views/property/marketMonitor/components/TradePanel.vue。
- 构建：`npm run build` 退出码 0，产物输出到门户根目录 `D:\repository\门户\dist`（非 zhi2-web-admin/dist），仅既有 Sass @import 弃用告警。
- 提交：子模块 develop/v2.6.2-portal 的 e8c883d4f、e30ef44a5 与父仓库 dfc68c1、9dbcd99，按子模块→父仓库自底向上提交并推送；因已暂存在建功能无法带入 worktree，本次直接在对应分支处理。
- 所属项目：门户 marketMonitor；来源会话：2026-11-04。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "trade_panel_mirror_layout",
  "source_extraction_id": "d216df4e39b3416abc00b889f666c1f6",
  "version": 1,
  "memory_type": "entities"
}
-->
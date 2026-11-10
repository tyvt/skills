# 防汛检查列表列宽规范
防台防汛检查与复盘列表因单据编号及时间列宽不足被截断，已按业务库最大长度定宽。

## 数据模型
- 业务库 `SERVICE_EXPAND.T_FLOOD_INSPECTION` 单据编号最大长度 18。
- 业务库 `SERVICE_EXPAND.T_FLOOD_CAUSE` 时间字段最大长度 19（如 `2026-11-09 20:22:33`）。

## 改动文件
- `src/views/flood/components/CheckPage.vue`（汛前/汛中/汛后检查共用）：单据编号列宽 `170→200`，检查时间列宽 `160→190`。
- `src/views/flood/cause/index.vue`（积水原因复盘）：单据编号列宽 `170→200`，提交时间列宽 `160→190`。

## 验证与归属
- 业务库 `MAX(LENGTH(...))` 复核单据编号 18、时间 19；eslint 对两文件 `exit 0`。
- 分支 `develop/v2.6.2-suzhufang-li` 提交 `f86a6b9cc`（fix(flood): 列宽修复）、`909cae311`（docs(flood): 错误台账）。
- 禅道 bug 6401 回写 `resolved/fixed/trunk`，`resolvedBy=tiany`，`assignedTo=lichandan`。
- 未验证项写入 `docs/flood/common-errors.md` 台账：真实账号列表渲染、1366 窄屏视觉回归、生产差异构建未跑。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "flood_list_column_width",
  "source_extraction_id": "50f761a722494dfea87a8c3711001b3f",
  "version": 1,
  "memory_type": "entities"
}
-->
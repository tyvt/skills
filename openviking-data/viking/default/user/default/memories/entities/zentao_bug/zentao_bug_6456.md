# 禅道 Bug 6456
禅道缺陷 6456 为苏住房防汛C端移动查询H5「数智页」接入G端首页统计接口并修复区域显示不全问题，2026-11-11 由助手实现、提交推送并回写禅道为已解决。

## Description
- 问题：数智页（data/index.vue）区域 chips 显示不全（原「更多」按钮遮挡「高新区」），且统计指标未接入真实G端数据。
- 修复：区域 chips 改为由 `/v2.0/system/region/list`（`parentCode=320500`）动态生成（全市+全部区县，按后端返回顺序），移除遮挡的「更多」按钮、保留横向滚动；统计指标通过 Post-injection DOM 文本回填接入真实数据。

## 根因与改动
- `src/api/portal.ts` 新增 5 个G端同源接口及类型：`getKeyData`、`getBenefitData`、`getRepairData`、`getSunshineOverview`、`getRegionList`。
- `src/pages/data/index.vue` 在 onMounted 并行拉取（`Promise.allSettled`），按唯一标签文案定位数值节点回填；未手改自动生成的 `ref-assets.ts`。
- 保持静态部分：物业标准化评价（SEC4）后端无接口（与G端一致全0）；明细子网格/图表因标签在卡片间重复易错填，保持设计稿（接入需产品明确字段映射）。

## 处理时间线
- 助手提交 `54f89df`（2文件 +219/-5）并推送 `origin/dev`（`a20d87f..54f89df`）。
- 禅道 6456 经事务回写置 `resolved`/`fixed`，`resolvedBy=tiany`，`assignedTo` 退回 `lichandan`；`openedBy=lichandan`，`product=79`，`project=141`，`execution=142`。
- 本地构建/类型检查未执行（仓库无 node_modules），依赖人工评审 + git diff 复核。

## 当前状态
- 禅道 6456 为 resolved/fixed，assignedTo=lichandan。
- 代码已推送 dev；建议本地 `pnpm install && pnpm typecheck` 联调确认。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6456",
  "source_extraction_id": "addf8a7061684d14b152544a798bf9f5",
  "version": 1,
  "memory_type": "entities"
}
-->
# 禅道 Bug 6522
淮安物管 zhi2-web-admin 一般表决详情页重复显示表决明细数据的缺陷，2026-11-25 定位根因并落地修复。

## 问题信息
- 标题「一般表决详情显示数据重复」，指派给 tiany；来源为淮安物管「客测」（uat），截图为 -test 环境。
- 附件两张截图（fileID 22555、22556）中明细表显示「暂无数据」，单看截图无法确认重复位置，需实机复现。
- 禅道连接名称为「新禅道」，评论仅有指派记录、无有效复现说明。

## 根因
- `zhi2-web-admin/src/views/autonomy/general/detail.vue:103` 的 base 表决明细表 `v-if` 缺少 `form.bizState != '2'` 条件，完成态下与 stats 表同时渲染，造成明细重复。
- 同类历史修复 `09a95afd0`、`48f3a58b4` 在后续合并中丢失，属回归。

## 修复与验证
- 2026-11-25 在 base 表决明细表 `v-if` 增加 `&& form.bizState != '2'`，与完成态 stats 表互斥；`git diff --check` 通过。
- 实施计划复审 PASS（88 分），用户确认实施并提供生产环境凭据；评审中 `bizState` 空值场景判定安全（两个 `v-if` 在同一渲染 tick 翻转）。
- 实机验证未完成：生产站点登录按钮被 footer 遮挡、验证码识别需多次重试并共识识别，尚未取得完成态只有一个表决明细区块的截图。

## 交接状态
- 成本越过 1.00M 硬交接档位，2026-11-25 09:56 写 9 节交接文档并排程下一跳 `session-a04a3c93…`（hop1/10，target=new_once，2026-11-25 09:56:41 +08:00 触发）。
- 待办移交下一跳：生产实机确认与截图、禅道回写附图、按用户选择方式提交代码、清理临时产物。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "zentao_bug",
  "name": "zentao_bug_6522",
  "source_extraction_id": "a8fc613934d6431e82d0f2b7edbf7ec0",
  "version": 1,
  "memory_type": "entities"
}
-->
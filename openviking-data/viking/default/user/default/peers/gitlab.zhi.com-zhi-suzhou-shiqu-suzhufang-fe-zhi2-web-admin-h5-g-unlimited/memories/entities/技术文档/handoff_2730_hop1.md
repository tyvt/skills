# HANDOFF-CHAIN-禅道2730表头吸顶-hop1 交接文档
禅道 2730 表头吸顶改造的 hop1 会话交接文档；2026-11-25 会话因成本达 1.06M 触发 P0 硬交接停手，未做 commit/禅道，验证未通过。

## 位置与排程
- 路径：`D:/plan/苏住房G/HANDOFF-CHAIN-禅道2730表头吸顶-hop1-20261125-1531.md`
- 下一跳已排程 `schedule-8759761d-7ed6-441a-a311-ec752b07879b`，约 2026-11-25 15:41:28 新会话 `new_once` 自动接续；也可手动新建会话，第一句让模型读上述 HANDOFF 并按 §9 开工。

## 当前代码状态（已 build 同步 8101）
- `zhi2-web-admin/src/views/publicQuery/monthlyReportStat/detail.vue`：顶栏横滚 + 表内纵滚、`sticky` 遮罩、`list-container` flex 限高。
- `zhi2-web-admin/src/styles/index.scss`：`.stat-table-xbar`/`.stat-table-wrap` 滚动条 thumb 常显（覆盖全站 hover 透明）。

## 待办（hop2，用户刚提三点）
- 去掉页面级第二条纵滚，只留表内一条。
- 顶栏横向条不要 hover 才出现（全局 thumb 已部分覆盖，可能还需外层布局）。
- 验证门通过后再提交 / 禅道 2730。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术文档",
  "name": "handoff_2730_hop1",
  "source_extraction_id": "5f960a2134214afbbaf33c08a3fc0ed1",
  "version": 1,
  "memory_type": "entities"
}
-->
# HANDOFF-CHAIN-bug6955-home-realdata-hop1
九节链式交接文档，记录 2026-11-25 苏住房防汛C端禅道 6955「首页真实数据」在 hop1 停止改码、排定下一跳时的状态。

## 位置与作用
- 路径 `D:/plan/苏住房防汛C端/HANDOFF-CHAIN-bug6955-home-realdata-hop1-20261125-0948.md`。
- 按 P0 硬交接指令写入，共 9 节完整，含 chain_id/hop/maxHops 与未完成项。
- 写入后本会话停止后续改码，由下一跳会话接续；2026-11-25 的 hop2 会话读取全部 9 节后接续，2026-11-25 该 hop2 会话完成全部待办（G/B 端实机验证、提交推送、禅道回写附图、产物清零）并终止链路，未再生成后续交接文档。

## 当前结论
- 代码仅有 `src/pages/home/index.vue:2,7-11` 两处 import 改动，逻辑未动；基线构建 exit=0，24 秒。
- 下一跳排程 `schedule-b88d08f1-2d60-4c99-aabf-81322e65f9d0`（new_once），2026-11-25 09:49:25 Asia/Shanghai 投递，目标与原计划一致。
- 未完成项：实机验证、截图证据、用户确认、禅道回写，按文档第 4/9 节继续。

<!-- MEMORY_FIELDS
{
  "category": "tech_doc",
  "name": "bug6955_handoff_hop1",
  "source_extraction_id": "cab3481dcaa34416ad9d1d2e2086f408",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->
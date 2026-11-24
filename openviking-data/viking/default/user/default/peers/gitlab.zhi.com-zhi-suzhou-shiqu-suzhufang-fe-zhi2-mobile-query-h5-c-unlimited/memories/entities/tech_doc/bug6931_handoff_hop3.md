# HANDOFF-CHAIN-bug6931-检查中修改评价等级-hop3
九节链式交接文档，记录 2026-11-24 苏住房防汛 C 端禅道 6931「检查中修改评价等级」在 hop3 的根因定位、后端修复与部署阻塞状态。

## 位置与作用
- 路径 D:/plan/苏住房防汛C端/HANDOFF-CHAIN-bug6931-检查中修改评价等级-hop3-20261124-1526.md。
- 会话量达 1.00M 触发 P0 硬交接后写入；共 9 节，第 4 节列未完成项、第 5 节为链元信息、第 9 节写下一跳目标。
- hop4 已排程 2026-11-24 15:27:46 自动开新会话接续：部署 → 实机验证 → 用户确认 → 提交 + 回写禅道（附图）→ 清理。

## 记录的结论
- 根因在后端：`/check/start` 忽略 grade，`/checkRecord/initItems` 支持按等级取题；`start()` 未把 grade 拷入 `StdEvalCheckInitDto`。
- 已改后端两文件（DTO 加 5 个 grade 字段 + start 透传）并在补齐依赖后 `mvn compile` EXIT=0，但未提交。
- 验证门未过：需先部署到远程测试服（nginx 8095 上游 192.168.1.31），禅道未回写。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "tech_doc",
  "name": "bug6931_handoff_hop3",
  "source_extraction_id": "47179f7fc3d8497a8080ca0480aa9c4f",
  "version": 1,
  "memory_type": "entities"
}
-->
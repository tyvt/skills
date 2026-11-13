# Summary
用户于 2026-11-13 指示新增计划章节（原称 §八，落地为 §九）「已知限制与多 peer 部署注意事项」。助手补充了作用域分割、多 peer 生产风险、为何不能配置增强、临时缓解三方案（甲回退 direct / 乙敏感工具走直连 / 丙每 peer 独立进程），并决策多 peer 上线前必须先落 A-2 或甲/乙。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 现在：重试 forget，不行走 HTTP 删探针 → search ovgw-probe 确认空；

现在：改计划 §四 R1 缓解列（增强不可行）+ 新增 §八（已知限制与多 peer 部署注意事项）；...
...
**assistant [peer=github.com-tyvt-skills]**: Now add a dedicated §八 "已知限制与多 peer 部署注意事项" section. The current §八 is "重启后验证结果" — let me append a new subsection after it.
...
**assistant [peer=github.com-tyvt-skills]**: ...仅「显式工具调用」路径受影响、自动召回不受影响。
- **新增 §九「已知限制与多 peer 部署注意事项」**：作用域分割、多 peer 生产风险、为何不能配置增强、临时缓解三方案（甲回退 direct / 乙敏感工具走直连 / 丙每 peer 独立进程）、决策（多 peer 上线前必须先落 A-2 或甲/乙）。...

<!-- MEMORY_FIELDS
{
  "event_name": "新增多peer部署注意事项",
  "goal": "补充部署限制",
  "summary": "用户于 2026-11-13 指示新增计划章节（原称 §八，落地为 §九）「已知限制与多 peer 部署注意事项」。助手补充了作用域分割、多 peer 生产风险、为何不能配置增强、临时缓解三方案（甲回退 direct / 乙敏感工具走直连 / 丙每 peer 独立进程），并决策多 peer 上线前必须先落 A-2 或甲/乙。",
  "ranges": "0,22,49",
  "source_extraction_id": "8d26e42b5a0f4e92aff2b084b4115209",
  "version": 1,
  "memory_type": "events"
}
-->
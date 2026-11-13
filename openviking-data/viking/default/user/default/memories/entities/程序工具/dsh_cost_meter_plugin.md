# dsh cost-meter 插件
dsh（DeepSeek Harness）的成本计量插件，监控会话步数与 ask_user 等待时长并发送提醒。
## 新增检查（A2）
- `[step-guard]`：会话步数 ≥ stepReminderThreshold（默认 120）时触发一次（fired Set 防重）
- `[ask-wait]`：ask_user 等待 ≥ askUserLongWaitMs（默认 300000ms）时按 callId 计时触发一次
## 配置项
- stepReminderThreshold：步数提醒阈值，默认 120
- askUserLongWaitMs：ask_user 长等待阈值，默认 300000
## 验证与归属
- 合成事件实测 step-guard 在阈值触发且仅一次、ask-wait 在 ≥300s 等待触发
- 涉及文件：cost-meter/lib/index.js、cost-meter/cordis.patch.yml
- 所属项目：dsh；来源会话：2026-11-12

<!-- MEMORY_FIELDS
{
  "category": "程序工具",
  "name": "dsh_cost_meter_plugin",
  "source_extraction_id": "c34ec82b95544a2b95ac7d8de15df2b3",
  "version": 1,
  "memory_type": "entities"
}
-->
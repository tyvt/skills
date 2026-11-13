# code_editor
编排器原有的代码编辑工具，与 code_edit_with_signal 按信号判据分流。

## 功能定位
- 编排器代码编辑工具，承接无显式验证信号的编辑任务
- 接入点：config.yaml、graph.py、router.py、index.js

## 关键事实
- 实际模型池为 workbuddy/deepseek-v4.1-flash（非用户记忆中的 Composer 2.5，2026-11-13 核查确认）
- 受 PEAK_GLM_TOOLS 策略影响：高峰时段（14:00-18:00）glm 被提至首位
- 执行节点无需特殊注册（graph.py:930-943 通用路径覆盖）

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "代码编辑工具",
  "name": "code_editor",
  "source_extraction_id": "551c6d22d1bf4ca39ceeb5c143125d2a",
  "version": 1,
  "memory_type": "entities"
}
-->
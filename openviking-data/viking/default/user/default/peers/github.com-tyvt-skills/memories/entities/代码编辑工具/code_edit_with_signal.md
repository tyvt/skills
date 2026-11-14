# code_edit_with_signal
编排器代码编辑工具，由 code_editor 拆分而来，用于带验证信号的编辑任务。2026-11-13 实现并本地提交（commit 2bbeef99，5 files +207/−4）。

## 功能定位
- 模型池：workbuddy/kimi-k3.1-pro（2026-11-14 起主选，全量 0.849 最高、JSON 最稳）→ workbuddy/glm-5.3-flash → auto/deepseek-v4.1-flash；原主选 cursor/composer-2.5 已于 2026-11-14 从网关关停
- 判据：任务含"跑测试/修报错/按方案改/验证"等信号且有可执行验证手段时启用；两种触发方式：主控显式 orchestrate {op:"tool", tool:"code_edit_with_signal"}，或 op:"full" 请求中明确写「由 code_edit_with_signal 生成代码」（否则规划器默认派给 pwsh）；主控自己用 edit/write 改文件不经过编排器，天然与 composer 无关
- 与 code_editor 按信号判据分流，同属编排器代码编辑工具

## 关键实现
- 接入点：config.yaml（新工具池）、src/graph.py（SIGNAL_TRIGGERS 单一词表 + PLANNER_SYSTEM 的 {signal} 占位符 + 加入 _NO_LOCAL_READ_TOOLS + 未知工具名 [WARN]）、src/router.py（注释说明排除峰时集合）、orchestrator/lib/index.js（TOOL_NAMES 加入使 op:"tool" 可选）
- 刻意排除在 PEAK_GLM_TOOLS 策略外，避免高峰时段（09:00-12:00 / 14:00-18:00）glm 被提至队首、剔除 deepseek，导致工具永远跑不到池首强模型
- 四类触发词定义在 SIGNAL_TRIGGERS，既渲染进规划器提示词又被测试直接 import 校验，单一来源避免词表漂移
- 执行节点无需特殊注册（graph.py 通用路径覆盖）

## 测试与验证
- 新增 tests/test_tool_signal_split.py（11 个测试），含回归测试锁死峰时/谷时池首
- pytest 89 → 100 passed；orchestrator selftest EXIT=0；op:"list" 新工具可见、池首为强模型
- 2026-11-14 主选改为 kimi-k3.1-pro 后同步改 3 处断言（43/128/168）与 2 处注释（148/157），全量 pytest 160 passed 无回归
- composer-2.5 两次实调：首次生产调用 32.57s/5068 token（session-89cecb05）、3.67s/99 token，答案均正确

## 已知问题
- 首次生产调用冒烟中曾疑似跑偏（输出虚构项目文档与"Mike Dane 风格博客"），但 2026-11-13 账单复盘确认当日两次调用均 ok、未触发坍缩；composer 偶发发散仍建议观察
- 调用上限未做：全仓无 per-tool 计数机制，加硬上限需约 20 行代码（机制层改动），已拆为 F1 后续增强（router.run_tool 入口加计数器，超阈值把池首换 flash），未纳入本次

## 相关文档
- 方案文档 .plan/code-edit-with-signal-20261113.md，含 4 轮审核记录与冒烟量规（40 条样本，调参集 30 + 留出集 10，阈值 90%/80%）

<!-- MEMORY_FIELDS
{
  "category": "代码编辑工具",
  "name": "code_edit_with_signal",
  "source_extraction_id": "ef1f782d96f343b6b5a540a2d8167db7",
  "peer_id": "github.com-tyvt-skills",
  "version": 6,
  "memory_type": "entities"
}
-->
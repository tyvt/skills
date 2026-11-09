# dsh-cost-meter
DSH 本地插件，在会话内按阈值注入实时成本提醒，将降本规则变为运行时行为。

## 功能
- 监听 session/event 累加 usage，每次 agent/pre-step 前若每步未命中/累计未命中/累计等效成本越阈值，注入一条收尾提醒（同阈值仅一次）。

## 部署
- 源码位于 D:/repository/skills/dsh/cost-meter，~/.dsh/cost-meter 为符号链接。
- 零依赖 host 插件（非 React client），2026-11-09 随 web 重启验证挂载无报错。

## 关系
- 扩展 dsh-context 的成本可视化意图，但以 host 注入方式实现。


<!-- MEMORY_FIELDS
{
  "category": "plugin",
  "name": "dsh_cost_meter",
  "source_extraction_id": "015982f6acda4ee1b43529e0a9b4cd38",
  "version": 1,
  "memory_type": "entities"
}
-->
---
audit_status: invalid
last_checked: 2026-11-27T19:14:27+08:00
verdict_note: 投资推送为量化策略记忆，本地无对应项目仓，output/phase7b/*.md 全仓 glob=0，引用文件不存在，无法用现状证明有效。
---
# Phase7B Alpha晋级预注册闸门
在 H30269 Beta 锚点校验通过后，Alpha 变体晋级须通过预注册多闸门整体判定，点估计改善不足以保证晋级。

## 判定规则
- 预注册多闸门同时判定：增量年化与 Bootstrap 下界（G1）、滚动三年最差窗口（G3）等
- 实测 C3（126日波动率变体）点估计略好、回撤略改善，但 G1/G3 未过则整体验证 FAIL、不进入模拟盘
- 官方一年波动窗口继续保留

## 交付要求
- 保持 Beta 源与预注册 SHA256 不变
- 全量单测通过后再归档

## 验证与文件
- C3 闸门表：G1 FAIL（Δ年化 +0.32pp，Bootstrap P5 -1.61pp）；G3 FAIL（三年窗口最差增量 -2.83pp）
- 涉及 output/phase7b/factor_vol_half_year.md、beta_anchor_check.md
- 所属项目：投资推送

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->
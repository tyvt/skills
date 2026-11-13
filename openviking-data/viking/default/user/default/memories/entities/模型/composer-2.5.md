# composer-2.5
composer-2.5 是 cursor-model-routing 编排器中使用的模型之一，存在特定的偏题失效模式。

## 配置
- composer-2.5 仅挂在 langgraph-orchestrator 的 config 中（code_edit_with_signal 池），2026-11-13 排查确认未在其他位置配置

## 失效模式
- 存在低概率、不可通过请求参数复现的"虚构交付物"失效模式
- 触发后输出整篇看似专业、实则完全跑题的成稿，且长得像正常交付，比明显乱码或坍缩更危险
- 11 次重放（5 baseline + 3 NO_LOCAL 注入 + 3 max_tokens 6144）全部 on-task，确认无稳定触发器

## 检测边界
- cursor-model-routing 现有 NEW 正则对其"虚构交付物型"偏题完全漏检（MATCH_NEW=False）
- 新增 FAKE_DELIVERY 正则（命中 source/blogs|blog_skill|Mike Dane|Giraffa 等特征）可拦截该样本，但仅 1 正类/11 负类，不具统计意义

## 历史调用与使用概率
- 2026-11-13 据 .sessions 账单盘点：composer-2.5 实际被编排器调用仅 2 次，均在当天 session-89cecb05，走 code_edit_with_signal 池，均 ok（一次 32.57s/5068 token 代码生成，一次 3.67s/99 token 小编辑）
- 全量账单中 composer 占比约 1% 量级（execute 角色约 105 条，加 plan/guard/summarize 等约 200+ 条）
- 池存在时间短：composer 于 2026-11-12 曾任 code_editor 主选，当天随 cursor 系整体移除，直到 2026-11-13 才恢复且只挂在 code_edit_with_signal 一个池，编排器历史大部分时间它不在任何池
- 调用低概率为结构性：P(用到 composer) = P(请求是代码生成+验证类) × P(路由到 signal 工具) × P(composer 未降级)，三因子均不高
- 需区分两维度：被调用概率低（结构性、正常）与调用后输出坍缩 ~1/3（T3 复现发现的间歇模板坍缩，属质量维度，与调用概率无关）
- 若想提高 composer 命中：在请求中显式点名「由 code_edit_with_signal 生成代码」，或将其池扩到 code_editor 主选

<!-- MEMORY_FIELDS
{
  "category": "模型",
  "name": "composer-2.5",
  "source_extraction_id": "62f7acbd2a274e848d0024218a785980",
  "version": 3,
  "memory_type": "entities"
}
-->
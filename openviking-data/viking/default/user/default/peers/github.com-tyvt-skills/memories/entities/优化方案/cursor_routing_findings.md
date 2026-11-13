# Cursor 模型路由实测结论
2026-11-13 用户修正初版 Grok/Composer 分工方案，助手实测复现后产出 v3 结论（同日 v2 升 v3，并修正 v3 跑题正则验证漏检）。

## 测试规模
- 网关重扫 11 个 cursor 直连模型（grok-4.7@256k/500k、4.6、4.5、composer-2.5 主池大余量；其余 6 个为 $20 赠额）
- 主矩阵 5 模型×T1-T7=35 格 + 赠额 6 模型×T1/T2=12 格（11 模型冒烟全通），整轮仅 $0.065，记录质量(1-5)/一遍过/耗时/token/缓存命中率
- T3/T7b 做 3× 复现（composer+grok-4.7），T5/T7 简单题做 3× composer 复现

## 关键发现
- Composer 2.5 在 T1/T2/T4/T6 稳定全 on-task 正确（有界代码任务强项）
- T3：composer 3 次=正确/正确/跑题（"前端面试题"模板），grok-4.7 3/3 全对 → 归 Grok
- T7b：composer 坍缩成"第18/19轮"多轮自评模板，grok 全约束达标；T7 简单题 composer 3次 on-task 但 rep2 漏技术词
- T5：composer 覆盖高但取舍失控（同 prompt 3.6k/4.9k/31.5k 字符），grok 3/3 on-task 覆盖+取舍均稳且长度稳定（1851/2252/1821 字符），非跑题
- grok T7b 3/3 on-task 但 rep2 数值漂移（270 万 vs 65 万）→ 含数字基准题须复核计算
- Composer 2.5 存在 ~1/3 间歇性模板坍缩（prompt 敏感）；grok-4.7 每轮注入~1300 token 前缀、~85% 缓存命中

## 路由与前提
- T1/T2/T4/T6 → Composer 2.5；T3 终端调试、T7b → Grok-4.7
- grok 代际不并列：4.7 代 vs 4.5/4.6 旧代（更话痨更慢），旧代仅兜底
- composer cost=0 为 Pro 池额度前提（非免费）

## 跑题正则验证（v3）
- 语料 84 样本 / 4 正类（全 composer-2.5）：primary-T3（instruction.md 错任务）、t3-repro-T3-rep3（前端面试题）、composer-repro-T5-rep3（31,493 字符文件转储）、t7b-T7b（第18/19/20轮）
- 旧正则（只认"第N轮/【ID】/面试题"）：P 100% / R 75%（TP=3, FP=0, FN=1，漏 composer T5 rep3）
- 新正则（补 instruction.md + Final file content + tasks/architecture）：P 100% / R 100%（TP=4, FP=0, FN=0）
- 边界：仅覆盖"模板坍缩 + 文件转储串题"两类，未命中≠on-task 仍需人工兜底；文件转储型常在中后段，不能只扫头部 200 字；上线前须真实流量回捞 ≥30 正类重算
- 正则内置 run-matrix.ps1 的 Test-OffTask；离线脚本 cursor-model-routing/validate-offtask.ps1（除 -DryRun 外无模型调用）

## 池额度悬崖量化
- composer-2.5 4131 calls / 95.5M tok / cost=0（池额度）；grok-4.7@256k 3198 calls / $150.91；同量走 grok 约 $462/月
- 网关无配额接口（全 404），是 Cursor Pro 外部周额度墙，耗尽报错非静默跳价；观测=unpriced 计数 + composer 错误率（2.08%）；消耗≈137 calls/天、3.2M tok/天

## 脚本与文档
- pricing 改从 /v1/models 动态读四项（uncached/cacheRead/cacheWrite/completion）；max_tokens 收紧 2048→1024（smoke 仍 32）；结果加 priced 字段
- REPORT.md/SKILL.md 落代际分表、T5 拆维、T7b 复杂题、off-task 守卫与 v3 结论；数据存 results/（含 grok-repro.json）
- 新 skill 目录 cursor-model-routing/ git 未跟踪（提交待确认）
- 报告 v3 定级：T1/T2/T3 先行；T5/T7b 按边界使用；跑题正则 + 池额度按灰度条件接入

<!-- MEMORY_FIELDS
{
  "category": "优化方案",
  "name": "cursor_routing_findings",
  "source_extraction_id": "62f7acbd2a274e848d0024218a785980",
  "peer_id": "github.com-tyvt-skills",
  "version": 6,
  "memory_type": "entities"
}
-->
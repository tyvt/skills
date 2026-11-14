# cursor 模型评测
2026-11-14 对 cursor provider 模型做多轮评测，含早期全量bench、3题快筛、及 66 模型 6 题初筛，形成可用/不行判定清单。

## 早期全量bench已测cursor模型（2026-11-14）
- cursor/grok-4.7@256k：avg0.884全场第1，安全✅JSON✅，可留（强，慢13s+计费，适合难题/评审）
- cursor/deepseek-v41-flash-1017：avg0.845，安全✅JSON✅（1行M1-2路由错），可留（最快3.9s）；M1-2偶发把摘要粘贴日志路由成 direct_answer

## 3题快筛结果（早期，M1-1/M3-3/M4-5）
- cursor/grok-4.6：3/3 JSON、3/3路由✅
- cursor/grok-4.5：2/3 JSON、1/3路由，❌不行（markdown包裹JSON+M1-1该execute却refuse）
- cursor/glm-5p3-flash：1/3 JSON、1/3路由，❌不行（2/3裹markdown代码块致JSON失败）
- cursor/kimi-k2.7-code：0/3、0/3，❌不行（3/3 HTTP 502网关不可用）

## 66模型6题初筛（2026-11-14，M1-1/M1-3/M1-5/M3-3/M4-3/M4-5）
- 396次调用全完成，结果存 D:\repository\skills\controller-bench\results\screen-cursor.json
- 首轮66个分档：A(6/6)14、B(5/6)18、C(4/6)13、D(≤3/6)21；32个(A+B)通过，34个(C+D)不合格

### A档·6/6满分（14个，初筛优秀）
- claude-opus-4-7@1m、claude-opus-4-7@300k、deepseek-v41-flash-1017、gemini-4-argon、gemini-4-hydrogen、gpt-5.3-codex、gpt-5.4-mini、gpt-5.4-nano、gpt-5.6-sol@1m、gpt-5.6-sol@272k、gpt-5.6-terra@1m、gpt-5.6-terra@272k、grok-4.7@500k、muse-spark-1.3@1m

### B档·5/6（18个，良好）
- 含 claude-fable-5-1/5-2、claude-opus-4-8@300k、claude-opus-5-5@300k、claude-sonnet-5-5两变体、glm-5p3-flash、gpt-5.5@1m/@272k、grok-4.6、grok-4.7@256k、kimi-k3、muse-spark-1.3@300k、muse-wonder-1.0两变体（部分有1次网络err或1题路由错）

### C档·4/6（13个，边缘）
- 含 composer-2.5（route 3，JSON 不稳）、gemini-4-carbon（4/6+1次网络err）、claude-opus-4-8@1m、claude-opus-5两变体、claude-sonnet-5两变体、gemini-3.5/3.8-flash、gpt-5.2、gpt-5.4@1m/@272k、gpt-5.6-luna两变体

### D档·≤3/6（21个，明确不行）
- 含 claude-opus-4-5(0/6)、claude-sonnet-4-6(0/6)、gemini-3.1-pro(0/6)、kimi-k2.7-code(0/6全502)、claude-sonnet-4@200k(6err全挂)、glm-5.2(1/6)、glm-5p3(2/6)、gpt-5.1、gpt-5-mini、grok-4.5(3/6路由差)、gemini-3-flash、claude-haiku-5-5、claude-fable-5、auto 等

## 当前剩余cursor模型（用户关停部分后重拉，21个）
- A档13个（上述A档去掉 gemini-4-argon）：claude-opus-4-7@1m/@300k、deepseek-v41-flash-1017、gemini-4-hydrogen、gpt-5.3-codex、gpt-5.4-mini、gpt-5.4-nano、gpt-5.6-sol@1m/@272k、gpt-5.6-terra@1m/@272k、grok-4.7@500k、muse-spark-1.3@1m
- B档6个：glm-5p3-flash、gpt-5.5@1m、gpt-5.5@272k、grok-4.7@256k、kimi-k3、muse-spark-1.3@300k
- C档2个（不优秀）：composer-2.5（4/6 route3）、gemini-4-carbon（4/6+1err）

## 关键结论
- cursor 家族 gpt-5.6-sol/terra、claude-opus-4-7、grok-4.7@500k、gemini-4 系列、muse-spark 表现最好
- 初筛仅 6 题验 JSON 顺从+关键路由，不等于全量 35 题质量排名；A+B 档可进全量评测，建议同模型去重（@1m 与 @300k 只跑一个）
- 早期未测试cursor系（grok-4.7@500k、kimi-k3、glm-5p3、glm-5.2、claude-opus-5-5@300k、gpt-5.6-sol@272k）已由66初筛覆盖，多在A/B档

## 35题全量评测有效分（2026-11-14，与 codex/workbuddy 对照）
- cursor/grok-4.7@500k 0.820（综合/路由/评审最强，M4路由0.94、M10评审1.0）
- cursor/gpt-5.4-mini 0.809（T对抗0.83最高、扇出1.0、效率/坏工具强）
- cursor/claude-opus-4-7 0.803（工具选/路由强，M4路由0.98）
- cursor/dsv41-flash-1017 0.787（最快4s、坏工具强）
- cursor/gpt-5.3-codex 0.637（最低但 JSON 干净、初筛6/6，可用边缘）
- cursor/gpt-5.4-nano、gemini-4-hydrogen 名目0.79-0.82但5-7题JSON污染，有效0.64-0.67
- 头部三模型接近 workbuddy/kimi-k3.1-pro 0.849；codex/gpt-6-luna 0.769（T对抗0.79、M2依赖0.98）

<!-- MEMORY_FIELDS
{
  "category": "模型评测",
  "name": "cursor模型初筛评测",
  "source_extraction_id": "b6d257e6cd1a4f8692fd66173eb05217",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->
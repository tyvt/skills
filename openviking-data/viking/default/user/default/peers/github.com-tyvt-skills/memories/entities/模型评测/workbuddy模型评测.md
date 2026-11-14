# workbuddy模型评测
2026-11-14 对 workbuddy provider 模型做 bench 评测，形成可用/不行判定清单。含早期 bench 全量（M1–M5+T8–T11）、3题快筛、及 35 题全量双口径（名目分/有效分，有效分=format_error与err记0）复测。

## workbuddy 35题全量双口径评测（6保留模型，2026-11-14）
- workbuddy/kimi-k3.1-pro：名目0.901/有效0.849，fmt1/err1，中位12.5s，✅最优（tool0.86、route0.94）
- workbuddy/deepseek-v4.1-flash：名目0.801/有效0.732，fmt3/err0，中位5.3s最快，✅稳快（早期bench M5效率0.846不作效率首选）
- workbuddy/space-bunny：名目0.824/有效0.706，fmt3/err2，中位6.5s，✅可用
- workbuddy/deepseek-v4-pro：名目0.776/有效0.621，fmt4/err3，中位11.9s，⚠️边缘（T9/M6-2 502；早期3题快筛已作guard主选）
- workbuddy/glm-5.3：名目0.856/有效0.563，fmt12/err0，中位6.1s，⚠️JSON不稳（12题不吐JSON）
- workbuddy/glm-5.3-flash：名目0.817/有效0.420，fmt17/err0，中位8.8s，❌JSON差（17题不吐JSON；早期bench M3抗坏工具0.737偏弱）

## workbuddy 35题全量首测（6未测模型，2026-11-14）
- workbuddy/hy4free：avg0.883*（仅成功16题），fmt1/err19，中位34s，❌不行（19次502+极慢）
- workbuddy/glm-5.2：avg0.847，fmt32/err0，中位8.1s，❌不行（32/35 JSON代码块污染）
- workbuddy/step-5-preview：avg0.756，fmt17/err3，中位9.2s，❌不行（17/35污染+3次502+慢）
- workbuddy/kimi-k2.8-preview：avg0.836，fmt9/err0，中位8.7s，⚠️边缘（9题不吐JSON只自然语言）
- workbuddy/mimo-v2.6-pro：avg0.841，fmt15/err0，中位12.3s，⚠️边缘（15题JSON污染但能拒绝、路由0.9）

## 3题快筛结果（早期，M1-1/M3-3/M4-5）
- 可用：workbuddy/space-bunny、workbuddy/deepseek-v4-pro、workbuddy/glm-5.3 均3/3 JSON、3/3路由✅
- workbuddy/minimax-m3.1-flash：3/3 JSON、2/3路由，⚠️边缘（M3-3幻觉工具题误判execute_tools）
- workbuddy/hy3：快筛2次网关502从未进全量，用户2026-11-14确认不测，维持待定

## 关键结论
- 名目分（只算成功解析行）严重虚高，有效分（fmt/err记0）才是真实可用性，glm-5.3-flash 0.817→0.42、glm-5.3 0.856→0.563
- 严格JSON编排器下，glm-5.3系/glm-5.3-flash JSON顺从性差等同不行；所有模型M4-5语义均正确拒绝（无安全失守），问题仅在输出格式
- 建议最终可用集：kimi-k3.1-pro、deepseek-v4.1-flash、space-bunny（用户待确认）


<!-- MEMORY_FIELDS
{
  "category": "模型评测",
  "name": "workbuddy模型评测",
  "source_extraction_id": "d6af3b8809a949fe968962f4e16109aa",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "entities"
}
-->
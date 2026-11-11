- 成本计量阈值统一：reasoning 类（无工具调用）统一 1.5k，output 类统一 3k，不接受第三个数 (as of 2026-11-11)
- 规则 B notice 仅在同 turn 已触发规则 A 时才要求下一步第一件事必须是工具调用，否则只报 output 数字，避免干扰合法大段代码生成 (as of 2026-11-11)

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "cost-meter 规则设计偏好",
  "source_extraction_id": "df61c3b8f70f451fa925056bb67eb1fd",
  "version": 1,
  "memory_type": "preferences"
}
-->
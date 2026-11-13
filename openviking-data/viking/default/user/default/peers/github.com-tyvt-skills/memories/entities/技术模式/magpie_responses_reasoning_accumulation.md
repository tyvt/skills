# DSH magpie-responses 历史 reasoning 全量重发根因
DSH 的 magpie-responses（openai-responses API）provider 每步将全部历史 assistant reasoning/encrypted_content 重发，是 P0-1 二次累积（8.8M/62%）的根因。

## 关键事实
- magpie-responses provider 定义于 ~/.dsh/profiles/web/cordis.patch.yml:1029，api 为 openai-responses，挂 codex/gpt-6.1-sol 等模型
- pi-ai openai-responses.js:264 设置 store:false（无状态全量重放），:295 请求带 include:["reasoning.encrypted_content"]
- openai-responses-shared.js:234-240 历史 assistant 消息序列化时，每个带 thinkingSignature 的 thinking 块无条件 JSON.parse 后 push 回 input，无“仅保留最近 N 步”配置项
- 主模型 magpie（openai-completions）路径：openai-completions.js:993-999 仅 thinkingSignature 非空才写 reasoning_content，主模型历史 thinking 序列化时被丢弃，无此问题
- 平台无现成开关：dsh-agent-loop、dsh-compaction*、pi-ai transform 仅有 reasoningEffort 旋钮，无历史 reasoning 裁剪配置

## 修复方案
- 方案 A：patch pi-ai openai-responses-shared.js:234-240 加“仅保留最近 1–2 个 assistant 消息的 reasoning item”，约 20 行，但 dsh 升级会冲掉
- 方案 B（用户已选）：在 3425 网关前加本地剥离代理（监听 3426 转发 3425，仅重写 /v1/responses 请求体），DSH 侧 magpie-responses baseURL 改指 3426
- 方案 C：拆会话稀释（P0-2），不改代码，收益 30–40%
- 网关 magpie.exe 为 Bun 编译单文件（82MB），responses 路由内嵌二进制不可直接改，故方案 B 落地为外部剥离代理
- 剥离代理设计约束：按“检查点式”累积超阈值才切一次（非滑动窗口），避免打穿 prompt cache

## 影响
- 预期 A/B 落地后 responses 长会话历史 reasoning 从 O(N) 降到常数项，等效成本降约 50%
- 62% 的二次累积集中发生在用 codex/gpt-6.1-sol（magpie-responses）的长会话

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术模式",
  "name": "magpie_responses_reasoning_accumulation",
  "source_extraction_id": "b058fb9310ee4a0babcccb320aa50af8",
  "version": 1,
  "memory_type": "entities"
}
-->
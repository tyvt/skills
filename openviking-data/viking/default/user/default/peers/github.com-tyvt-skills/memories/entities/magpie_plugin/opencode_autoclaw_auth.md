# @magpie-community/opencode-autoclaw-auth
Magpie 出站插件，为 autoclaw-cn 模型池提供 OpenCode 兼容认证并在请求出站前注入/改写官方系统人格。

## Description
- 属于 @magpie-community 组织，是 AutoClaw 国内认证插件（opencode-autoclaw-auth）
- 在每次请求发往 autoclaw-cn 池时前置拼接官方人格，满足上游网关身份校验

## Key Facts
- 第 63 行硬编码 OFFICIAL_SYSTEM_PROMPT = 'You are AutoClaw. Answer the user directly and concisely.'
- autoclawRewriteBody()（同文件 421–455 行）在 system 消息开头非官方人格时执行 `${OFFICIAL_SYSTEM_PROMPT}\n\n${cur}` 前置拼接
- 第 157–158 行 REFUSED_HINT 说明 AutoClaw 官方网关对携带其他 agent 身份行的请求返回 406
- 第 66–126 行正则把 Claude Code/Codex/Cursor/Grok 等各家身份行改写掉
- 本机安装缓存位于 C:\Users\Administrator\.cache\magpie\bun\install-cache\@T@sha512-f033fde...@@@1\index.mjs

## Relations
- 与 magpie 网关（http://127.0.0.1:3425）协同，是 DSH 系统提示词第一句"You are AutoClaw"的唯一来源
- DSH 侧无法修改该注入，只能换非 autoclaw 系 provider 或向该包提 issue

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "magpie_plugin",
  "name": "opencode_autoclaw_auth",
  "source_extraction_id": "b1a49068e5054828a3a5726f202e1063",
  "version": 1,
  "memory_type": "entities"
}
-->
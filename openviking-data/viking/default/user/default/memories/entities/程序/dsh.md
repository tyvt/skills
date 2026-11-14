# dsh
DeepSeek Harness (DSH)：用户的 AI 会话工作台，历史会话规划导入 OpenViking 作长期记忆；技能与插件仓库见 dsh_skills_repo 实体卡。

## 统计与蒸馏
- 总会话 1602（as of 2026-11-04）；2026-11-09 审计 1,753 个会话日志（10-26 批量导入 1,232 后共 1,755，仅 463 有 token 计量）
- source.kind === "user" 为真实人类输入需保留，其余注入上下文过滤
- 2026-11-02 distill：memories-final.json（"Taixing mini-program" 162 项）+ distilled-projects/（831 项），结构化总计 4431（bug 1712/pattern 941/preference 923/fact 571/workflow 284）

## 集成与配置
- 官方 @openviking/dsh-memory-plugin 实时镜像会话到 OpenViking；导入顺序 DSH 先，再 cursor/workbuddy/opencode
- 2026-11-05 会话 dsh-session-fe39d020 调 OpenViking MCP 写 29 条记忆；09:58 extracted=40、commits=48 仍在更新
- web profile：spill-policy.maxInlineTokens 3000→1500、retainTokens 20000→12000、repeat-tool-reminder 2/4/6；cordis.patch.yml 语义召回 recallLimit 3、recallMaxTokens 700、Profile 预算 800；mcp 收为单一 mcp_gateway（as of 2026-11-10）
- profile-inject.mjs 清空 preferences/entities 目录清单；MCP 代理 tools/list 过滤 OPENVIKING_MCP_TOOL_ALLOW=search,find,read,remember,write（as of 2026-11-10）

## 工具与上下文裁剪
- 2026-11-14：profile 工具裁剪批 1/批 2 已生效（standard 预设 tool-schedule/tool-goal/tool-workflow 均 disabled，新增 preset-full-tools 兜底，session_query 按方案 B 不裁），配置 mtime 15:29、web 15:34/15:35 重启；旧会话工具目录冻结仍显示 33 项/6.2k
- 同日技能目录 120→40、禁用 dsh-harness-dev-context 后单步固定上下文 15.5k→14.6k（系统提示 1716→1383、技能注入 766→461），构成与回滚见 dsh_context_budget 实体卡

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh",
  "source_extraction_id": "e38d92ac2de741fdbe0a560a58ca7835",
  "version": 36,
  "memory_type": "entities"
}
-->
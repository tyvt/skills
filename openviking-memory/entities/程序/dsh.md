# DSH
DeepSeek Harness（DSH），用户的 AI 会话工作台，其历史会话计划导入 OpenViking 作为长期记忆。

## 基本信息
- 会话总数 1602 个（截至 2026-11-04）；2026-11-09 审计观测 1,753 个会话日志（1,755 含 10-26 bulk import 的 1,232 条，仅 463 会话有 token 计量），为历史会话导入序列第一项
- 会话数据结构：source.kind === "user" 为真人输入须保留，其余为注入的上下文须过滤

## 既有产物
- 工作区 memory-migration/ 目录已存在上一次 distill（提炼）完整产物与脚本，可沿用其质量口径，避免重复处理
- 2026-11-02 统计：提炼产物含 memories-final.json（顶层单个项目「泰兴小程序」162 条）与 distilled-projects/（831 条项目记忆）
- 2026-11-02 统计：结构化记忆总量 4431 条，类型分布为 bug 1712、pattern 941、preference 923、fact 571、workflow 284

## 关系
- 通过官方 @openviking/dsh-memory-plugin 实时镜像会话到 OpenViking
- 历史会话导入顺序：DSH 率先，其后为 cursor、workbuddy、opencode
- 2026-11-05 导入会话 dsh-session-fe39d020 通过插件大量调用 OpenViking MCP（search ~45、read ~35、remember ~9）并回写 29 条记忆（write 11/edit 17）；截至 09:58 该会话 extracted=40、commits=48，插件镜像与抽取仍在更新

## 技能与守护
- 技能仓库位于 D:/repository/skills，含 dsh/agent-guard（规则引擎 rules.js + 自测/集成测试）与 tool-call-hygiene（工具调用卫生 SKILL.md + morning-report.mjs 晨报脚本）
- agent-guard 通过别名规则（如 schedule_update → schedule_edit、grep.glob → include）与空参数自愈表拦截/修复工具调用错误；morning-report.mjs 默认按滚动 24 小时窗口统计会话与工具失败

## Token 优化与插件（2026-11-09 新增）
- dsh-context 插件（上下文洞察）v0.83.0 已在 web profile 安装，提供 Context Insights 面板与 /context 命令，数据来自 ~/.dsh/storages/session_projcache/sessions 投影缓存。
- token-frugal 技能含 audit-tokens.mjs 等脚本，读取同投影缓存做审计。
- 2026-11-09 新建 token-optimizer 技能（D:/repository/skills/token-optimizer）读同源缓存输出优化清单，已提交 git。
- 新建本地插件 dsh-token-guard（对 read 大结果执行期裁剪+落盘）与 dsh-cost-meter（每步/累计成本超阈值注入提醒），源码置于 D:/repository/skills/dsh/ 并通过符号链接到 ~/.dsh/，均零依赖。
- web profile 配置调整：spill-policy.maxInlineTokens 3000→1500，retainTokens 20000→12000（40处），repeat-tool-reminder 阈值 3/5/8→2/4/6；重启后验证生效。


<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh",
  "source_extraction_id": "015982f6acda4ee1b43529e0a9b4cd38",
  "version": 8,
  "memory_type": "entities"
}
-->
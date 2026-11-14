
# dsh-token-guard
DSH 本地插件，用于在会话中强制 token 成本护栏并对大结果做硬截断；源码位于 D:/repository/skills/dsh/token-guard/lib/index.js，~/.dsh/token-guard 为符号链接，零依赖（不 import @deepseek-ai/*），经 pnpm file: 依赖接入 web profile。

## Description
- 安装路径 ~/.dsh/token-guard，源码含 lib/index.js、selftest.mjs、selftest-cordis.mjs、cordis.patch.yml
- 原有能力：grep 折叠、read 门禁、pwsh build/lint/test 输出封顶（capPwsh 仅对 BUILD_CMD 触发）
- 2026-11-12 改造：capPwsh 改为结构化返回 {text, spillRequested, omittedLines}；新增读取类命令（Get-Content/Select-String/Get-ChildItem/gc/cat/type/more 等）裁剪

## 截断规则 (as of 2026-11-10)
- grep：匹配结果超过 10 个文件或超过 20 行时直接截断，末尾追加提示
- read：返回超过 500 行直接截断，提示用 offset/limit 或改用 grep
- skill：正文超过 2,500 字符只保留开头并注明已截断
- pwsh：跑 npm run lint/build/test 报错超 20 行，仅保留前 10 行和后 5 行
- orchestrate：编排器返回超 1000 字符且含"无法读取"/"示意"等词时截到 1000 字

## 改动细节（2026-11-12）
- 读取类输出 ≤200 行原样；超过则保留头 120 + 尾 40，中间折叠为「省略N行」提示，并将全文落盘（可 read 回读）
- build 分支裁剪文本逐字不变（npm test 基线必过）；text:null 表示不改原文；落盘失败返回有界文本不灌全文
- 新增配置 pwshReadMaxLines/pwshHeadLines/pwshTailLines（默认 200/120/40，可配）
- 影响面：仅影响 pwsh 读取类大输出；普通命令与 build 零影响

## 2026-11-13 激活失败与修复
- 提交 11c9ae67「feat(p0): enforce execution context and bounded tool results」在 lib/index.js:393 新增 `ctx.p0LogReader = logStore.read;`，cordis 4.1.0 Context 代理 set 陷阱对未声明属性直接赋值时抛 `cannot set property "p0LogReader" without provide`，插件激活失败（1 entry did not activate）
- 与 2026-11-12 orchestrator-gate「cannot get property without inject」同族（cordis 上下文属性声明问题）
- 修复：393 行赋值前先 `ctx.provide?.('p0LogReader')`（可用时走 cordis 服务声明随 fiber 卸载自动回收），否则回退直赋值（兼容裸 ctx）
- 新增 selftest-cordis.mjs 用 DSH 自带 cordis 4.1.0 真实 Context 加载插件做集成验证
- selftest.mjs 末尾新增两分支断言（provide 走声明不裸赋值 / 无 provide 回退直赋值）

## 验证与状态
- 备份 ~/.dsh/token-guard/_bak_20261112-160336
- node selftest.mjs 全绿（含默认 250 行→省略90行、非默认配置→省略51行、20行原样、build 回归、新断言）
- node selftest-cordis.mjs OK（无激活报错，root.p0LogReader 可读回）
- 本地提交 d23f1191（含 2026-11-12 未提交的 pwsh 读取类裁剪 188 行 + cordis.patch.yml 3 行配置 + 2026-11-13 provide 修复，4 文件 +338/−55）
- 推送未完成（GitHub 网络不可达）；修复需 DSH Web 重启/重载插件后生效，重启后启动日志应不再出现 `1 entry did not activate: token-guard`

## Relations
- 与 agent-guard（pwsh POSIX 预检）、dsh-cost-meter（交互合并）、dsh-spill-policy（互补，专注 read/grep/skill 大结果治理）协同
- 针对 2026-11-12 会话 token 成本分析指出的「pwsh Get-Content 读源文件灌满上下文」最大浪费项


<!-- MEMORY_FIELDS
{
  "category": "DSH插件",
  "name": "dsh_token_guard",
  "source_extraction_id": "3b67956e47894d95b05e8b46457e83ff",
  "version": 2,
  "memory_type": "entities"
}
-->
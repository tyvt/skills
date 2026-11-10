
# dsh-token-guard
DSH 本地截断插件，在工具执行期对大结果做硬截断，弥补 spill-policy 跳过 read 的缺口；symlinked 到 ~/.dsh/，零依赖。

## 基本属性
- 源码位于 D:/repository/skills/dsh/token-guard/lib/index.js（路径含 token-guard/lib/index.js），~/.dsh/token-guard 为符号链接
- 零依赖（不 import @deepseek-ai/*），经 pnpm file: 依赖接入 web profile
- node selftest.mjs 全部通过；当前运行的 dsh web 进程仍加载旧代码，需重启 dsh web 后生效 (as of 2026-11-10)

## 熔断规则
- grep：匹配结果超过 10 个文件或超过 20 行时直接截断，末尾追加 "(结果过多，已截断。请缩小搜索范围或使用更精确的正则)" (as of 2026-11-10)
- read：返回超过 500 行直接截断，并提示用 offset/limit 或改用 grep；截的是返回内容 (as of 2026-11-10)
- skill：正文超过 2,500 字符只保留开头并注明已截断（如 6,090 字符的 zentao-analyzer 会落入此限制）(as of 2026-11-10)
- pwsh：跑 npm run lint / build / test 报错超 20 行，仅保留前 10 行和后 5 行，中间替换为 "... (省略 N 行错误) ..."，顶部加 "[警告] 工具产生了大量报错输出，可能包含许多与当前修改无关的既有错误" (as of 2026-11-10)
- orchestrate：编排器返回超 1000 字符且含"无法读取"/"示意"等词时，截到 1000 字并要求宿主重新规划，不沿用该段内容 (as of 2026-11-10)

## 关系
- 与 dsh-spill-policy 互补，专注于 read/grep/skill 大结果治理。


<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh_token_guard",
  "source_extraction_id": "ae06bf60c0f149b4bc443a63f4472a9a",
  "version": 2,
  "memory_type": "entities"
}
-->
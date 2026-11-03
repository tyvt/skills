# bash脚本引号截断报错诊断
GitLab Runner 执行构建脚本时 bash 报 `line N` 附近 EOF 前少一个 `"` 的语法错，常因拷贝粘贴不完整导致脚本末尾截断、引号未闭合。

## 问题根因
- bash 报错行号是解析器发现 EOF 的位置（约文件总行数），非真正出错行
- 真正问题多为脚本末尾多段内容或粘贴不完整致引号未闭合，解析器读到文件末尾才报错

## 诊断与解决
- 统计非转义双引号（跳过 `\"` 与单引号串）个数须为偶数且成对
- 比对行数：正确文件行数 < 报错行数基本可判定文件被截断或多了行
- 优先从仓库取已校验版本覆盖 runner（`curl -o ... <raw 链接>` + `chmod +x`），避免再次粘贴
- 脚本第 2 行加 `set -euo pipefail`，构建失败或 dist 缺失时立即非 0 退出，流水线正确标红

## 验证与归属
- 验证证据：会话 63992035（基线 358fa9e）runner 的 esbuild 构建失败、诉求「不改 gitlab-ci.yml 不行吗」「提交推送代码」
- 结论：正确文件 108 行、非转义双引号 128 个（偶数成对平衡），runner 坏文件多一行或引号被截断；唯一实质改动为第 2 行加 `set -euo pipefail`
- 涉及文件：scripts/nodejs-build.sh；来源会话：session-63992035-0418-48dc-9ade-0a6f2d163f36；代码基线：358fa9e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bash_script_quote_truncation",
  "source_extraction_id": "381659ee9de44443be66fc4b57c43a44",
  "version": 1,
  "memory_type": "entities"
}
-->
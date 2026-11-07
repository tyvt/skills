- 处理 CI 构建失败时，反对修改 runner 上的远程 gitlab-ci.yml，要求把改动落在仓库内可控文件（scripts/、.npmrc、package.json）
- 原因：runner 上的 gitlab-ci.yml 是运维侧远程配置，Agent 本地改不动、改了不进版本库、下次流水线未必生效；仓库内文件随提交走，可评审可回滚、运维可直接从仓库拉取覆盖 runner，交付路径更短更可追溯
- 排查 CI 问题时在仓库内新增/修改脚本（如 scripts/nodejs-build.sh、scripts/install.mjs）、.npmrc 配置、package.json 的 scripts 段
- 交付话术把「运维需要做什么」压缩成一条可直接复制的命令（如 curl -o ... && chmod +x），避免让人手贴全文（手贴是上次出错根因）
- 脚本先在本地做静态校验（行数、引号配对、set -euo pipefail）再交付，并提交纳入版本库方便追溯与运维拉取

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "CI 构建问题处理偏好",
  "source_extraction_id": "51146e819e2648e6a9106f0127108af7",
  "version": 1,
  "memory_type": "preferences"
}
-->
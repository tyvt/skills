# import_to_ov
OpenViking 记忆导入的逐批提交脚本，由 import-local-sources.mjs 串行调用完成每批写入。

## 描述
- 每批执行 preflight 检查后提交（commit）到 OpenViking 记忆
- 在 import-local-sources.mjs 的导入流程中按批次被调用
- preflight 的 OV_MAX_COMMIT_QUEUE 改为从环境变量继承（未设置时默认 12），不再硬编码为 12，避免与外部 import-local-sources 设置的 64 冲突

## 关系
- 被 import-local-sources.mjs 调用，是本地导入管线的中间环节
- 在 snapshot-openviking-memory.mjs 执行前完成全部批次提交

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "import_to_ov",
  "source_extraction_id": "fb38f8616217425fb32d33c7d24dfe02",
  "version": 2,
  "memory_type": "entities"
}
-->
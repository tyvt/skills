# import_to_ov
OpenViking 记忆导入的逐批提交脚本，由 import-local-sources.mjs 串行调用完成每批写入。

## 描述
- 每批执行 preflight 检查后提交（commit）到 OpenViking 记忆
- 在 import-local-sources.mjs 的导入流程中按批次被调用

## 关系
- 被 import-local-sources.mjs 调用，是本地导入管线的中间环节
- 在 snapshot-openviking-memory.mjs 执行前完成全部批次提交

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "import_to_ov",
  "source_extraction_id": "feb0f8a0282f43beb0cbb0b2cc1e0f25",
  "version": 1,
  "memory_type": "entities"
}
-->
- 非增删改查（非 CRUD）业务接口末尾禁止误加 `/detail` 或 `/add` 后缀，保持路径规范
- 已在 `src/api` 30 个文件中移除 57 处误加后缀，保留 `module/entity` 前缀与 body 参数（如 `getVendeeListByContractNo/detail` 改为 `getVendeeListByContractNo`）
- 命名需对齐既有规范文件如 `contractRequest.js`、`account.js`

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "API路径命名规范",
  "source_extraction_id": "d94f6582fe8b4b5b90e8d96ed40cbd3d",
  "version": 1,
  "memory_type": "preferences"
}
-->
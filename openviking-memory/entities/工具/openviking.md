# OpenViking 私有凭据槽
OpenViking 提供的私有凭据存储槽，用于持久保存敏感凭据，不写入代码仓或普通记忆。

## 用途
- 用户要求将 Nacos 访问地址与凭据存入 OpenViking 私有凭据槽，用于只读获取数据库连接配置等外部系统凭据。

## 约束
- 凭据不写入代码仓库，也不写入普通记忆文件，仅存于 OpenViking 私有凭据槽。

<!-- MEMORY_FIELDS
{
  "category": "工具",
  "name": "openviking",
  "source_extraction_id": "e7d84cd0df6f47c0ad667c46f84f6746",
  "version": 1,
  "memory_type": "entities"
}
-->
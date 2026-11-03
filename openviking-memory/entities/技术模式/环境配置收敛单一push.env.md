# [投资推送] 环境配置收敛为单一 push.env
遗留按指数拆分的 *.env 应删除，配置加载链统一只读 push.env，密钥与覆盖项统一维护在 push.example.env → 本地 push.env。

## 收敛方案
- 删除遗留按指数拆分的 *.env（如 930955.env、H30269.env）
- config.py 去掉 LEGACY_CONFIG_FILES，_load_env_files() / load_config() 只读 push.env
- setup_task.bat 不再从旧 env 自动复制

## 验证与归属
- 验证证据：会话 13aff9f2 执行项 1：删除 930955.env 并收紧 config/setup_task 加载链
- 涉及文件：config.py、setup_task.bat、push.example.env
- 所属项目：投资推送；来源会话ID：13aff9f2-facc-41b5-9ca3-05a17c0ebd7f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "环境配置收敛单一push.env",
  "source_extraction_id": "7eac30c14d0d4f3587b7971c8785e48f",
  "version": 1,
  "memory_type": "entities"
}
-->
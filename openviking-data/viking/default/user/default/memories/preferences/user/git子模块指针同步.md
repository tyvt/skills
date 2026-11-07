- 子模块 `zhi2-web-admin` 在某分支修复缺陷后，父仓库其他各分支须同步更新子模块指针到对应 commit，避免分支间代码偏差（如修复分页重叠 commit `dac8a93e7` 后，`develop/v2.6.2` 须指向 `fa00918cc`）
- 本地代理配置文件 `env/.env` 保持未提交状态

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Git子模块指针同步",
  "source_extraction_id": "0de41dbc8e2e4f76806309cdcb14ee8c",
  "version": 1,
  "memory_type": "preferences"
}
-->
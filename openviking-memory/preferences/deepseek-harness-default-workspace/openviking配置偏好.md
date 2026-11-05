- 偏好用全局配置（~/.dsh/profiles/web/cordis.patch.yml的openviking-memory-runtime）统一设recallPeerScope等参数，而非各业务git仓库单独写.openviking/config.json。
- 仅非git工作区（如default-workspace）保留.openviking/config.json以固定peer_scope: all实现跨库召回。
- 确认采用全局recallPeerScope: actor，使git仓库会话优先该仓库origin对应peer；改具体项目时cwd切到该repo根目录最稳。

<!-- MEMORY_FIELDS
{
  "user": "deepseek-harness-default-workspace",
  "topic": "OpenViking配置偏好",
  "source_extraction_id": "5235cc5512a84069aec4ec9fd257a5fe",
  "version": 1,
  "memory_type": "preferences"
}
-->
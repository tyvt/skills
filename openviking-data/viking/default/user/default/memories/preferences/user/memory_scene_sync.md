- L2 场景记忆存储在 `agent:default`，但看板只读 `agent:agt-migrated01`，因此只显示 1 个场景而非全部。
- 修复方法：将 `agent:default` 下的 44 个 `scene_blocks/*.md` 复制到 `agt-migrated01`，重建 `scene_index.json` 与 `persona.md` 底部 Scene Navigation，汇总为 45 条记忆。
- 看板地址为 http://localhost:8125，刷新时必要时 Ctrl+F5；若仍显示 1 个需确认选中的是 `agt-migrated01` 实例。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "memory_scene_sync",
  "source_extraction_id": "4ce75dffad3245d6bcb9c5e5af572229",
  "version": 2,
  "memory_type": "preferences"
}
-->
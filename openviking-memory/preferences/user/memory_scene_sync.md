- L2 scene memories are stored under `agent:default`, but the dashboard only reads `agent:agt-migrated01`, so it displays only 1 scene instead of all.
- To fix, copy the 44 `scene_blocks/*.md` files from `agent:default` to `agt-migrated01`, then rebuild `scene_index.json` and `persona.md` navigation to aggregate all 45 memories.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "memory_scene_sync",
  "source_extraction_id": "f728201d4e1f4b3ea1fe133a83f6b344",
  "version": 1,
  "memory_type": "preferences"
}
-->
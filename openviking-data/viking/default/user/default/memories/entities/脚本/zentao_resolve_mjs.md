# zentao-resolve.mjs
DSH zentao-analyzer 技能下的固定 DBX 回写脚本，2026-11-10 降本审计新增，用于替代文档提醒强制 connection_name。

## 功能
- 封装「开事务回写 zentao bug」全流程，仅暴露 bugId 与 commentHTML 两个参数。

## 细节
- 自动生成全套 8 步 mcp_gateway 调用，每步必带 connection_name 及核验点。
- 位于 D:\repository\skills\zentao-analyzer\zentao-resolve.mjs，已自测通过。

## 关系
- DBX.md 回写段已改为「首选跑脚本，手工流程仅降级用」。

<!-- MEMORY_FIELDS
{
  "category": "脚本",
  "name": "zentao_resolve_mjs",
  "source_extraction_id": "7cbade9e69fc4f3fb8d82d9259412d8d",
  "version": 1,
  "memory_type": "entities"
}
-->
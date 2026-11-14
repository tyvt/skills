# dsh-token-guard
DSH 后置结果裁剪插件，非预执行拦截器。

## 核心行为
- 执行期对大结果做 head/tail 裁剪，readBudgetTokens 为结果大小预算
- 对 read 结果 >300 行进行裁剪/拦截（如 47KB 文件整读 406 行被拦）
- 在子代理(delegationDepth>0)场景下，gate 放行后由 token-guard 按行数拦截

## 关系
- 与 dsh-orchestrator-gate 互补：宿主直读时 gate 先按字节拦，子 ctx 时 gate 豁免后 token-guard 按行拦


<!-- MEMORY_FIELDS
{
  "category": "规范",
  "name": "dsh_token_guard",
  "source_extraction_id": "eb213da6abef4bf5ad6baac532f0e529",
  "version": 1,
  "memory_type": "entities"
}
-->
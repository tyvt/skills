- The OpenViking read tool only accepts `viking://` URIs; for local cache files such as `select.json`, use a local file inspector instead.
- When a verification script appears stalled because output is buffered and the repository tree is walked twice, rewrite it lean with flushed output and targeted scans only, avoiding full-tree walks.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "audit_tool_usage",
  "source_extraction_id": "ee11fda6eb814f209c565fa06807cd9f",
  "version": 1,
  "memory_type": "preferences"
}
-->
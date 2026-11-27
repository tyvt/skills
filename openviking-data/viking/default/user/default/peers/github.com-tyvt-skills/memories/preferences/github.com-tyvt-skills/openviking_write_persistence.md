- Before retrying a failed batch memory apply, confirm the script is idempotent (re-read, hash compare, frontmatter merge) and inspect the audit log for partial progress instead of assuming the whole run failed.
- When embedding rebuilds disconnect under batch load but service health checks and a direct embedding test both pass, treat the failures as transient load issues and confirm persistence through frontmatter read-back.
- OpenViking normalizes URIs containing spaces to underscores on write, creating a separate duplicate file instead of updating the original; read back both URI forms to detect the duplicate.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "openviking_write_persistence",
  "source_extraction_id": "148b4080665b44aaba1536d5fd2ace55",
  "version": 1,
  "memory_type": "preferences"
}
-->
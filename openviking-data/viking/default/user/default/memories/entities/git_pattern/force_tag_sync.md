# Force Tag Sync
Git technique to fix local/remote same-name tag divergence causing code inconsistency.

## Problem
- When a local tag and a remote tag with the same name point to different commits, `git pull --tags` does not overwrite the local tag by default.

## Solution
- Use `git fetch origin refs/tags/<tag-name>:refs/tags/<tag-name> --force` to force-align local tags and branches with the remote.

## Verification
- Source session: c76d5b96-d6d4-41d2-8409-c838c89e5beb; baseline: none

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：c76d5b96-d6d4-41d2-8409-c838c89e5beb


<!-- MEMORY_FIELDS
{
  "category": "git_pattern",
  "name": "force_tag_sync",
  "source_extraction_id": "fde7337c82a744feaa7727661809c575",
  "version": 1,
  "memory_type": "entities"
}
-->

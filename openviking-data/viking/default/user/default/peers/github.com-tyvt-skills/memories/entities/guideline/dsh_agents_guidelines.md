# DSH Agents Guidelines
dsh/AGENTS.md defines the screenshot-inline verification gate used by the peer.

## Verification Gate
- dsh/AGENTS.md:7 sets the screenshot inline verification gate.
- Five self-checks must be completed before inlining screenshots.

## Path Rules
- Inline screenshot paths must be locked to $env:TEMP.
- Paths must use forward slashes and angle brackets, with timestamp-based naming.
- Relative paths and attachments paths are forbidden.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "guideline",
  "name": "dsh_agents_guidelines",
  "source_extraction_id": "e2f409bd407d469e808bee653001c5b7",
  "version": 1,
  "memory_type": "entities"
}
-->
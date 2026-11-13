# dsh-mcp-gateway bundle
DSH MCP gateway bundle that supplies the mcp-gateway `servers:` map consumed by dsh web at boot.

## Description
- Provides gateway server config (dbx, context-mode, and added openviking) loaded when dsh web starts.
- Node executable used to spawn gateway servers: `D:\nvm\nodejs\node.exe`.

## Deployment pitfall
- `~/.dsh/mcp-gateway` is a **symlink** to the repo `D:\repository\skills\dsh\mcp-gateway` (source of truth for reinstalls).
- Profile declares `dsh-mcp-gateway: file:../../mcp-gateway`; pnpm **physically copies** (not symlinks) this `file:` dep into `node_modules/dsh-mcp-gateway`.
- The **booting** copy is `node_modules/dsh-mcp-gateway/cordis.patch.yml`, NOT the `~/.dsh/mcp-gateway` symlink/repo copy.
- Edits to gateway config must target the `node_modules` copy to take effect; keep the repo/symlink copy in sync for future reinstalls.

## Verification
- Config validity is checked via `dsh --dump-config` (parses the full composed tree); js-yaml is not installed locally.
- The composed/booting tree must show the `openviking` server and `toolSurface: 'off'` to confirm S2/S3 landed in the boot copy.


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "software_project",
  "name": "dsh_mcp_gateway",
  "source_extraction_id": "15de70ca8ec14abd94bd32573a139cd0",
  "version": 1,
  "memory_type": "entities"
}
-->
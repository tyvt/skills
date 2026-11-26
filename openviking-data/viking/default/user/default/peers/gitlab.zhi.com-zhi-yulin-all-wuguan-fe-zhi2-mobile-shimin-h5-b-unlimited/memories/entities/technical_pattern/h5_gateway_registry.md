# Local H5 Gateway Registry Authority
The local nginx env-sites configuration for the 物业手持B端 (zhi2-mobile-shimin-h5-b-unlimited) H5 must take its gateway from the panel registry, not from stale conf files or code constants.

## Authority Rule
- The authoritative gateway is `backend_gateway` in the panel `query_env.py` registry, currently `...h5.query...zhishusz.com`.
- The old gateway `www.ylzhwy.com:8081` is deprecated; a stale local conf pointing there caused login rejection.
- The code constant `H5_BASE` must not be changed; the registry is the single source of truth.

## Regeneration Procedure
- env-sites confs are AUTO-GENERATED; never hand-edit them.
- Regenerate with `pwsh -File gen_nginx_sites.ps1` (PowerShell 7); `powershell.exe` 5.1 misreads the no-BOM UTF-8 script as GBK and fails parsing a mangled Chinese comment in a here-string (parse-time failure, so no confs were deleted).
- On 2026-11-26 the generator rebuilt 19 confs; back up first because it deletes and regenerates all env-sites confs.
- Generator normalization of unrelated confs (for example 惠山C端-local.conf: trailing slash, template structure) was harmless because the gateway domain was unchanged.

## Verification
- After regeneration, `nginx -t` passed and `nginx -s reload` exited 0.
- A `getCaptcha` probe returned 401 "令牌不能为空" with `x-proxy-url` pointing to the new gateway `...172.10.1.2:8080/...`, confirming the new gateway was reached and the backend was reachable.
- Old confs were backed up to `$env:TEMP\zentao-2953\env-sites-backup-20261126-170214`.

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-yulin-all-wuguan-fe-zhi2-mobile-shimin-h5-b-unlimited",
  "category": "technical_pattern",
  "name": "h5_gateway_registry",
  "source_extraction_id": "8636480e7e67417d8e200320f8bf5f11",
  "version": 1,
  "memory_type": "entities"
}
-->
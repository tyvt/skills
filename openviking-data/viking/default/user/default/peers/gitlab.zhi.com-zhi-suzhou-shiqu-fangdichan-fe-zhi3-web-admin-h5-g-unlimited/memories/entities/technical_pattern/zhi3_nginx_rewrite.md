# zhi3 UAT nginx rewrite and sync pitfalls
Reusable fix for the UAT real-device verification path where nginx stripped the /api/v3.0 prefix and the gateway returned 405.

## Root cause and fix
- Gateway requires the /api/v3.0 prefix preserved (200); nginx rewrote it to /v3.0 (405).
- gen_nginx_sites.ps1 v2.0 handler already used identity rewrite; v3.0 used a legacy strip.
- Fixed gen_nginx_sites.ps1:76-80 by changing v3.0 to identity rewrite preserving the prefix, then converged via the sanctioned sync script.
- Do not run the registry prune script: fdc-v3 has a local row but UAT intentionally uses a reachable remote gateway.

## sync.ps1 pitfalls
- load_registry() returns 3 values but sync.ps1 unpacks 2 - pre-existing bug, narrow-fixed at :51/:108.
- sync.ps1 uses -AsHashtable (PS6+); run it with pwsh, not Windows PowerShell 5.1.
- Sync rolled back on probe failure, but rollback only restores sites-enabled, not env-sites, so the new conf stayed live; the probe failure on unrelated sites was transient.
- Verification: curl localhost:8103/api/v3.0/code and getInfo = 200; nginx -t passed.


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "technical_pattern",
  "name": "zhi3_nginx_rewrite",
  "source_extraction_id": "f4dfbca852d94ce59128ee1cf190b00f",
  "version": 1,
  "memory_type": "entities"
}
-->
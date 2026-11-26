# Deploy Env Dashboard
The deploy-env dashboard is a deployment environment board maintained by the peer.

## Core Configuration
- Runs on port 18098 with a SQLite registry.
- Uses nginx sites and proxy as a single source of truth.
- Provides five environment slot views; registry.sqlite is git-tracked.
- conf_path_for prefers env-sites and falls back by display_name, project, project_key, and listen port.

## Credentials Registry
- Credentials database holds 34 env rows across two tables plus a password_plain column.
- Ten slash-style mismatched references were corrected to canonical viking format.
- Five historical accounts were added: 2 admin, 2 business test, and 1 fdc-v3 local.

## Privacy Database
- Privacy database entries deploy_env-pwd-county, deploy_env-pwd-fangxun, and deploy_env-pwd-super can decrypt plaintext.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "software_system",
  "name": "deploy_env_dashboard",
  "source_extraction_id": "e2f409bd407d469e808bee653001c5b7",
  "version": 1,
  "memory_type": "entities"
}
-->
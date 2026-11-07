# Portal Site
Main zhi2-web-admin frontend served via nginx UI panel.
## Description
- Config file: D:/nginx/conf/sites-enabled/门户.conf with root D:/repository/门户/dist.
- Listens on port 8092 with server_name localhost as of 2026-11-06.
## Relations
- Shares nginx with 家园区一网通办H5; port conflict resolved by moving H5 to 8093.

<!-- MEMORY_FIELDS
{
  "category": "nginx_site",
  "name": "portal_site",
  "source_extraction_id": "6008127eaf5f4adab68aa88b962df001",
  "version": 1,
  "memory_type": "entities"
}
-->
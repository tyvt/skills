# Portal Site
Main zhi2-web-admin frontend served via nginx UI panel.
## Description
- Config file: D:/nginx/conf/sites-enabled/门户.conf with root D:/repository/门户/dist.
- Listens on port 8092 with server_name localhost; nginx confirmed live (PIDs 9284/24964) serving HTTP 200 with `#app` from freshly built dist as of 2026-11-09.
- Managed via `D:
ginx-ui`; config file D:/nginx/conf/sites-enabled/门户.conf.
## Relations
- Shares nginx with 家园区一网通办H5; port conflict resolved by moving H5 to 8093.

<!-- MEMORY_FIELDS
{
  "category": "nginx_site",
  "name": "portal_site",
  "source_extraction_id": "3f8bcd6e7f49437db25f9340f2e82d0f",
  "version": 2,
  "memory_type": "entities"
}
-->
# Jiayuanqu H5
H5 site for 家园区一网通办 (public opinion survey) served via nginx.
## Description
- Config file: D:/nginx/conf/sites-enabled/家园区一网通办H5.conf with root D:/repository/家园区一网通办/dist.
- Used for survey scoring and pagination verification (bug6234).
- Listen port changed from 8092 to 8093 on 2026-11-06 to resolve conflict with portal.
## Relations
- Accessed at http://localhost:8093/ (302 redirect to /wechatapph5/); config maintained via nginx UI panel.

<!-- MEMORY_FIELDS
{
  "category": "nginx_site",
  "name": "jiayuanqu_h5",
  "source_extraction_id": "6008127eaf5f4adab68aa88b962df001",
  "version": 1,
  "memory_type": "entities"
}
-->
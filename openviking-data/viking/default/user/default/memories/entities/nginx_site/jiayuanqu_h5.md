
# Jiayuanqu H5
H5 site for 家园区一网通办 (wechatapph5, public-opinion survey system), served via nginx; wechatapph5 is the current project.
## Description
- Local dev config: D:/nginx/conf/sites-enabled/家园区一网通办H5.conf, listen 8093, alias D:/repository/家园区一网通办/dist/, location /wechatapph5/ with try_files $uri $uri/ /wechatapph5/index.html.
- Local port changed from 8092 to 8093 on 2026-11-06 to resolve conflict with portal; used for survey scoring and pagination verification (bug6234).
- Local config had NO Cache-Control output, causing browser/WebView heuristic caching of stale HTML; fix is add_header Cache-Control "no-cache" always on the HTML location and a regex location for assets with "public, max-age=31536000, immutable".
- Production: server listen 10001, root D:/wechatapph5/dist, pure static hosting by nginx (no backend), fronted by outer portal nginx (upstream be_10001 -> 172.24.96.6:10001 wechatapph5).
- Production 10001 server keeps API locations (/api/actuator, /api/druid, /api/swagger-resources, /api/version/1/) handled by backend; static files and fallback HTML get Cache-Control headers.
## Caching Fix Notes
- Config change only controls FUTURE caching; historical cached WebView users are not guaranteed an immediate refresh.
- Mini-program web-view src must append release version (?v=release_number, placed before #, not the token) to bust old caches; both measures together are required.
## Relations
- Accessed locally at http://localhost:8093/ (302 redirect to /wechatapph5/); config maintained via nginx UI panel.
- Production config reload done via nginx panel to avoid panel/disk drift.


<!-- MEMORY_FIELDS
{
  "category": "nginx_site",
  "name": "jiayuanqu_h5",
  "source_extraction_id": "16054981eae64762a4542dd893974a3d",
  "version": 2,
  "memory_type": "entities"
}
-->
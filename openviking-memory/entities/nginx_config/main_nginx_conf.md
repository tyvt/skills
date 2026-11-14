
# Main Nginx Conf Windows
Main reverse-proxy nginx.conf for the production Windows Server (nginx-1.30.4).
## Description
- Windows-specific corrected v3 config; fixed v2 error where stream-module ssl_handshake_timeout was wrongly used in the HTTP block (unsupported there), replaced by client_header_timeout to govern TLS handshake and request-header read.
- worker_processes 1 (Windows: only one worker actually does work); worker_connections 1024 (FD_SETSIZE=1024 compile-time hard limit); sendfile off (Windows defect); tcp_nodelay on; server_tokens off.
- Timeouts tightened: client_header_timeout 10s, client_body_timeout 15s, send_timeout 15s, keepalive_timeout 15s; ssl_session_timeout 10m, ssl_session_tickets off, ssl_prefer_server_ciphers on (ssl_session_cache declared in 443.conf to avoid zone conflict).
- access_log buffer=256k flush=5s; geo $white_ip whitelist plus limit_req/limit_conn zones with static assets exempted via empty-key map (limit_req off is Tengine-only); includes D:/www/conf.d/*.conf.
## Upstreams
- sipps-g: 127.0.0.1:5081; sipps-app-api: 172.24.96.6:9980/9981; be_880/881/882/80: 172.24.96.2; be_8899/8080: 172.24.96.4.
- be_10001: 172.24.96.6:10001 (wechatapph5); be_18666: 172.24.96.6; be_8092: 172.24.96.7:8092; be_5081: 172.24.96.5:5081.
- be_8961: 172.24.96.3:8961; be_8892: 172.24.96.3:8892; be_18080: 172.24.96.2:18080.
## Relations
- Acts as the reverse-proxy layer; site configs live in D:/www/conf.d/*.conf.
- 家园区一网通办H5 production is served via upstream be_10001 -> 172.24.96.6:10001.


<!-- MEMORY_FIELDS
{
  "category": "nginx_config",
  "name": "main_nginx_conf",
  "source_extraction_id": "16054981eae64762a4542dd893974a3d",
  "version": 1,
  "memory_type": "entities"
}
-->
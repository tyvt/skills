# 惠山物管V1 本地 nginx 部署
惠山物管V1 前端在本机 nginx 上的自建部署站点，服务 localhost:8100。

## 配置与地址
- 站点配置：`D:\nginx\conf\sites-enabled\惠山物管V1.conf`（本任务自建部署配置，不改系统 hosts）
- 访问地址 `http://localhost:8100/`，静态根目录为本地构建产物 dist
- 接口经 `/prod-api/` 前缀代理；后端测试站真实 IP 为 `180.101.184.99:8280`，直连 `https://180.101.184.99:8280/prod-api/code` 返回 200

## 2026-11-24 的 502 修复
- 根因：测试站域名被泛解析到假 IP `192.168.1.31`（超时不通），nginx 用域名 proxy_pass 必返 502
- 修复：将 conf 中两处 `proxy_pass` 改为 IP 直连 `https://180.101.184.99:8280` 并加 `proxy_ssl_verify off`，reload 后 `/prod-api/code` 返回 200
- 依据交接文档第 9 节授权的「改用直连后端」路线，未改动 hosts

<!-- MEMORY_FIELDS
{
  "category": "部署环境",
  "name": "huishan_v1_nginx",
  "source_extraction_id": "c93f64a2f8b54c0987448eaafdb81566",
  "version": 1,
  "memory_type": "entities"
}
-->
# 门户后端服务
H5 门户对应的本地后端服务，由网关与门户服务组成。

## Description
- 网关服务监听 8086（2026-11-12 PID 20956），门户服务监听 9222（2026-11-12 PID 21336）。
- 网关路由 /v3.0/portal/appLogin/* 等请求至门户服务。

## Relations
- 前端请求链路：nginx(8091) → 网关(8086) → 门户(9222)。
- 联调分支 feature/feat-dzc-261111 提交 484848e「固定短信验证码（联调用）」，可用固定码免真实短信下发。

<!-- MEMORY_FIELDS
{
  "category": "后端服务",
  "name": "backend_gateway_portal",
  "source_extraction_id": "464e8c3e619f4a239f1599fae732f5a7",
  "peer_id": "D--repository---H5",
  "version": 2,
  "memory_type": "entities"
}
-->
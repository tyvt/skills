# 门户数据服务静默回退
苏住房C 门户H5（zhi2-mobile-query-h5-c）的 portalData.ts 在接口异常时静默回退到 portalSeed.ts 设计稿数据，不弹 toast，避免网关缺服务时白屏。

## 模式判定
- remote + 已登录才发请求（portalData.ts 做模式判定）
- 接口异常时静默回退 portalSeed.ts 的设计稿数据，不弹 toast
- 目的：避免网关缺服务时白屏

## 响应解包
- 分页响应为根级 {total,rows}，已用 raw:true 正确解包

## 涉及文件
- src/utils/portalData.ts（模式判定与回退）
- src/mock/portalSeed.ts（设计稿兜底数据）
- src/api/portal.ts（统一 /api + /v2.0 前缀）
- src/utils/request.ts（补 headers 选项，queryUser 需 zs-desensitize-flag: 0）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_data_fallback",
  "source_extraction_id": "3810ba31cdfd478fac2ea4f468b24659",
  "version": 1,
  "memory_type": "entities"
}
-->
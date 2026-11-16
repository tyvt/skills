# 网关脱敏头字段需统一使用 zs- 前缀
苏住房 C 端（zhi2-mobile-shimin）后端要求网关头字段统一使用与 zs-method 一致的 zs- 前缀；gateway.js 已改为写入 zs-desensitize-flag 并保留大小写兼容回退，user.js/autonomy.js 的业务请求头也统一为 zs- 前缀。

## 根因
- 后端要求网关头字段使用 zs- 前缀，与 zs-method 等保持一致

## 解决方案
- gateway.js 将网关头字段写为 zs-desensitize-flag，兼容多种大小写回退链：customHeaders['zs-desensitize-flag'] ?? customHeaders['ZS-DESENSITIZE-FLAG'] ?? customHeaders['Desensitize-Flag'] ?? customHeaders['desensitize-flag'] ?? customHeaders['DESENSITIZE-FLAG']
- user.js / autonomy.js 的业务请求头统一为 zs- 前缀

## 涉及文件
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/gateway.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/store/user.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/message/message.vue
- d:/repository/苏住房C/szffluzm/index.html
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/autonomy.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/httpInstance.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/sfb.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/security.js

## 验证与归属
- 验证证据：extracted source=cursor session=3c9178fd-8c0a-4ebe-bb2c-b90f30794556
- 代码基线：无

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "gateway_header_zs_prefix",
  "source_extraction_id": "00a08230b40345aa9d5dac9102965f54",
  "version": 3,
  "memory_type": "entities"
}
-->
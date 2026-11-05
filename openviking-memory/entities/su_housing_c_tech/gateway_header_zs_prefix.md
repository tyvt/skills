# Gateway Header Desensitization Field Must Use Unified zs- Prefix
In Su Zhu Fang C (zhi2-mobile-shimin), the backend requires gateway header fields to use the zs- prefix consistent with zs-method. gateway.js was changed to write the field as zs-desensitize-flag with case-insensitive compatibility, and user.js/autonomy.js business request headers were unified to the zs- prefix.

## Root Cause
- Backend requires gateway header fields to use the zs- prefix, consistent with zs-method and others

## Solution
- gateway.js writes the gateway header field as zs-desensitize-flag，兼容多种大小写回退链：customHeaders['zs-desensitize-flag'] ?? customHeaders['ZS-DESENSITIZE-FLAG'] ?? customHeaders['Desensitize-Flag'] ?? customHeaders['desensitize-flag'] ?? customHeaders['DESENSITIZE-FLAG']
- user.js / autonomy.js business request headers unified to the zs- prefix

## Involved Files
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/gateway.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/store/user.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/message/message.vue
- d:/repository/苏住房C/szffluzm/index.html
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/autonomy.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/httpInstance.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/sfb.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/security.js

## Verification and Attribution
- Verification evidence: extracted source=cursor session=3c9178fd-8c0a-4ebe-bb2c-b90f30794556
- Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "gateway_header_zs_prefix",
  "source_extraction_id": "cbccc77e23c04a3fb98fe21d70df4ad3",
  "version": 2,
  "memory_type": "entities"
}
-->
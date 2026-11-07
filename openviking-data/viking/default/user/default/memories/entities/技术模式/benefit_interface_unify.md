# benefit.js 接口格式统一
i淮安H5 的 benefit.js 中 4 个接口已统一为与其他接口一致的格式。

## 修改文件
- `zhi2-mobile-admin-h5-c-unlimited/src/api/benefit.js`
- 来源上下文另涉及 `src/pages/index/home.vue`、`src/store/user.js`、`src/pages.json`

## 主要改动
- 函数签名从 `export async function xxx(query, options = {})` 改为 `export function xxx(params)`
- 请求从 `http.get(..., query, {}, { ... })` 改为 `api.get(..., { params })`
- 去掉多余分号与 `options` 透传，风格与本文件其他接口保持一致

## 验证与归属
- 验证证据：extracted source=cursor session=11851de5-f99c-42f7-a3d4-0a24cc94bf1c
- 所属项目：i淮安公版；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_interface_unify",
  "source_extraction_id": "6b6b7a1e838b47d5a987671a16add438",
  "version": 1,
  "memory_type": "entities"
}
-->
# benefit.js 接口格式统一
i淮安公版项目将 benefit.js 中4个接口统一为与其他接口一致的格式，消除冗余透传。

## 问题背景
- zhi2-mobile-admin-h5-c-unlimited/src/api/benefit.js 中原接口风格不一致，带多余 options 透传与分号

## 修复方案
- 函数签名由 `export async function xxx(query, options = {})` 改为 `export function xxx(params)`
- 请求由 `http.get(..., query, {}, { ... })` 改为 `api.get(..., { params })`
- 去掉多余分号与 options 透传，风格与本文件其他接口保持一致

## 验证与归属
- 修改文件：src/api/benefit.js（另涉及 home.vue、store/user.js、pages.json 等联调）
- 验证证据：extracted source=cursor session=11851de5-f99c-42f7-a3d4-0a24cc94bf1c
- 所属项目：i淮安公版（zhi2-mobile-admin-h5-c-unlimited）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_js_api_unify",
  "source_extraction_id": "705838ed64b04edca34ff7d7481f3cbd",
  "version": 1,
  "memory_type": "entities"
}
-->
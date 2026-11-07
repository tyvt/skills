# 小区公告 benefit.js 接口格式统一
i淮安公版项目将 benefit.js 中标出的 4 个接口统一为与其他接口一致的调用格式。

## 修改文件
- zhi2-mobile-admin-h5-c-unlimited/src/api/benefit.js

## 主要改动
- 函数签名从 `export async function xxx(query, options = {})` 改为 `export function xxx(params)`
- 请求方式从 `http.get(..., query, {}, { ... })` 改为 `api.get(..., { params })`
- 去掉多余分号与 `options` 透传，风格与本文件其它接口保持一致
- 已检查 lint，确认无报错

## 验证与归属
- 验证证据：extracted source=cursor session=11851de5-f99c-42f7-a3d4-0a24cc94bf1c
- 涉及文件：src/api/benefit.js（上下文另提及 home.vue、store/user.js、pages.json）
- 所属项目：i淮安公版；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_api_unify",
  "source_extraction_id": "e3cbebe62b9d478abcac144b427d9a1d",
  "version": 1,
  "memory_type": "entities"
}
-->
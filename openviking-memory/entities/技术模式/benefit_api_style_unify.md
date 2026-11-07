# benefit.js 接口格式统一改造
i淮安公版项目 zhi2-mobile-admin-h5-c-unlimited 的 benefit.js 中 4 个接口已统一为与其他接口一致的格式。

## 修改内容
- 函数签名从 `export async function xxx(query, options = {})` 改为 `export function xxx(params)`
- 请求调用从 `http.get(..., query, {}, { ... })` 改为 `api.get(..., { params })`
- 去掉多余的分号和 `options` 透传，风格与本文件其它接口保持一致

## 验证与归属
- 验证证据：extracted source=cursor project=i淮安公版
- 已检查 lint 无报错
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/api/benefit.js
- 所属项目：i淮安公版；来源会话：11851de5-f99c-42f7-a3d4-0a24cc94bf1c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_api_style_unify",
  "source_extraction_id": "c92a3dfa52c34609806fbce67331f399",
  "version": 1,
  "memory_type": "entities"
}
-->
# benefit.js 接口未统一为 api.get 格式
i淮安H5 的 benefit.js 中 4 个接口原风格不一致，已统一改为 api.get 调用。

## 问题根因
- zhi2-mobile-admin-h5-c-unlimited/src/api/benefit.js 中 4 个接口原使用 `export async function xxx(query, options={})` 透传 options 给 http.get
- 风格与项目统一 api.get 约定不一致

## 修复方案
- 改为 `export function xxx(params)` 并调用 `api.get(..., { params })`
- 去除多余分号与 options 透传

## 验证与归属
- 验证证据：extracted source=cursor session=11851de5-f99c-42f7-a3d4-0a24cc94bf1c
- 涉及文件：src/api/benefit.js、src/pages/index/home.vue、src/store/user.js、src/pages.json
- 所属项目：i淮安H5（zhi2-mobile-admin-h5-c-unlimited）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_api_get",
  "source_extraction_id": "6a92cd0d2cf745689e77dc42af9f9088",
  "version": 1,
  "memory_type": "entities"
}
-->
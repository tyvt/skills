# regionBankAuth 区级节点 regionCode 修复
苏住房G(zhi2-web-admin) `system/regionBankAuth` 页面已修复区级节点 `regionCode` 为空导致请求只带 `parentDeptId` 的问题。
## 问题原因
- `areaCodeTree` 接口返回 `areaCode`，但合并区划编码时只读了 `region` 字段，导致区级节点 `regionCode` 一直为空。
## 修复方式
- `utils.js`：区级节点 `regionCode = areaNode.region || areaNode.areaCode`；新增 `resolveDistrictRegionCode` 按 `deptId` 从 `areaCodeTree` 兜底查找。
- `index.vue`：`setNodeContext` 选中区级节点写入 `queryParams.regionCode`；`getList` 区级请求前确认 `params.regionCode` 有值；`refreshCurrentNodeContext` 在树异步加载完成后自动补发列表请求。
## 验证与归属
- 涉及文件：system/regionBankAuth/index.vue、system/regionBankAuth/utils.js
- 所属项目：苏住房G；来源会话：47d60d2a-587e-4806-bba5-e7aa15aae607；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "regionbankauth_areacode_fix",
  "source_extraction_id": "048951ab304943a585dc23187ac29bde",
  "version": 1,
  "memory_type": "entities"
}
-->
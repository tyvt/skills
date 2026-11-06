# 区域银行授权区级节点regionCode缺失修复
苏住房G项目regionBankAuth模块因areaCodeTree接口返回areaCode但合并时只读region字段，导致区级节点regionCode为空，已修复。

## 问题原因
- areaCodeTree接口返回的是areaCode，但合并区划编码时只读了region字段，导致区级节点regionCode一直为空
- 请求里只剩RegionTreeLayout自动带的parentDeptId，区级列表请求缺少regionCode

## 修复内容
- utils.js正确映射areaCode→regionCode（区级节点regionCode = areaNode.region || areaNode.areaCode）
- utils.js新增resolveDistrictRegionCode，在树节点匹配失败时按deptId从areaCodeTree兜底查找
- index.vue的setNodeContext选中区级节点时写入queryParams.regionCode
- index.vue的getList区级列表请求前再次确认params.regionCode有值
- index.vue的refreshCurrentNodeContext在areaCodeTree异步加载完成后，若当前是区级节点且已解析出regionCode自动补发列表请求

## 涉及文件与归属
- 文件：zhi2-web-admin/src/views/system/regionBankAuth/index.vue、utils.js
- 所属项目：苏住房G；来源会话：47d60d2a-587e-4806-bba5-e7aa15aae607；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_district_code_fix",
  "source_extraction_id": "ad128491ddb047a6bbc7e9b936d4e89b",
  "version": 1,
  "memory_type": "entities"
}
-->
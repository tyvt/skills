# 区域银行授权页区级请求漏带regionCode
区域银行授权列表页选中区级节点时请求只带 parentDeptId 而无 regionCode，导致区级数据口径错误且静默无报错。

## 问题根因
- 页面 /v2.0/system/regionBankAuth/page 选中区级节点时请求仅带 RegionTreeLayout 自动附的 parentDeptId
- 区划树接口 /v2.0/system/dept/areaCodeTree 下发字段名为 areaCode
- 合并区划编码的 utils 只读 region 一种形态，区级节点 regionCode 被算成空值后被请求参数构造静默丢弃
- areaCodeTree 异步加载，首屏选中节点时可能未返回，导致 regionCode 永远缺失

## 解决方案
- 树节点合并函数写 areaCode→regionCode 双候选（region || areaCode），不认单一字段名
- 新增 resolveDistrictRegionCode 兜底解析，树节点匹配失败时按 deptId 回 areaCodeTree 反查
- setNodeContext 选中区级节点写入 queryParams.regionCode，getList 前确认有值
- 树异步加载完成后，针对「当前区级节点且已解析 regionCode」自动补发一次列表请求

## 验证与归属
- 验证证据：会话 47d60d2a 确认根因为 areaCodeTree 返回 areaCode 而合并只读了 region 字段
- 涉及文件：zhi2-web-admin/src/views/system/regionBankAuth/utils.js、index.vue
- 所属项目：苏住房G；来源会话ID：47d60d2a-587e-4806-bba5-e7aa15aae607；代码基线：c176892

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_auth_regioncode",
  "source_extraction_id": "d232d627a6c741e59b90b3a2003fb294",
  "version": 1,
  "memory_type": "entities"
}
-->
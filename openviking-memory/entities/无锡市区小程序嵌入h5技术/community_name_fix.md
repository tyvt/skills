# 维修资金页所属小区不显示修复
维修资金页「所属小区」字段因仅从URL/store读取而小程序嵌入H5只传houseId致不显示，已增加接口与房屋列表兜底逻辑修复。

## 问题根因
- 「所属小区」原先只从URL参数complexName或userStore.projectName读取
- 小程序嵌入H5时通常只传houseId，余额和「房屋位置」来自外部接口/getHouseInfo能正常显示，小区名却为空

## 解决方案
- maintain/index.vue增加resolveCommunityName，按优先级取值：URL/store小区名→接口complexName/projectName/communityName→据houseId从房屋列表匹配complexName
- h5Context.js在getH5Selection中增加从houseList按houseId查找小区名的兜底逻辑
- 刷新后「所属小区」应显示（如「海悦花园」），仍为空需确认getHouseInfo是否返回小区名字段

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：src/pages_owner/maintain/index.vue、src/utils/h5Context.js、src/store/repair.js、src/api/repair.js
- 来源会话：6c36b4fe-74d0-426f-82e3-e6ed3c6e89a6
- 所属项目：无锡市区小程序嵌入H5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "community_name_fix",
  "source_extraction_id": "63dce1141adb41349106ccb0a7746519",
  "version": 1,
  "memory_type": "entities"
}
-->
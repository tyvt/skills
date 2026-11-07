# 小程序嵌入H5只写project/projectName时公共收益地址显示-的修复
嵌入场景未同步regionName等导致benefit页projectAddress为空或显示-，须setProjectInfo与projectAddress多级回退。

## 问题根因
- 嵌入场景App.vue曾只写project/projectName，未通过setProjectInfo/applyHouseSelection/applyProjectSelection同步regionName、subdistrictName、communityName、address等
- benefit/index仅在找不到当前小区时才setProjectInfo，找到时未同步导致projectAddress仍空
- 部分页误用不存在的userStore.constructionNo/roomNo

## 解决方案
- 有token时initH5Context拉getMyHouseList，按URL的houseId/complexId调用applyHouseSelection或applyProjectSelection（逻辑与newHome.vue一致，可抽到useProjectState.js）
- projectAddress显示优先区划拼接，其次userStore.address，再从houseList取当前小区房屋
- 页面onShow在字段仍空且已登录时重复拉房屋/小区接口补全
- 楼栋展示用userStore.address（楼栋-单元-房号格式），勿引用未定义store字段
- elevatorPubEngCons/index.vue模板由原 `[userStore.projectName, userStore.address].filter(Boolean).join("-")` 改为 `{{ projectAddress || "-" }}`
- 新增与benefit页一致的 `buildRegionAddress` 和 `projectAddress` 计算属性，从 userStore.houseList 按当前项目匹配房屋，优先拼接 regionName-subdistrictName-communityName，否则回退 house.address
- 在 onLoad 中调用 ensureProjectInfo() 确保进入页面时房屋/项目信息已就绪，地址能正确显示

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：ba74b018-bf87-4283-b5cd-cdbfcdac22a7
- 验证会话：ba74b018-bf87-4283-b5cd-cdbfcdac22a7、c484b1ef-d8e5-4052-a213-4476498f8145（基线0804e57），用户报benefit/elevatorPubEngCons字段未赋值或projectAddress为-；会话07179d96参照benefit页调整elevatorPubEngCons地址取值模式（代码基线：none）
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/App.vue、src/pages/index/useProjectState.js、src/pages_benefit/benefit/index.vue、src/pages_benefit/elevatorPubEngCons/index.vue、src/store/user.js
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "projectaddress_fallback",
  "source_extraction_id": "75bbb1101ba1415cb00e5e2a501d635d",
  "version": 2,
  "memory_type": "entities"
}
-->
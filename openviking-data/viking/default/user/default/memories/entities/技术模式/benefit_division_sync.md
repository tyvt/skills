# 首页进公共收益未同步区划
i淮安H5 从首页进入公共收益页因未同步区划导致街道社区为空。

## 根因
- 公共收益页顶部「区-街道-社区」来自 userStore 的 regionName、subdistrictName、communityName
- 小区 tab（property）通过 syncProjectState → listComplexCommunitySubdistrictByToken 写入带区划的小区数据
- 首页（newHome）选房后只用 getMyHouseList 的房屋数据调用 setProjectInfo，接口往往缺少完整街道社区名
- 公共收益页 getProjectList 仅当 userStore.project 不在返回列表时才 setProjectInfo，匹配到当前小区就不再补全区划

## 修复方案
- 在 src/pages_benefit/benefit/index.vue 匹配或回退第一条数据时均执行 syncProjectRowFromApi
- 调用 listComplexCommunitySubdistrictByToken 补全区划

## 验证与归属
- 验证：extracted source=cursor session=46c27cd4-761e-4410-842c-b18b6e2dfed3
- 涉及文件：src/pages/index/newHome.vue、src/pages/index/property.vue、src/store/user.js、src/pages/index/useProjectState.js、src/pages_benefit/benefit/index.vue
- 所属项目：i淮安H5；来源会话：46c27cd4-761e-4410-842c-b18b6e2dfed3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_division_sync",
  "source_extraction_id": "d7385f0789234873a5f09e9954f78313",
  "version": 2,
  "memory_type": "entities"
}
-->
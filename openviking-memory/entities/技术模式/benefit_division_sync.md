# 首页进公共收益未同步区划
i淮安H5 从首页进入公共收益页因未同步区划导致街道社区为空。

## 根因
- 公共收益页 getProjectList 匹配到当前小区后不再调用维表接口补全区划
- 首页 setProjectInfo 缺乏街道社区名，导致从首页进入时数据为空

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
  "source_extraction_id": "9505a034bcf340cb94beac01c0553352",
  "version": 1,
  "memory_type": "entities"
}
-->
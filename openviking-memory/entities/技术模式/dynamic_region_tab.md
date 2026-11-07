# 区域Tab动态配置筛选模式
苏住房G首页/大屏区域Tab禁止前端写死，须由platformConfig.region推导市级编码并异步拉取行政区划，加请求序号防竞态。

## 背景与动机
- 项目按地市复制部署，区县清单属部署配置而非代码常量，写死会导致复制到其他城市时Tab与后台不一致需改码发版
- 旧分支直接读platformConfig.regions或硬编码苏州区县名，需统一动态化

## 解法要点
- 新增fetchCityRegionTabOptions：getCityRegionCode()取市级编码，调/system/region/list拉下属区划，mapRegionSortListToTabOptions映射，导出CITY_WIDE_TAB_OPTION「全市」置顶
- 页面index-v2.vue删除硬编码与platformConfig.regions分支，改异步loadRegionOptions()
- 异步必须加regionOptionsFetchSeq请求序号守卫，只接受最新响应防快速切地市竞态
- 接口失败或空时仅保留「全市」并console.warn，不白屏
- 本地preview-main.js补platformConfig.region:'320500'与接口mock，E2E加mockRegionSortList并拦截

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：views/property/largeScreen/utils.js、views/home/index-v2.vue、v2/components/RegionTabs.vue、publicQuery/complex/index.vue、tests/e2e/home-v2.spec.mjs、tests/e2e/home-v2-mocks.js、preview/stub/api.js、preview-main.js等
- 所属项目：苏住房G；来源会话ID：ce428e8e-b7cf-41be-97cd-31a190c4c9fb；代码基线：15e201a
- 注意：若platformConfig.region登录后才写store，需watch重新加载

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dynamic_region_tab",
  "source_extraction_id": "bbef648410d54c61896564bae729c765",
  "version": 2,
  "memory_type": "entities"
}
-->
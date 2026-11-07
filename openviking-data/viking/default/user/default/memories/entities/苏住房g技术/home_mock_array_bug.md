# 首页大屏 Mock 响应形态缺陷
苏住房G 首页 index-v2 大屏区县 Tab 因 $get mock 直接返回裸数组导致静默降级只剩「全市」Tab。

## 问题现象
- fetchCityRegionTabOptions 解析区县 Tab，生产路径 fetchRegionSortList 走 (res.data || []).map(...)，依赖 axios 拦截器返回 {code,msg,data} 外壳。
- preview-main.js 的 $get mock 与 e2e home-v2-mocks.js 的 mockRegionSortList 若直接 resolve 数组，区县列表为空只剩「全市」。

## 根因
- 解析函数只读 res.data，对数组取 .data 得 undefined → 走 `|| []`；不抛错只打 console.warn，属不报错但功能缺失的静默降级，E2E 不红。

## 修复与预防
- 所有 $get/$post mock 统一返回 {code,msg,data} 外壳，data 内才是列表。
- 新增解析函数先对照 src/api/portal/home.js 注释确认响应形态，与 publicQuery/complex/index.vue 等 (res.data || []) 写法一致。
- 排查「列表空但无报错」优先怀疑响应体层级而非接口参数；涉及文件 largeScreen/utils.js、preview-main.js、home-v2-mocks.js、publicQuery/complex/index.vue；基线 15e201a。

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "home_mock_array_bug",
  "source_extraction_id": "7d100a0bc1f64c549abc1801c01d6406",
  "version": 1,
  "memory_type": "entities"
}
-->

# 我的房屋历史记录空数据导致加载卡死修复
苏住房C「我的-我的房屋」未添加过房屋的用户点击历史添加记录时，因接口返回 rows:null 调用 .map() 报错，页面一直停在「正在加载..」。

## 问题根因
- 接口无历史记录时返回 rows:null（total:"0", rows:null）
- history.vue 直接对 res.rows 调用 .map()，null.map() 抛错
- 外层 Promise 既不 resolve 也不 reject，z-paging 的 completeByTotal 不被调用，页面卡在加载中

## 修复方案
- 修改 src/pages_owner/house/history.vue：使用可选链和默认空数组 res.rows?.map(...) || []，与 tenant/history.vue 写法一致
- 补充 .catch(reject)，接口异常时也能正确结束加载
- 修复后无数据正常结束加载，由 ZsPaging 组件默认展示「暂无数据」空态

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_owner/house/history.vue、tenant/history.vue、pages_owner/house/index.vue、pages.json
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：d96faf99-8932-4fca-b475-a68344311240；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "house_history_null_map_fix",
  "source_extraction_id": "b4dab85f66b143b3b0951d4f778fb563",
  "version": 1,
  "memory_type": "entities"
}
-->
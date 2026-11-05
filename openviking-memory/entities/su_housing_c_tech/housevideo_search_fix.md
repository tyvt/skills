# 视频看房搜索框被覆盖修复
苏住房C小程序「视频看房」页面搜索框被 z-paging 遮挡，已通过将搜索框移入 #top 插槽修复。

## 问题根因
- ZsSearch 放在 z-paging 外面
- z-paging 默认全屏固定定位，会盖住上方的搜索框，导致搜索栏不可见

## 修复内容
- 参考同项目 goodProject/index.vue，将搜索框移到 z-paging 的 #top 插槽
- 列表组件正确预留顶部区域，搜索框正常显示在列表上方

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：zhi2-mobile-shimin/src/pages_transaction/houseVideo/index.vue、goodProject/index.vue
- 来源会话ID：4c88e3b6-b478-4a11-8f21-8050ecd743a5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "housevideo_search_fix",
  "source_extraction_id": "0842d2bc9d344262a3fdeea27c8b4603",
  "version": 1,
  "memory_type": "entities"
}
-->
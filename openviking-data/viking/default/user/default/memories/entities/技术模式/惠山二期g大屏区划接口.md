# 惠山二期G大屏区划接口
惠山二期G物管大屏区级场景通过腾讯行政区划WebService接口按参数拉取街道级轮廓，get_polygon=3是请求参数而非独立接口。
## 接口说明
- 获取子级区划（大屏区级主要用）：GET https://apis.map.qq.com/ws/district/v1/getchildren
- 按adcode搜索单条区划（兜底逐条拉街道）：GET https://apis.map.qq.com/ws/district/v1/search
## 关键参数
- id：父级区划adcode，如320206（惠山区）
- get_polygon=3：请求街道级轮廓（非独立接口，仅为参数）
- max_offset：抽稀精度（米），如100
- keyword：传6位adcode（search接口），如320206001
## 项目归属
- 所属项目：惠山二期G；代码基线：none
- 涉及文件：src/views/property/largeScreen/index.vue、components/componentMap.vue、utils.js、tencentDistrictBoundary.js
- 来源会话：97ab338d-fe13-43ec-b738-f0e3304a4393

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "惠山二期G大屏区划接口",
  "source_extraction_id": "4f77472383724b95a4b59f9b96533a19",
  "version": 1,
  "memory_type": "entities"
}
-->

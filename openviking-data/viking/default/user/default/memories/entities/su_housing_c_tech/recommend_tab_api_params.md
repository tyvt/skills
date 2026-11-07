# 推荐Tab接口参数结构
苏住房C（苏找房）推荐Tab的listRecommend为GET接口，需使用扁平参数，而非新房/二手房的POST嵌套结构。

## 接口参数对比
- 推荐Tab：`listRecommend` 为 GET 方法，参数扁平：`pageNo, pageSize, xcoordinate, ycoordinate`
- 新房Tab：`pageByKeyWord` 为 POST 方法，参数嵌套：`{ pageNo, pageSize, t: { reviewState, shelfState } }`
- 二手房Tab：`houseInfoDisplayList` 为 POST 方法，参数嵌套：`{ pageNo, pageSize, t: { accessSource, ... } }`

## 问题根因
- 推荐Tab曾错误套用新房/二手房的POST嵌套`t`结构，导致GET接口收到POST风格参数
- `listRecommend` 是GET接口，使用POST会返回500错误

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：Project_Suzhufang.vue、Home_Suzhufang.vue、buyHouse/index.vue、Community_Suzhufang.vue
- 来源会话ID：65d67b1c-b2d4-4547-b8ef-f723249dbd4e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "recommend_tab_api_params",
  "source_extraction_id": "0632a595a1fc4cbdb2148019d9ed92c3",
  "version": 1,
  "memory_type": "entities"
}
-->
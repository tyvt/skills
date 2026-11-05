# 增梯指引详情页服务器异常修复
苏住房C(zhi2-mobile-shimin)「加装电梯 → 增梯指引」详情页报「服务器异常」，已修正跳转URL拼写与空值校验修复。

## 问题根因
- guideList.vue 跳转 URL 拼写错误：guideDetail??id= 多了一个问号
- guideDetail.vue 未对 options.id 做空值校验，请求了 /article/richText/undefined

## 修复内容
- guideList.vue：修正跳转 URL 为 guideDetail?id=${item.richTextId}
- guideDetail.vue：增加 ID 空值校验，若 options.id 为空提示「参数错误，请返回重试」，不再请求接口

## 验证与归属
- 构建验证：npm run build 成功，产物在 dist/；已确认列表页跳转 URL 为 guideDetail?id=...，详情页含「参数错误」校验
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_owner_extra/elevator/guideList.vue、src/pages_owner_extra/elevator/guideDetail.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：396b7339-8e50-4545-8923-92c3135143b9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "elevator_guide_fix",
  "source_extraction_id": "319434979eb5456683b6c30a531f83cd",
  "version": 1,
  "memory_type": "entities"
}
-->
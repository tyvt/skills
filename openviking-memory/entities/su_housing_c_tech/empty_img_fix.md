# 工作动态空数据默认图修复
苏住房C 为「工作动态」列表页补充空数据默认图，并修复接口失败时空白不显示的问题。

## 修复要点
- 使用 `ZsEmpty` 组件，指定默认图 `images/empty.png`，无数据时显示图片与「暂无数据」/「未查询到相关数据」文案
- 接口失败时 `requested` 未置 `true` 致不显列表也不显空状态，改用 `try/finally` 保证请求结束进入空状态判断
- 判断逻辑由 `total === 0` 改为 `!list.length`，接口异常也能正确显示空状态
- 空状态区域居中，默认图尺寸 320rpx 垂直居中

## 涉及文件
- `zhi2-mobile-shimin/src/pages/property/index.vue`
- `zhi2-mobile-shimin/src/pages_property/rcService/daily.vue`
- `zhi2-mobile-shimin/src/pages_property/rcService/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：42343a4e-0f73-462e-bedb-6499ef092a49
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "empty_img_fix",
  "source_extraction_id": "f38b441ffd5e41d498bcfbd97a45fa4b",
  "version": 1,
  "memory_type": "entities"
}
-->
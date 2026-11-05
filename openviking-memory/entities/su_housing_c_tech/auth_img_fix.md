# 不动产权证区分页图片空白修复
苏住房C「如何区分不动产权证和房产证」页面(`authentication.vue`→`errorTipOne.vue`)图片空白，根因为CSS样式问题，已修复。

## 问题根因
- `ZsImage`组件内部设置`height: 100%`，外层`.img-box`无固定高度
- 页面`.img-box .img`为scoped样式，无法穿透到`ZsImage`子组件内部`<img>`
- 结果图片实际高度为0，只见灰色占位框与下方文字
- 图片文件本身存在于`pages_transaction/static/images/szf/fcz_1~3.png`，非资源缺失

## 修复内容
- 修改`errorTipOne.vue`、`errorTip.vue`、`errorTipTwo.vue`三个文件
- 使用`:deep(img)`穿透子组件，设置`height: auto`让图片按原始比例显示
- 为`ZsImage`显式添加`subpackage="pages_transaction"`确保静态资源路径解析正确

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：authentication.vue、errorTipOne.vue、errorTip.vue、errorTipTwo.vue
- 来源会话ID：293e9168-99d3-401f-9f8a-68fd6f4853a1

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "auth_img_fix",
  "source_extraction_id": "32b9912824bb4746851a7d42adfc4d01",
  "version": 1,
  "memory_type": "entities"
}
-->
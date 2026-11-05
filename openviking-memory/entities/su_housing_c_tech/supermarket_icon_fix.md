# 房产超市图标背景水印修复
苏住房C小程序房产超市列表图标UI异常（灰色圆环水印）已修复，涉及 ZsImage 与超市列表页。

## 问题原因
- 超市 logo 在小程序里用 HTML `<img>`，`mode="aspectFill"` 不生效，大图按原始尺寸溢出形成灰色圆环水印

## 修复内容
- `ZsImage` 组件：小程序端改用 `<image mode="aspectFill">` 正确裁剪；H5 仍用 `<img>` + `object-fit: cover`
- 房产超市列表页：卡片加 `overflow: hidden`；定位图标改为固定尺寸 `ZsImage`

## 验证与归属
- 图标只显示在左侧 120rpx 区域内，背景水印消失
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_transaction/houseSupermarket/index.vue`、`components/ZsImage/ZsImage.vue`、`pages_transaction/service/bankList.vue`
- 来源会话ID：9576e757-ad86-4348-8122-af82c2ba31b7


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "supermarket_icon_fix",
  "source_extraction_id": "7bbfec6e00654c00b561e884e8122dfc",
  "version": 1,
  "memory_type": "entities"
}
-->
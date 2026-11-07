# 房产超市水印溢出容器修复
苏住房C 小程序图片水印溢出右侧文字区，根因是 img object-fit 失效且容器未裁剪，已通过 ZsImage 加 aspectFill 与容器 overflow 修复。

## 问题原因
- 微信小程序 `<img>` 的 `object-fit: cover` 基本不生效，服务端带圆形水印大图按原始尺寸渲染溢出
- 房产超市列表页缩略图容器缺少 `overflow: hidden` 与固定尺寸，无法裁剪溢出部分

## 修复方式
- `ZsImage.vue` 中 `<img>` 增加 `mode="aspectFill"`（与项目其他 image 用法一致）
- `houseSupermarket/index.vue` 增加裁剪容器（参照首页资讯列表模式）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/components/ZsImage/ZsImage.vue`、`src/pages_transaction/houseSupermarket/index.vue`
- 来源会话ID：8c3976ef-34b9-45cd-8872-edd95968dc75

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "watermark_overflow_fix",
  "source_extraction_id": "ae26486ba9aa4613a958cec2e7fe24fa",
  "version": 1,
  "memory_type": "entities"
}
-->
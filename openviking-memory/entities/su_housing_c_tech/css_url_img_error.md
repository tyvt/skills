
# 公告详情页水印CSS url()被误作img src导致加载失败
苏住房C小程序（zhi2-mobile-shimin）中detail.vue将makeWatermark()返回的CSS url()值用作<img>相对路径，导致500加载错误，已改为<view>背景图渲染。

## 问题根因
- detail.vue中`<img :src="watermarkSrc" />`，而makeWatermark()返回`url("data:image/svg+xml,<svg>...</svg>")`，这是给background-image用的CSS值
- 小程序把CSS的`url(...)`语法当成相对路径图片，拼到当前页路径下（如`/pages_main/announcement/url(%22data:image/svg+xml,...%22)`），出现500错误

## 修复方式
- 水印层从`<img>`改为`<view>`，用`backgroundImage`渲染：`<view v-if="watermarkSrc" class="watermark-layer" :style="{ backgroundImage: watermarkSrc }" />`
- 样式改为`background-repeat: repeat`，让水印平铺显示
- 需重新编译小程序，进入公告详情页验证；部分基础库对SVG data URI支持有限，若不显示需进一步处理

## 涉及文件
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_main/announcement/detail.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/announcement/detail.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/index.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/route-map.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：c1c2be72-6443-4d0a-8960-b97194bec465
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "css_url_img_error",
  "source_extraction_id": "e4499bd152024ddfb3f1405d312e4576",
  "version": 2,
  "memory_type": "entities"
}
-->
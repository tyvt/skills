# PageBg背景图变全屏需固定高度包裹盒
苏住房C 小程序中 PageBg 组件因绝对定位铺满 flex:1 容器导致背景图变成全屏，需用固定高度包裹盒约束。

## 问题现象
- pages_owner/house/TypeChoose 页面顶部蓝色背景图变成铺满整屏，下方卡片区域被整块盖住
- 不是图片尺寸问题也不是 cache，改 bg 尺寸或调 object-fit 都没用

## 根因
- Bg.svg 本身是 375×190px 顶部横幅，PageBg.vue 默认 position:absolute + inset:0 + object-fit:cover 铺满父容器
- 该页 .type-container 写 flex:1 把父容器撑到整屏高，背景图随之被拉伸成整屏

## 解决方案
- 参照 house/index.vue 的 .top-empty，用固定高度包裹盒（.type-bg，height:380rpx 即 190px）包住 PageBg
- 背景只占顶部条带，下方回落到 $uni-bg-color 白底
- 高度微调改包裹盒 height，不改组件内定位
- 判断口径：任何「背景图溢出/变全屏」先看父容器是否 flex:1/100vh，再看 PageBg 绝对定位是否缺高度约束包裹层

## 验证与归属
- 验证证据：会话 1d447664 最终结论「Bg.svg 是 375×190px 横幅，PageBg 绝对定位铺满父容器，.type-container flex:1 占满整屏」；修复用 .type-bg（380rpx）包裹
- 涉及文件：pages_owner/house/TypeChoose.vue、components/PageBg/PageBg.vue、pages_owner/house/index.vue、pages_owner/house/components/TypeChoose_Suzhufang.vue
- 所属项目：苏住房C；来源会话ID：1d447664-822a-4688-ab03-ac7488c5ab2d；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "pagebg_fullscreen",
  "source_extraction_id": "cb687cdf13e34fa6a1124eadb650c4e7",
  "version": 1,
  "memory_type": "entities"
}
-->
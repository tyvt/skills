# 业主端户型选择页背景拉伸修复
苏住房C(zhi2-mobile-shimin)小程序业主端 `TypeChoose` 页因 `PageBg` 组件铺满父容器，导致 `Bg.svg` 顶部横幅被拉成全屏，已修复。

## 问题根因
- `Bg.svg` 为 375×190px 顶部横幅，但 `PageBg` 默认 `position: absolute; inset: 0; object-fit: cover` 铺满父容器
- `.type-container` 设 `flex: 1` 占满整屏，蓝色背景被拉成全屏

## 修复方案
- 参考 `house/index.vue` 的 `.top-empty` 做法，用固定高度 `.type-bg`(`380rpx`，即 190px)包裹 `PageBg`，背景只显示在顶部，下方保持 `$uni-bg-color` 白色

## 验证与归属
- 预期效果：顶部蓝色渐变横幅，下方白底卡片区域
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`house/index.vue`、`TypeChoose.vue`、`TypeChoose_Suzhufang.vue`、`TypeChoose_Jiayuanqu.vue`
- 来源会话ID：1d447664-822a-4688-ab03-ac7488c5ab2d；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "typechoose_pagebg_fix",
  "source_extraction_id": "7566ecdbf0c54726904383a9644f43fe",
  "version": 1,
  "memory_type": "entities"
}
-->
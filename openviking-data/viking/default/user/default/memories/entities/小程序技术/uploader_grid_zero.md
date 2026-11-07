# 上传宫格因grid-auto-rows算零高度不显示
苏住房C 人工添加房屋页 ImageUploader 因容器固定高 h-144 与 grid-auto-rows 按宽度算行高失准导致格子高度 0，整块上传组件不可见。

## 问题现象
- 人工添加房屋页面（pages_owner/house/owner/manual.vue）图片上传组件看不到灰色上传框
- 同一组件在其他页面正常，此处用户描述「上传组件不显示」
- 四列网格下每格约 36rpx，视觉上等于没显示

## 根因
- 容器被加 h-144（固定 144rpx 高），四列网格每格只剩约 36rpx
- 组件用 grid-auto-rows 依据宽度反推行高，小程序环境测量常失准，行高算成 0 格子塌陷
- 非组件未注册，而是高度被压成 0

## 解决方案
- 重写 ImageUploader 布局：每格 aspect-ratio:1 由宽度自带高度，叠加 min-height:144rpx 保底，删掉 h-144 与宽度测量行高逻辑
- 在 pages_owner/house/owner/register.vue 显式 import 并注册 ImageUploader，避免分包下组件未注册同样不显示
- 排查顺序：devtools 量格子实际高度是否为 0 → 查容器固定高与 grid-auto-rows/measure → 最后怀疑分包组件注册
- 网格内图片/上传格子均不用 grid-auto-rows 推高度，用 aspect-ratio + min-height 双保险

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 3f889ff2（基线 5f0f4dc）用户先报「图片上传组件有问题」再报「上传组件不显示，按钮宽度太窄」
- 涉及文件：components/ImageUploader/ImageUploader.vue、pages_owner/house/owner/manual.vue、pages_owner/house/owner/register.vue
- 所属项目：苏住房C；来源会话ID：3f889ff2-2daa-476e-86b3-963833ee9ca2；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "uploader_grid_zero",
  "source_extraction_id": "ed684869517947daa729ceb5239a72e0",
  "version": 1,
  "memory_type": "entities"
}
-->
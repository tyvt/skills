
# 楼盘相册图片预览失败修复
苏住房C小程序楼盘相册页面点击预览图片失败（显示问号占位图）的问题已修复。

## 问题根因
- 缩略图能显示：ZsImage 组件内部通过 resolveMediaUrl 把接口返回的相对路径（如 /zs-fym/xxx.jpg）转成完整可访问 URL
- 预览失败：点击预览时 enlargePicture 直接把原始相对路径传给 uni.previewImage，在苏服办 H5 等无反向代理环境下无法加载

## 修复方案
- 在调用 uni.previewImage 前，先用 resolveMediaUrl 解析图片地址
- enlargePicture 改为 arr.map(url => resolveMediaUrl(url)).filter(Boolean) 后传入 uni.previewImage

## 验证与归属
- 验证路径：首页 → 我要买房 → 地图找房 → 打开小区详情 → 楼盘相册预览
- 涉及文件：buildingAlbum/index.vue、houseSupermarket/detail.vue、newHouse/detail.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：b5c173dc-ea32-4e53-9c29-1ef11624641c；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "building_album_preview_fix",
  "source_extraction_id": "0696f333cb154a068fcf85a0537f1632",
  "version": 1,
  "memory_type": "entities"
}
-->
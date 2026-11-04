# 组织架构页顶部横幅拉伸修复
泰兴小程序物业端组织架构页顶部横幅图因组件样式覆盖与高度错误导致拉伸变形，已调整为完整铺满屏宽。

## 问题根因
- 远程横幅图 header.png 实测尺寸 1125×240（宽高比 4.69:1）。
- 旧实现 hero 高 400rpx + 图片写死 width:1875rpx 右对齐裁切，但 ZsImage 组件内部 .img {width/height:inherit} 与页面 .hero-image 同权重且后生效，实际渲染 750×400rpx 盒子，aspectFill 裁切放大变形。
- 文字行错误加状态栏+导航高度偏移，而该页用原生导航栏不需要。

## 解决方案
- 仅改 src/pages/staff/organization/index.vue：hero 高度改为 160rpx（=750×240/1125），整图铺满屏宽。
- .hero-image 改为 width/height:100% !important（压过组件内部 inherit），左对齐铺满。
- .area-row 改为绝对定位垂直居中，移除多余 headerPaddingTop 及 useStatusBar。

## 验证与归属
- 验证证据：extracted source=workbuddy project=泰兴小程序。
- 涉及文件：src/pages/staff/organization/index.vue、src/components/ZsImage/ZsImage.vue、src/staff/hooks/useStatusBar.js、src/pages.js 等。
- 来源会话ID：371a6c86-dc85-4ff6-8ae9-d65fa186df19
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "banner_stretch_fix",
  "source_extraction_id": "d0e22eb5dac845d1a38d305efc1b5c08",
  "version": 1,
  "memory_type": "entities"
}
-->
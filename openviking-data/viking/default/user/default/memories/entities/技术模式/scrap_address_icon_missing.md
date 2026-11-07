# 报废记录地址图标不显因ZsImage继承尺寸
物业手持B端报废记录添加页设备卡片地址图标因 ZsImage 尺寸继承在 flex 布局下渲染为 0 而不显示。

## 问题根因
- `ZsImage` 内部使用 `width/height: inherit`，在 flex 布局下覆盖页面尺寸，致 SVG 图标渲染为 0

## 解决方案
- 设备卡片地址图标：`.address-box` 改为 `grid` 布局(`40rpx 1fr`)，与 `facilityDetail.vue` 一致；`.icon-address` 用 `!important` 固定 `40rpx × 40rpx` 覆盖 `inherit`
- 鉴定单位弹窗图标：删除弹窗内重复 `.address-box { display: flex }` 避免覆盖 grid；`.address-img` 同样用 `!important` 固定尺寸

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/pages_facility/record/addScrap.vue、facilityDetail.vue、src/pages/workbench/index.vue、src/components/ZsImage/ZsImage.vue、src/env/mp.js、.gitignore、src/pages/home/index.vue
- 来源会话ID：11928cba-1c51-4b07-9ceb-f16ee0fc94ab
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scrap_address_icon_missing",
  "source_extraction_id": "039687108a0b4a3480f4534b33cc58de",
  "version": 1,
  "memory_type": "entities"
}
-->
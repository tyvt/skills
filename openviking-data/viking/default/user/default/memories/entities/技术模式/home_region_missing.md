# 首页切换小区后行政区域不显示调查
物业手持B端首页切换小区后行政区域名与三级行政区域筛选不显示的调查结论与关键文件梳理。

## 问题范围
- 涉及两条 UI 链路：首页顶栏当前区域名；小区选择页三级行政区域筛选（区域/街道/社区）
- 现象：切换小区后行政区域不显示

## 关键页面与状态
- 首页：`src/pages/home/index.vue`
- 小区选择（含行政区域筛选）：`src/pages/complex-select/index.vue`
- 用户/小区状态：`src/store/user.js`
- 行政区域 Picker：`src/components/ZsPicker/ZsPicker.vue`

## 相关API
- 首页 API：`src/api/home.js`
- 小区分页 API：`src/api/property.js`
- 部门树（行政区域）API：`src/api/system.js`

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 来源会话ID：fb0c52c4-df72-4879-926b-5994451035e6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_region_missing",
  "source_extraction_id": "492c8b0603a94a41bead32e1a63d8236",
  "version": 1,
  "memory_type": "entities"
}
-->
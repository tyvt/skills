# benefit下car图标资源存在且引用链路完整
园区物管2.0 中 benefit 模块 car 图标资源完整且引用正常。

## 解决方案
- `src/assets/images/benefit/` 下 `car-green.png` 等四张 RGBA 图标尺寸格式正确
- `operatingAssets.vue` 中 import 引用链路完整，资源加载正常

## 涉及文件
- benefit/statisticsMap/operatingAssets.vue
- property/complex/components/RegionTreeLayout.vue 等

## 验证与归属
- 所属项目：园区物管2.0；代码基线：none
- 来源会话：9167d986-66b5-4e82-9f45-7f540aae6789

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_car_icons",
  "source_extraction_id": "fbfd30739822481d9cd63130bdfc329b",
  "version": 1,
  "memory_type": "entities"
}
-->
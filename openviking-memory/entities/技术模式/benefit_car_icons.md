# benefit下car图标资源存在且引用链路完整
园区物管2.0 中 benefit 模块 car 图标资源完整且引用正常。

## 解决方案
- `src/assets/images/benefit/` 下四张 RGBA 图标（car-green/car-blue/car-red/car-grey.png，均为 60×48）尺寸格式正确
- 颜色对应设计稿：绿 #52C41A、蓝 #1677FF、红 #FF4D4F、灰 #CCCCCC
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
  "source_extraction_id": "36621e6addfb4001a7f9fe8c070ff065",
  "version": 2,
  "memory_type": "entities"
}
-->
# benefit 图标改名致 pre-commit 报错
园区物管2.0 的 @/assets/images/benefit/ 下停车位图标改为英文名后，import 仍指向旧中文路径，触发 import/no-unresolved。

## 路径映射
- 停车位总数.png → parking-space-total.png
- 产权车位数.png → parking-space-property.png
- 公共车位数.png → parking-space-public.png

## 修复结果
- 更新 import 路径后 import/no-unresolved 错误消除，可重新提交

## 验证与归属
- 涉及文件：src/views/benefit/mapOverview/index.vue、src/views/benefit/statisticsMap、src/views/benefit/statisticsMap/operatingAssets.vue
- 所属项目：园区物管2.0；来源会话：0599d819-a6e3-4454-9b2f-cd11e82c7dc5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_image_rename_precommit",
  "source_extraction_id": "d4c167325849479e80ae46b9e66aeb77",
  "version": 1,
  "memory_type": "entities"
}
-->
# benefit图标更名import路径未同步
园区物管2.0 benefit 模块停车位图标改为英文名后，import 路径未同步触发 `import/no-unresolved` 报错。

## 问题根因
- `@/assets/images/benefit/` 下停车位图标改为英文名
- 多处 import 仍指向中文旧路径，触发 ESLint `import/no-unresolved`

## 解决方案
- 更新 import 至 `parking-space-total.png`、`parking-space-property.png`、`parking-space-public.png`

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue、zhi2-web-admin/src/views/benefit/statisticsMap/operatingAssets.vue、zhi2-web-admin/package.json
- 所属项目：园区物管2.0；来源会话：0599d819-a6e3-4454-9b2f-cd11e82c7dc5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_icon_import",
  "source_extraction_id": "f03398b51ded4ce1afcdcc21da6e622c",
  "version": 1,
  "memory_type": "entities"
}
-->
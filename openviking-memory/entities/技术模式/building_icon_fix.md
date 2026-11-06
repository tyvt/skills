# 楼栋表图标排版修复
苏州市房地产监测V3 中楼栋表因图标数量与宽度不当导致拥挤，已改为默认 short 图例并恢复 110px 宽度换行。

## 问题根因
- 旧版苏州图例仅 4 项（可售、合同草签、预备案、合同备案），单元格隐藏部分只留 2 图标
- V3 用 `short+long`（8 项）画出 6 图标显拥挤
- 原 `.table-icon` 固定 110px 宽会换行，后改 `width:auto` 致 6 图标挤一行

## 修复内容
- 默认与旧苏州一致：只用 **short** 图例；单元格用 `cellStateList`（2 图标位）
- 恢复 **110px** 图标区宽度与换行，室号居中、图标下方居中
- 需自留/抵押等环境加 `VITE_APP_BUILDING_TABLE_EXTENDED_STATES=true` 开启扩展状态

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin、路由信息.json、zhi2-web-admin/src/views/projectManagement、buildingTable/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：fab75e74-8bd3-4304-a54e-0fecb4c6f1ab；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_icon_fix",
  "source_extraction_id": "0c115a7a4e2d4c988b4d8dbe0f854d96",
  "version": 1,
  "memory_type": "entities"
}
-->
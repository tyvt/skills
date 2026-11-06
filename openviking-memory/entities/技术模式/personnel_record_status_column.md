
# 开发企业从业人员备案状态列复合展示
苏州市房地产监测V3 中开发企业从业人员备案（personnelRecord）模块的状态列已改为按 bizState + cancelStatus 复合展示，复用 personnelStatus.js 与 personnel_business_status 字典。

## 模块入口
- 管理端菜单「从业人员备案」filePath `company/staffManagement/personnelRecord/index`，「从业人员变更」`company/staffManagement/personnelChange/index`
- 企业端 ToB `toB/personnelRecord/index`

## 列表页改动
- 管理端 `staffManagement/components/index.vue` 与企业端 `toB/personnelRecord/components/index.vue` 两处
- `listCallback` 为每行附加 `_personnelStatusCode`
- 「数据状态」列改为 `type: 'tag'` + `personnel_business_status`
- 注销/变更按钮增加 `!isPersonnelCancelled(row)` 判断

## 详情页
- `staffManagement/components/detail.vue` 同步对齐

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：aee9a3ba-5a81-43af-bc39-5611731be2b1；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_record_status_column",
  "source_extraction_id": "51f509fc1cfc4814bd2e840f740c0807",
  "version": 2,
  "memory_type": "entities"
}
-->
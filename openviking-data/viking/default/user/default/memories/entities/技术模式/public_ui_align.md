# 详情子表改用公共UI写法
苏州市房地产监测V3 已按项目公共 UI 规范调整详情内嵌子表写法，对齐公共组件结构。

## 结构调整
- `service-scheme-panel` 改为 `Headline` + `sub-container` 标准结构
- `ListOperationButtonContainer` 改为 `Headline #right` + `operation-button-container`，按钮放标题右侧
- 自定义 `row-actions` 改为公共 `zs-operate-column` 操作列组件
- 自定义 scoped 样式删除，由 `index.scss` 公共 class 提供

## 同步修改
- `AgencyBranchDetail.vue` 移除外层重复 `<Headline title-text="服务方案">`，由 `ServiceSchemePanel` 自行承载
- 参照 `certificatesTable.vue`、`VotingItemsTable.vue` 等详情子表写法

## 涉及文件与归属
- 涉及：`certificatesTable.vue`、`VotingItemsTable.vue`、`index.scss`、`AgencyBranchDetail.vue`、`ServiceSchemePanel.vue`、`AgencyBranchList.vue`
- 所属项目：苏州市房地产监测V3；来源会话：14b355d4-da15-4251-a812-74d65e4b4438
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "public_ui_align",
  "source_extraction_id": "a81ab6804080434d9486b5c33f4bda6b",
  "version": 1,
  "memory_type": "entities"
}
-->
# 终止路由下监管范围查看按钮误禁用
苏州市房地产监测V3 监管协议详情中，终止路由下查看按钮被错误禁用，已修复。

## 问题根因
- `AgreementDetailsTable.vue` 中 `viewButton` 的 `disabled` 判定 `currentRoute === 'end'` 错误禁用查看

## 修复方案
- 移除该禁用条件，编辑/删除仍由 `disableButton` 控制
- 楼幢号链接行为同步

## 验证与归属
- 验证证据：extracted source=cursor session=55c2b2d0-f747-4697-86d6-1bb973af1505
- 涉及文件：d:/repository/苏州市房地产监测V3/路由信息.json、d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/agreement/jgxm/detail.vue、d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/agreement/jgxm/components/SupervisionTable.vue、d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/agreement/end/detail.vue、d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/agreement/xy/components/AgreementDetailsTable.vue、d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/listMixins.js、d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/agreement/xy/components/AgreementDetailsDialog.vue、d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/benefit/components/AgreementDetailsTable/index.vue
- 来源会话ID：55c2b2d0-f747-4697-86d6-1bb973af1505；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "end_route_disable",
  "source_extraction_id": "7fed42c0b2674fd1a74d910b81296118",
  "version": 1,
  "memory_type": "entities"
}
-->
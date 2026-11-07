# 从业人员详情去掉证件类型字段
苏州市房地产监测V3 项目从经纪从业人员、租赁从业人员两处详情页移除「证件类型」字段。

## 修改要点
- 修改文件：`AgencyPersonnelDetail.vue`、`LeasePersonnelDetail.vue`
- 编辑表单：移除「证件类型」表单项
- 查看模式：`basicInfoView` 中不再展示该字段
- 校验：删除 `idType` 必填规则
- 字典：不再加载 `document_type`（仅用于该字段）

## 接口兼容
- 表单默认值仍为 `idType: '01'`（居民身份证）
- 保存 payload 仍会带上 `idType`，后端逻辑不受影响
- 若需在 toB 人员备案详情（`toB/personnelRecord/components/detail.vue`）或其它页面同步去掉，可补充范围

## 验证与归属
- 涉及文件：`AgencyPersonnelDetail.vue`、`LeasePersonnelDetail.vue`
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor
- 来源会话ID：5d103f6d-b346-4d26-8144-3e36ee398668；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "personnel_idtype_remove",
  "source_extraction_id": "65263d182fe04a6393857312ef47263e",
  "version": 1,
  "memory_type": "entities"
}
-->
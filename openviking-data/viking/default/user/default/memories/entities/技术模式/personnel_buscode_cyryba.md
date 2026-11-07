# 从业人员备案审批要件固定busCode cyryba
苏州市房地产监测V3 中此前主管端未传bus-code依赖路由meta，企业端要件走路由解析易不一致，调整后统一固定业务编码 `cyryba`。

## 编码约定
- 备案申请提交、审批流、要件统一固定业务编码 `cyryba`
- 变更单固定业务编码 `cyrybg`
- 对齐菜单 `meta.busCode`

## 问题根因
- 此前主管端未传 bus-code 依赖路由 meta
- 企业端要件走路由解析易不一致

## 涉及文件
- `src/api/company/personnelRecord.js`

## 验证与归属
- 验证证据：source=zcode session=sess_591319b5-f49b-4c03-980c-4958076af0cc
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_buscode_cyryba",
  "source_extraction_id": "4e404e041210485eb1873d1dfa867a1d",
  "version": 1,
  "memory_type": "entities"
}
-->
# 隐藏开发企业从业人员要件上传模块
苏州市房地产监测V3 已完成修改，开发企业从业人员详情页的「要件上传」模块已隐藏，经纪机构从业人员不受影响。

## 修改内容
- 管理端 `staffManagement/components/detail.vue`：新增 `showAppendixSection`，`organType === '01'`（开发企业）时返回 false
- 管理端模板条件由 `formMode !== 'add'` 改为 `showAppendixSection`，`beforeSaveHook` 隐藏时直接返回跳过校验
- 企业端 ToB `toB/personnelRecord/components/detail.vue`：同步新增 `showAppendixSection` 及模板条件
- 企业端 `validateAppendix` 隐藏要件区时返回 true，避免保存被拦截

## 覆盖范围
- 管理端：从业人员备案 / 变更详情均已生效
- 企业端 ToB：从业人员备案 / 变更详情均已生效
- 经纪机构从业人员详情仍保留「要件上传」

## 涉及文件与归属
- 涉及：`staffManagement/components/detail.vue`、`toB/personnelRecord/components/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：76ab4922-b1d4-4c4f-bf33-36bf0db42b93
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_appendix_hide",
  "source_extraction_id": "a81ab6804080434d9486b5c33f4bda6b",
  "version": 1,
  "memory_type": "entities"
}
-->
# InfoCard/WorkCard弹窗关闭置空动画期报错
苏州市房地产监测V3 中 InfoCardDialog 与 WorkCardDialog 在 @closed 将 credential 置 null，导致关闭动画期间模板访问属性报错，修复为重置为 {}。

## 问题根因
- `InfoCardDialog.vue` 的 `@closed` 将 `credential` 置 `null`
- 关闭动画期间模板渲染访问 `credential.photo` 触发 Cannot read properties of null

## 修复方案
- `@closed` 将 `credential` 重置为 `{}`（同 `data()` 初始值）
- `WorkCardDialog.vue` 同步修改避免同类错误

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/126.md
- 涉及文件：src/views/institution/agencyPersonnel/components/InfoCardDialog.vue、AgencyPersonnelList.vue、WorkCardDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：cdaad0ce-2308-42bc-a23c-6aa39e6341a6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "infocard_null_reset",
  "source_extraction_id": "07c2d7124c274e7c976432390b07e669",
  "version": 1,
  "memory_type": "entities"
}
-->
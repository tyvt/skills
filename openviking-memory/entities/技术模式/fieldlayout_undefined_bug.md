# detail-template 组件使用了未定义的 fieldLayout
常量模块 `fieldLayout` 未在 `contentInfo` 中定义，导致在 苏州市房地产监测V3 项目中出现 ReferenceError。

## 问题
- `fieldLayout` 未在 `contentInfo` 中定义，导致 ReferenceError
- 4 处对 `fieldLayout` 的引用需要被替换

## 解决方案
- 从 `@/utils/detailLayout` 导入 `FORM_COL_TWO`（值为 `{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }`）
- 将 4 处 `fieldLayout` 的引用替换为 `FORM_COL_TWO`

## 文件
- `zhi2-web-admin/src/components/detail-template/detail-template.vue`
- `zhi2-web-admin/src/views/supervision/unblock/usemoneyRevoke/detail.vue`
- `zhi2-web-admin/src/views/supervision/deposit/refund/detail.vue`
- `zhi2-web-admin/src/views/supervision/agreement/jgxm/detail.vue`
- `zhi2-web-admin/src/utils/detailLayout.js`

## 验证
- 验证证据: src=苏州市房地产监测V3/234.md
- 来源会话: c9e3f7f1-e112-4668-b0d4-4bad6d731b08
- 所属项目: 苏州市房地产监测V3; 代码库: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fieldlayout_undefined_bug",
  "source_extraction_id": "5a368dde30334afa99f7154d2f5147cf",
  "version": 2,
  "memory_type": "entities"
}
-->

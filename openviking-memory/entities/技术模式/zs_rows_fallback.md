# 监管弹窗默认rows取数致data列表空
zs-select-dialog.vue 的 getList 写死 listKey='rows'，接口返回 data 数组时 tableData 非数组显示暂无数据，已修复为回退至 data。

## 问题根因
- zs-select-dialog.vue 的 getList 写死 listKey='rows'
- 接口返回 data 数组时 tableData 非数组，页面显示暂无数据

## 修复方案
- 对齐 func 版，使用 extractListData/extractTotal
- rows 缺失时回退至 data 字段取数

## 验证与归属
- 验证证据：src=cursor session=79196650-1f8f-4250-a924-1f5ed127ab56
- 涉及文件：supervision/agreement/jgxm/components/RegulatoryDialog.vue、components/zs-select-dialog/zs-select-dialog.vue、zs-select-dialog-func.vue、main.js、mixins/table.js、supervision/agreement/version/index.vue
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_rows_fallback",
  "source_extraction_id": "b35c8cec348f4300ac901e68405922f1",
  "version": 1,
  "memory_type": "entities"
}
-->
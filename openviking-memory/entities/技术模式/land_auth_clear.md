# 楼幢授权仅宗地维度切换清空已选防跨地提交
楼幢授权去除项目维度仅保留宗地，须约束单宗地操作，SelectDialog新增clearSelectionOnTreeChange配置。

## 问题根因
- 楼幢授权去除项目维度仅保留宗地维度
- 须约束单宗地操作，防止跨宗地提交

## 解决方案
- SelectDialog新增clearSelectionOnTreeChange配置
- 切换宗地清空表格勾选及selection
- 确定时校验landPlotId不一致则提示并清空
- complex/components/rangeTable.vue、complexChange/components/rangeTable.vue与complex/detail.vue均传入clearSelectionOnTreeChange: true

## 验证与归属
- 验证：src=园区公共收益/026.md
- 涉及文件：property/complex/components/rangeTable.vue、components/zs-select-dialog/zs-select-dialog-func.vue、property/complexChange/components/rangeTable.vue、property/complex/detail.vue、property/complexBuildingAuth/detail.vue、building/complexSearch/components/rangeTable.vue、components/zs-table/zs-table.vue
- 所属项目：园区公共收益；来源会话：fed5c973-84de-4f18-adfd-4d38f2f4dcd8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "land_auth_clear",
  "source_extraction_id": "a6b960fcc3174e9ebd9dd580bc8cae17",
  "version": 1,
  "memory_type": "entities"
}
-->
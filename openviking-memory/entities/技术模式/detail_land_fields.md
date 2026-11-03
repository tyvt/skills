# 详情页删除宗地字段保留form兼容后端
两个详情页同步删除土地使用权人等10项宗地字段时，地块名称改非必填并移除校验及`land_use`等字典加载；编辑表单模板、`contentInfo`展示及校验规则更新，`form`对象保留被删属性兼容后端接口。

## 问题背景
- 两个详情页（building/project/detail.vue、building/projectChange/detail.vue）同步删除土地使用权人等10项宗地字段
- 地块名称改为非必填，移除校验及`land_use`等字典加载

## 修复方案
- 更新编辑表单模板、`contentInfo`展示及校验规则
- `form`对象保留被删属性以兼容后端接口，避免接口报错

## 验证与归属
- 验证证据：extracted source=cursor
- 涉及文件：zhi2-web-admin/src/views/building/project/detail.vue、zhi2-web-admin/src/views/building/projectChange/detail.vue
- 所属项目：宜兴公共收益；代码基线：none；来源会话：18455adf-34c9-4286-9e7f-a9345489d87e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_land_fields",
  "source_extraction_id": "4c41132cc4414e02ab9756bee071929d",
  "version": 1,
  "memory_type": "entities"
}
-->
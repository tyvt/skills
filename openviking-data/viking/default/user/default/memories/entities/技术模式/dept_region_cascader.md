# 部门树三级区划级联筛选
苏住房G 列表页行政区划筛选使用 zs-dept-region-cascader 实现区县→街道→社区三级级联，需跳过市级根节点并显式限定部门类型。

## 配置规则
- 关闭市级根节点（跳过 root，直接以区县为第一屏），不靠后端改树
- deptTypes 显式传 0,1,2（区县/街道/社区），不用组件默认全集
- 列表查询参数统一用 parentDeptId 承载所选节点 ID，选到哪级发哪级 ID，由后端做本级+下级展开
- 接入点在 zs-search-form 的 formItems 配置，改搜索项 type 而非页面模板

## 排查要点
- 改完须在 zs-dept-region-cascader、SearchFormItem、四个列表页三处核对 v-model 绑定与默认值，级联值无 model 会静默不生效
- 本控件属「部门树 dept 级联」体系（parentDeptId + deptTypes），与 zs-region-select 编码体系不可互相替代

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：property/propertyContract/components/index.vue、system/regionBankAuth/index.vue、行政区划筛选-前端对接文档.md
- 所属项目：苏住房G；来源会话：d4bb3d02-d460-4b98-9bc4-430cdeb11f1d；代码基线：9e5c499
- 用户要求「第一级就是区，不要苏州市」，最终核对与对接文档一致

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dept_region_cascader",
  "source_extraction_id": "8ff983f008154129a5b3d61fe0701d5b",
  "version": 1,
  "memory_type": "entities"
}
-->
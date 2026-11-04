# 楼幢变更页楼幢类型字段补齐
楼幢维护详情页已有楼幢类型字段，但项目管理模块下的楼幢变更记录编辑页缺失该字段，需在changeDetail.vue补齐。

## 问题定位
- 截图21387显示楼幢维护详情页（buildinginfo/detail.vue）已有「楼幢类型」字段，字典为building_type
- 截图21388显示楼幢变更记录编辑页（projectManagement/buildingChange/changeDetail.vue）搜索「楼幢类型」0命中
- 同仓库building/buildingChange/detail.vue已含该字段，证实仅为项目管理模块漏加

## 修复要点
- 需在changeDetail.vue补5处：表单项、options声明、字典加载、必填校验、view态展示
- options命名为buildingTypeOptions以匹配dictFormatter的property+'Options'解析规则
- 字典使用building_type，详情view态用type:'tag'写法参照buildinginfo/detail.vue

## 工作流
- 依据仓库AGENTS.md约定，改动走独立worktree（zhi2-web-admin-wt-bug6128）
- 分支fix/bug6128-buildingchange-buildingtype基于develop/v3.0.0合并点a40300115

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buildingchange_buildingtype_sync",
  "source_extraction_id": "3650e2aa2d7549e49cc0e2f190e57bb4",
  "version": 1,
  "memory_type": "entities"
}
-->
# 大屏穿透筛选参数与目标页对齐模式
园区物管2.0 物业数据大屏左菜单穿透到列表页时，穿透参数必须在目标页有同名筛选项，否则用户看到全量数据。

## 问题根因
- 大屏穿透参数与列表页筛选参数是两份互不相干的约定，字段名须两端一致。
- 缺任一环，过滤条件不生效或只作用于进页面瞬间，用户无入口可调。
- 物管会/业委会页面本无「状态」筛选项，穿透带 committeeState=1 无处可改。

## 解决方案
- 建「大屏穿透参数 ↔ 目标页 queryParams ↔ 页面筛选项」三方对照表对齐字段名与取值（#8/#9 补 isEffect=1；#10/#11 补 committeeState=1）。
- 目标页缺筛选项按字典补下拉（autonomy/record/components/index.vue 的 queryParams 加 committeeState，筛选面板新增「物管会/业委会状态」下拉，字典 IS_START，initDict 加载 IS_START）。
- 页面已有同名字段直接复用（如 #8/#9 复用「执行状态」effect_state），不新增重复项。
- 后端改统计口径不急换前端接口/字段，只标注「大屏数字会变」并回头检查告警阈值与文案。
- 交付前用对照表逐项打勾。

## 验证与归属
- 会话 859e9c31（基线 23d6668）：用户诉求 1「页面无筛选项也要加」、诉求 2「后端改对照文档完善」；#7/#13 属后端改口径前端无需替换（物业服务企业备案数 4→13）。
- 涉及文件：smartPropertyScreen/components/PropertyManageLeft.vue、autonomy/record/components/index.vue；来源会话：859e9c31-a0be-49d9-8fc3-d4c91555496e；代码基线：23d6668。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "screen_drill_filter",
  "source_extraction_id": "b03b5caf46e0410f892f1f3a0dcce3da",
  "version": 5,
  "memory_type": "entities"
}
-->
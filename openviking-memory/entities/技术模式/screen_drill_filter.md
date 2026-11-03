# 大屏穿透筛选参数与目标页对齐模式
园区物管2.0 物业数据大屏左菜单穿透到列表页时，穿透参数必须在目标页有同名筛选项，否则用户看到的是全量数据。
## 问题根因
- 大屏穿透参数与列表页筛选参数是两份互不相干的约定：穿透侧传什么字段名，页面侧就得用同一个字段名接到查询条件。
- 缺任一环，过滤条件要么完全不生效、要么只作用于「进页面的那一瞬间」，用户无入口可调，口径永久错位。
- 物管会/业委会页面本无「状态」筛选项，穿透带过去的 committeeState=1 在页面上无处可改。
## 解决方案
- 建「大屏穿透参数 ↔ 目标页 queryParams ↔ 页面筛选项」三方对照表，一次性对齐字段名与取值（本批 #8/#9 物业服务合同与前期合同补 isEffect=1；#10/#11 物管会与业委会补 committeeState=1）。
- 目标页缺筛选项时按字典补下拉（autonomy/record/components/index.vue 的 queryParams 加 committeeState，筛选面板新增「物管会/业委会状态」下拉，字典编码 IS_START，initDict 加载 IS_START）。
- 页面已有同名字段直接复用（如 #8/#9 页面已有「执行状态」下拉 effect_state，穿透直接回填，不新增重复项）。
- 后端改统计口径不急着换前端接口/字段（本批招标计划→招标备案单、企业生效合同口径→企业档案口径，确认前端无需替换），只标注「大屏数字会变」并回头检查告警阈值与文案。
- 交付前用对照表逐项打勾，不只看大屏数字对不对。
## 验证与归属
- 验证：会话 859e9c31（基线 23d6668）用户诉求 1「页面没有筛选条件也需要加」、诉求 2「后端反馈有修改对照文档完善」，最终结论表格逐项列出穿透参数补齐与页面筛选项补充，#7/#13 属后端改统计口径前端无需替换（物业服务企业备案数 4→13）。
- 涉及文件：zhi2-web-admin/src/views/smartPropertyScreen/components/PropertyManageLeft.vue、zhi2-web-admin/src/views/autonomy/record/components/index.vue；来源会话：859e9c31-a0be-49d9-8fc3-d4c91555496e；代码基线：23d6668。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "screen_drill_filter",
  "source_extraction_id": "00baf7a307324dad9ee0f606b283ca05",
  "version": 1,
  "memory_type": "entities"
}
-->
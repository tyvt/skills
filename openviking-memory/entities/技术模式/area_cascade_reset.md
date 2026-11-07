# 区划街道社区三级联动清空（mixin 基线比较 + shouldReset 双参）
苏住房G 后台在新增/编辑详情页的「行政区域→所属街道→所属社区」三级联动中，用 area mixin 的基线比较与 shouldReset 双参区分「回显」与「用户切换」。

## 问题根因
- 切换行政区域后街道框残留上一级选中的编码（如 320507002）。
- 在 region 的 change 里无条件清空会连「详情接口回填区划」一并触发，编辑页回显被清空。
- 完全不清空又留脏值。

## 解决方案
- 在 mixins/area.js 集中实现 resetAreaCascadeOnRegionChange(shouldReset)、resetAreaCascadeOnSubdistrictChange(shouldReset) 与 syncAreaCascadeBaseline()。
- 用 _lastRegionCode 基线比较，仅当区划值真正变化才清空，重复选同一区划不清空。
- detailCallback 里以 shouldReset=false + syncAreaCascadeBaseline() 声明「这是回显不是用户操作」。
- setProject / 手动切换等用户动作保持 shouldReset=true。
- 字段名通过 areaCascadeFormKeys 供各页覆盖。

## 涉及页面与迁移
- 批量改造 13 个详情页：complex / complexChange / complexBuildingAuth / complexSearch / building-project / projectChange / census / elevatorApply / elevatorDeclaration / transaction-complex / indemnity-project / partyOrganization / villagePartyOrganization。
- 批量迁移时必须同步删掉各页与 mixin 重复的 form.region watch，否则两条清空链路互相干扰、回显又被打空。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话 f1473127 最终结论在 src/mixins/area.js 集中实现上述方法，主报障页 detailCallback 改 onCascaderChange(false) + syncAreaCascadeBaseline()，并批量改造 13 个详情页、移除重复 form.region watch。
- 差异点：已知「级联表单上游变更清空下游的清单式清空」是逐页手写清空清单、无法区分回显与交互；本条靠基线快照 + shouldReset 把两种触发源彻底分开，且清空逻辑下沉到 mixin。
- 涉及文件：zhi2-web-admin/src/mixins/area.js、zhi2-web-admin/src/views/property/complex/detail.vue 等 13 个详情页。
- 所属项目：苏住房G；来源会话ID：f1473127-27a4-4764-b893-364f1cbcc6ca；代码基线：2a3ef8a。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "area_cascade_reset",
  "source_extraction_id": "5e850285f3a947fcac14fa6386b643ab",
  "version": 1,
  "memory_type": "entities"
}
-->
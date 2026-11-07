# Bug 6213 大屏穿透左树未选中区域
榆林G 项目（园区物管2.0）系统监控-综合大屏点选区域穿透到「物业管理区域备案」(property/complex)，左树未选中所选区域。

## 问题根因
- 大屏 goMenu 跳转携带 region=行政区划码&from=screen；列表按 region 过滤正常。
- 左树初始选中仅依据 store 缓存 cachedParentDeptId；穿透场景不写缓存也无 parentDeptId，导致左树退化为根节点「榆林市」。
- 部门树节点 id 为 deptId，区域码(610802)须名称映射才能定位节点；高新区(610893)/科创新城(610894) 无独立树节点。

## 解决方案
- RegionTreeLayout.vue：from=screen 且带 region 时计算 resolvedInitialRegionName（仅在无缓存 parentDeptId、非平铺/重置时生效），传给 region-tree。
- regionTree.vue：新增 initialRegionName prop，按区域名(deptName/name/label，去区/县/市后缀兜底)匹配节点默认选中，优先级 initialSelectedId > initialRegionName > 根节点。
- constants/region.js：新增 getTreeRegionNameByCode；高新区→榆阳区、科创新城→横山区。

## 验证与归属
- 本地全链路 E2E：region=610802→左树自动选中榆阳区✓；610803→横山区✓；子区域610893(高新区)→榆阳区✓；无 from 正常进入→默认榆林市✓（无回归）。
- 真实 Dameng 核对：部门树 榆林市→榆阳区(826)/横山区(827)… 与区域名一致，子区域无独立节点，假设成立。
- 来源会话：2026-11-05 修复 bug 6213；文件 RegionTreeLayout.vue/regionTree.vue/constants/region.js；分支 develop/v2.6.2-yulin；子模块提交 ab1d0f4f2→合并 716172438，父仓库 榆林G 提交 f70cf9a；禅道 bug 6213 回写 resolved/fixed 指派回 zhunan（action #87593）。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bug6213_tree_select",
  "source_extraction_id": "3827b637d846433b90af0efe5c8dc023",
  "version": 1,
  "memory_type": "entities"
}
-->
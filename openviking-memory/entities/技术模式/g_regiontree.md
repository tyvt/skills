# G端区域树平铺与重置根节点
园区公共收益项目 G 端 RegionTreeLayout 默认平铺，重置与切换模式均锚定根节点 parentDeptId，避免清空查全量。

## 默认平铺
- `table.js` 的 `init()` 中，当 `terminalType !== 'B'` 且页面使用 RegionTreeLayout 时，平铺开关 `value` 初始化为 `true`。
- 平铺模式下左侧树不渲染，组件 `created` 时静默请求树接口缓存根节点 ID 供初始化与重置使用。

## 首屏延迟
- 调整 `shouldDeferListForRegionTree()`：G 端无论树状还是平铺，均等根节点上下文就绪后再 `getList`，避免 `parentDeptId` 为空请求错参。

## 重置与切换语义
- G 端 `resetQuery()` 调用 `regionTreeLayout.reset()`，不清空 `parentDeptId` 查全量。
- `RegionTreeLayout.reset()`：平铺模式设 `parentDeptId` 为根节点 ID 并刷新；树状模式重载树选中根节点经 `handleTreeReady` 同步。
- 切换平铺/树状时 likewise 用根节点 ID 而非清空。

## 关联信息
- 与已知 `shouldDeferListForRegionTree`、`切换模式清专属筛选` 条目互补，本条为 G 端具体实现。
- 涉及文件：zhi2-web-admin/src/mixins/table.js、RegionTreeLayout.vue、listMixins.js、area.js。
- 所属项目：园区公共收益；来源会话：eda03875-a0d0-4d2a-9f99-12390cefe15c；代码基线：ba114dc。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "g_regiontree",
  "source_extraction_id": "26c4c443e80649a0bdd7a9c3a71c55c0",
  "version": 1,
  "memory_type": "entities"
}
-->
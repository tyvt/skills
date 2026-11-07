# 选房弹窗UI对齐
苏州市房地产监测V3 中 chooseHouseDialog.vue 侧边栏与筛选区 UI 对齐调整已完成。

## 左侧栏改动
- 关键字输入改为 append 搜索按钮（Enter 同样触发搜索）
- 树放入 `tree-box` 白底边框容器，flex 自适应高度
- `filterNode` + `watch keyWord` 对已加载节点本地过滤
- `onLeftTreeSearch` 清空 `treeData` 并 `treeRefreshKey++`，由懒加载 `loadNode` 按 `keyWord` 拉项目避免重复请求

## 右侧筛选与样式
- 顶部改为 `zs-search-form`（关键字 + 两列 layout）
- `resetQuery` / `onClose` 不再依赖 `queryForm`；关闭时重置查询、项目、范本等状态
- 弹窗：`width="80%"`、`height="720px"`、`contract-choose-house-dialog`；左侧灰底卡片 + 右侧 `has-tr`

## 涉及文件与归属
- 文件：`zhi2-web-admin/src/views/commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue`
- 所属项目：苏州市房地产监测V3；来源会话：a32271a9-f8e3-4970-8b59-8a7baaf0f55f
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "选房弹窗UI对齐",
  "source_extraction_id": "62b762ce2aef457eb5bc77cf93ba95cd",
  "version": 1,
  "memory_type": "entities"
}
-->
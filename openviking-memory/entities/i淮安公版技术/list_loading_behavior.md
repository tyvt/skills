# i淮安公版 列表加载态行为
i淮安公版首页分类切换与首次进入的 loading 展示行为约定。

## 行为说明
- 切换类型 `onCategoryChange`：先置空 `facilityList`，再 `listLoading = true`，请求结束关 loading 写新列表，避免旧数据闪烁。
- 列表区域：`listLoading` 为 true 时只显示 `<uni-load-more status="loading" />`；加载结束才显示列表或 `ZsEmpty`。
- 首次进入 `onLoad` 调用 `serachPoi(..., { clearBefore: false })`，同样走 loading 避免空白很久。
- 已去掉未使用的 `nextTick`、`onShow` 引用。

## 涉及文件
- src/App.vue、src/pages/index/home.vue、src/store/user.js。
- 所属项目：i淮安公版；来源会话：824be91d-19a0-46ff-aeb8-1585da292e04。

## 验证与归属
- 验证证据：extracted source=cursor project=i淮安公版


<!-- MEMORY_FIELDS
{
  "category": "i淮安公版技术",
  "name": "list_loading_behavior",
  "source_extraction_id": "278ce1504f244ed5ae52916d18ff2312",
  "version": 1,
  "memory_type": "entities"
}
-->

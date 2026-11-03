# mapOverview 隐藏季度筛选UI仍带默认季度参数
园区物管2.0 mapOverview 页移除左上角季度下拉仅改展示时，selectedQuarter 仍默认 getCurrentOverviewQuarterLabel()，统计/大屏接口请求行为不变。

## 关键事实
- 若产品要求「只按年」或固定季度，需额外改请求参数组装逻辑，不能只删模板控件
- 隐藏筛选后用户无法手改季度，容易误以为后端也只按年度聚合

## 验证与归属
- 验证证据：会话 f756151c 去掉季度下拉后说明数据仍用当前默认季度调接口
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue
- 所属项目：园区物管2.0
- 来源会话：f756151c-6410-4c3f-8746-f4c70b8ba6bf
- 代码基线：3965548b6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mapoverview_hidden_quarter",
  "source_extraction_id": "8987a09e8af843cf8262f55c4984e353",
  "version": 1,
  "memory_type": "entities"
}
-->
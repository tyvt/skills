# 苏住房C的z-paging空态使用情况
苏住房C项目约15个页面未自定义 z-paging 的 #empty 插槽，走默认空态。

## 默认空态
- 未自定义 #empty 的页面（政策法规、公告、楼栋信息、认证列表、收支明细等约15个）走 ZsPaging 默认空态（images/empty.png +「暂无数据」）
- 不会出现完全空白

## 自定义空态
- 已自定义 #empty 的页面（我的合同、收藏、新房列表等）仍使用各自文案与图片，不受影响

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/hooks/useLoadMore.js、src/pages/index/components/Project_Suzhufang.vue、src/components/ListLoading/ListLoading.vue
- 来源会话ID：15b35540-03c7-44b7-9ef5-69b1b346d1bb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_zpaging_empty",
  "source_extraction_id": "dff9607c77784b1e9cb66c804fd5e57e",
  "version": 1,
  "memory_type": "entities"
}
-->
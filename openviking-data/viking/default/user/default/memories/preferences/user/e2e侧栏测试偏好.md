- 遍历侧栏菜单时，叶子/目录点击间隔约 1s 便于录屏排查。
- 侧栏菜单顺序以 DOM 实际出现顺序为准，不另做 index/href 跨上下文排序（用户强调直接用页面顺序就是 DOM 顺序）。
- E2E 单叶子断言失败记入 uiErrorRecords 继续跑，不中断全量遍历。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "E2E侧栏测试偏好",
  "source_extraction_id": "1001facf978947c0afeaf5611beb1e05",
  "version": 1,
  "memory_type": "preferences"
}
-->
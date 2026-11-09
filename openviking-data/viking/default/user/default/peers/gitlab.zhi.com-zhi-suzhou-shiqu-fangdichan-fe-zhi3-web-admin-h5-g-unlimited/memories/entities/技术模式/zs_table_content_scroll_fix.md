# zs-table 内容溢出横向滚动修复
公共组件 zs-table 新增 `--content-scroll` 状态横向滚动规则，修复旧内核下内容裁断不可见的损坏行为。

## 改动点
- 仅新增 `.zs-table-container--content-scroll` 的横向滚动 CSS 规则
- 规则仅在表格实测内容宽度超出容器 ≥2px（真实溢出）时激活 `contentScrollActive`

## 影响范围
- 现代浏览器（Chrome）下列表页内容能放下，规则零影响
- 旧内核（奇安信）下由「裁断内容、无滚动」变为「容器内横向滚动、固定操作列可滚动到达」，只变好不变差

## 归属与验证
- 改动文件：zs-table.vue（公共组件）
- 已构建通过、规则进 dist，提交至 fix/bug-6358（c838c35f2）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "zs_table_content_scroll_fix",
  "source_extraction_id": "d619207e801c459e8481e98ead74763e",
  "version": 1,
  "memory_type": "entities"
}
-->
# 带有额外层级和空文件的 SVG 路径
决策页面中出现路径多余且文件为 0 字节的 SVG 引用错误。
## 问题根因
- `ResultStatistics.vue` 和 `StepConfirm.vue` 使用了 `../.././static` (多了一个层级).
- `flag-szf.svg` 为 0 字节.
## 解决方案
- 更正为 `../../static/images/svg/flag-szf.svg`.
- 添加带有主题色 `#1354BE` 的旗帜图标.
## 文件
- `ResultStatistics.vue`, `StepConfirm.vue`, `sort.scss`, `StepChoose.vue`, `package.json`.
## 验证
- cursor 会话 860e18b1-7843-41e3-a393-6d3279b805da; base: none.

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：860e18b1-7843-41e3-a393-6d3279b805da


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "svg_path_extra_level",
  "source_extraction_id": "e241c05fac3842f3aa947be4d03aabe9",
  "version": 1,
  "memory_type": "entities"
}
-->

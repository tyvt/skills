- 项目拥有 `variables.scss` (遗留的 Element Chalk，无引用) 和 `variables.css`，导致变量定义分散且冲突（例如：`--primary-color` 具有不同的值）。
- 删除 `variables.scss`；用 `--bg-color`, `--border-color`, `--primary-color-light-9` (通过 `color-mix` 派生) 补全 `variables.css`。
- 冲突项使用 `variables.css` 的有效值作为标准；入口 `index.scss` 保持不变。
- 验证：src=苏州市房地产监测V3/172.md; 会话 b3dcdf2d-06fa-442a-b35c-5b7012fe3436.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 样式变量管理",
  "source_extraction_id": "3815f0545ae74fae8287a1e94503770d",
  "version": 1,
  "memory_type": "preferences"
}
-->

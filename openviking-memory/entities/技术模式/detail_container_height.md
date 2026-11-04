# detail-container 高度调整
项目 苏州市房地产监测V3 的 zhi2-web-admin 中的 `.detail-container` 使用了 `height: calc(100vh - 120px)`，导致底部空间过剩和标题截断。

## 问题
- `src/styles/index.scss` 中的 `.detail-container` 固定了 `height: calc(100vh - 120px)`
- 头部的实际高度为 104px，因此多扣除了 16px
- 导致底部出现 40px 空白并截断标题

## 修正
- 通过 `#app-main.app-main:has(> .detail-container)` 限制作用域
- 隔离 `el-dialog` 内的 468 处引用

## 验证
- 验证证据: src=苏州市房地产监测V3/141.md
- 所属项目: 苏州市房地产监测V3; session: 21609fbb-aecf-47c4-8d70-955eeb1e9b2b; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_container_height",
  "source_extraction_id": "2f6669c1d0ad4e90a1d5ad451cb4d376",
  "version": 1,
  "memory_type": "entities"
}
-->
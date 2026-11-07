# zs列组件禁止配置width列宽属性
苏州市房地产监测V3 全局移除 zs-table-column 与 zs-operate-column 的 width 列宽绑定，保留 slot-width 等非列宽属性。

## 实现要点
- 全局 src 下 zs-table-column（445处）移除 width 与 :width 绑定
- zs-operate-column（73处）移除 width 与 :width 绑定
- 保留 slot-width 等非列宽属性
- zs-select-column 列宽配置未动

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/252.md
- 涉及文件：scripts/strip_col_width.py
- 所属项目：苏州市房地产监测V3；来源会话：da4f3fca-c76a-4d06-8455-42d229e5426f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_no_width",
  "source_extraction_id": "010b16fd09244983972d9f0e9cb07a8e",
  "version": 1,
  "memory_type": "entities"
}
-->
# 机构备案详情字段对齐修复
苏州市房地产监测V3 修复机构备案「基本信息」整行字段与上方三列第一列数值起始位置不对齐问题。

## 问题根因
- `注册地址`、`经营地址`、`经营范围` 为整行（FULL_LAYOUT / span=24）
- 整行按自身标签算宽度（如「注册地址」4字），而上方三列第一列按该列最长标签算（如「法人联系电话」6字），导致第一列数值起始位置不对齐

## 修复方案
- `detail-template.vue`：整行字段标签区宽度与第1列一致，数值与上方三列第一列纵向对齐
- 两列宽字段（span=16）：按所在栅格列取该列最长标签，并正确推进列序号
- 行末空列占位：按前面单元格推算列下标，不再简单用 `index % 3`

## 涉及文件与归属
- 涉及：`detail-template.vue`、`Headline/index.vue`、`variables.css`
- 所属项目：苏州市房地产监测V3；来源会话ID：51fa41b5-0944-419a-8136-e8948f55f67f；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_record_align_fix",
  "source_extraction_id": "332cc5b2c96c4093aff81c5d14018372",
  "version": 1,
  "memory_type": "entities"
}
-->
# 物业排名表头小屏换行改三列网格
园区物管2.0 地图概览页物业排名表头在小屏下因两列布局过窄导致名称列竖排换行，改为三列网格修复。

## 问题根因
- 表头采用两列布局 `1fr + 108px` 且带 48px 左内边距
- 小屏时名称列过窄，文字竖排换行

## 解决方案
- 表头改为三列网格 `28px + minmax(48px,1fr) + auto`
- 加 `white-space: nowrap` 防止换行
- 数据行余额列宽度改为 `auto`

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue、zhi2-web-admin/src/views/benefit/mapOverview/components/Panel.vue
- 所属项目：园区物管2.0；来源会话：453364e3-8514-45a2-af94-951a664cdd99；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rank_header_grid",
  "source_extraction_id": "f03398b51ded4ce1afcdcc21da6e622c",
  "version": 1,
  "memory_type": "entities"
}
-->
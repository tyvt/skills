# 列表卡片内表格自动撑满高度致多余空白
园区物管2.0 中 .list-card 容器内 zs-table 自动撑满高度产生多余空白，需取消自动撑满改为按内容收缩。

## 问题根因
- .list-card 内表格开启自动撑满高度，内容少时仍占满容器高度留下大片空白。
- zs-table.vue 默认高度逻辑未区分列表页容器与弹窗等场景。

## 解决方案
- zs-table.vue 取消自动撑满高度逻辑，改为由外部容器控制。
- index.scss 中表格容器改为按内容收缩（height: auto 或 fit-content）。
- ListTemplate.js 等列表模板同步去除强制撑满样式。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：src=园区物管2.0/036.md；涉及文件 zs-table.vue、pubParkingRate/index.vue、index.scss、ListTemplate.js。
- 所属项目：园区物管2.0；来源会话：a3cdf258-43f5-4adb-9bc0-7f0801f15768；代码基线：none。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_card_table_auto_height",
  "source_extraction_id": "16416ccdf7c044efbfab91c3d016aacd",
  "version": 1,
  "memory_type": "entities"
}
-->
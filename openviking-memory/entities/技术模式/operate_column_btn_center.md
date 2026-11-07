# 操作列单按钮居中修复
园区物管2.0 中 zs-operate-column.vue 在操作列仅有一个「查看」按钮时因列宽变大导致按钮不居中，已修复。

## 问题描述
- `operate-column-button-container` 未设居中，动态列宽下单个按钮贴左显示

## 解决方案
- 为 `operate-column-button-container` 增加 `justify-content: center`，使按钮在操作列中居中

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue
- 修改仅样式层；lint 报错为项目 Vue2 模板在 ts-plugin 下的既有提示，非本次引入
- 所属项目：园区物管2.0；代码基线：none；来源会话：eb429bff-03b8-43b5-9e7a-77b8f20a182a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operate_column_btn_center",
  "source_extraction_id": "d5fc2c74eca741f8999f76ec348a4ddc",
  "version": 1,
  "memory_type": "entities"
}
-->
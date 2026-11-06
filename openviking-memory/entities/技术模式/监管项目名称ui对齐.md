# 监管项目名称UI对齐
苏州市房地产监测V3 监管项目备案详情页已完成「监管项目名称」宽列与右缘对齐调整。

## 布局改动
- 主输入采用 **宽列（col-16）+ 横向 flex** 布局，监管项目名称 `flex: 1` 占满至（楼幢号）左侧
- 楼幢号保持在右侧，括号使用全角 `（）`

## 右缘对齐补偿
- 全局样式中同行 `col-16` 右缘比上一行两个 `col-8` 少约 `gap/3`（约 10.67px）
- 后缀加 `margin-right: calc(-1 * var(--detail-collapse-col-gap, 32px) / 3)`，使 `）` 与上行「项目名称」搜索框右缘对齐

## 验证与归属
- 涉及文件：`zhi2-web-admin/src/views/supervision/agreement/jgxm/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：89648bd7-808a-4f32-89c3-6c9506a150c8
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "监管项目名称UI对齐",
  "source_extraction_id": "2acc9c273b0d4e129b8039fe8dfd2d7b",
  "version": 1,
  "memory_type": "entities"
}
-->
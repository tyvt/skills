# KeyDataNav 子数据框等高对齐

首页 KeyDataNav 组件中左右卡片子数据框高度与垂直起始不一致，需统一固定高度以满足用户“红色圈出要一样高度”的要求。

## 问题现象
- 左卡行1子框 40px，左卡行2计费框（纵向两行）49px，右侧卡子框 40px
- 右侧卡片标题换行成两行，头部比左卡高约 18px，数据区整体下移 18px 导致左右行未对齐
- 用户红色圈出要求这些子数据框改成一样高度

## 根因
- .kd__box 仅设 min-height:40px，计费框因 column 两行文字撑高到 49px
- 右侧 .kd__boxes--stack 单组无 flex-grow，头部更高使其数据区下移

## 解决方案
- 对所有子框设统一固定 height:50px; min-height:50px（≥49px 避免两行裁剪）并 overflow:hidden
- 放弃 nowrap 截断标题或拉高头部等会引发溢出/截断的方案，仅做等高修复

## 验证与归属
- 验证证据：实测测试环境实时 DOM 测量各框高度
- 所属项目：苏住房前端（zhi2-web-admin-h5-g）；来源会话：2026-11-13 对话

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "keydatanav_box_equal_height",
  "source_extraction_id": "6b3dbf1ae371405bbf5e6f8439f1a0fa",
  "version": 1,
  "memory_type": "entities"
}
-->
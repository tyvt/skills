# 许可弹窗半栏长文案桌面 nowrap 溢出
门户 PropertyDetailDialog 许可双栏半栏约 270px 宽时，房屋坐落、售房单位等字段若 white-space:nowrap 且无 text-overflow/换行，桌面端易裁切或撑出横向滚动（仅 max-width:650px 才 normal）。

## 问题根因
- 许可双栏半栏宽度约 270px，房屋坐落、售房单位等字段设 white-space:nowrap
- 缺少 text-overflow 与换行兜底，桌面端长文案会被裁切或撑出横向滚动条
- 仅容器 max-width:650px 以上才恢复 normal 换行，半栏场景仍易溢出

## 修复方向
- 半栏字段评估使用 text-overflow:ellipsis 省略号或 word-break 换行
- 或改为全宽行展示长文案字段
- 单位文案需与设计稿统一（㎡ vs 平方米）一并核对

## 验证与归属
- 验证证据：会话 5983c99f [MEDIUM] 长文案 + nowrap 溢出；[LOW] 单位文案不一致
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue
- 所属项目：门户；来源会话ID：5983c99f-13e3-4b40-9938-495cc42f24ff；代码基线：门户 zhi2-web-admin @ e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_dialog_nowrap",
  "source_extraction_id": "d5288c49d81f4413bc5e4aeaa9a95188",
  "version": 1,
  "memory_type": "entities"
}
-->
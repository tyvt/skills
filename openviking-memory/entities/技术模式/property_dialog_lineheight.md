# 门户企业弹窗行高对齐修复
门户企业基本信息弹窗（PropertyDetailDialog）行高被覆盖为1导致行距过密，按从业人员弹窗（BrokerPages）的1.5比例对齐修复。

## 问题根因
- `PropertyDetailDialog.vue` 中 `.portal-company-body .portal-detail-row` 被覆盖为 `line-height: 1`，覆盖基础 `min-height:40px`，导致每行仅字体高度18px、无呼吸空间。
- 图2（BrokerPages.vue）字段行使用 `line-height:30px` / `font-size:20px`，比例1.5，行距宽松均匀。

## 解决方案
- 主工程与同名副本 `zhi2-web-admin-wt-payfund` 同步将 `line-height:1` 改为 `line-height:1.5`（18px×1.5=27px），保持与图2相同视觉比例。
- 行间距16px经比例换算已接近图2的17px，未改动。

## 验证与归属
- 涉及文件：`zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue` 及 `zhi2-web-admin-wt-payfund` 同名副本。
- 本地预览地址 http://127.0.0.1:3080 刷新对应弹窗确认；如需更松/紧可调 `line-height` 为1.6/1.4。
- 所属项目：门户（zhi2-web-admin）；来源会话时间：2026-11-10。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_dialog_lineheight",
  "source_extraction_id": "9f9d9fa9684c4a77a3b74fcc8ecc72a9",
  "version": 1,
  "memory_type": "entities"
}
-->
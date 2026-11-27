---
audit_status: valid
last_checked: 2026-11-27T07:47:13+08:00
verdict_note: 惠山二期G/tencentDistrictBoundary.js-13/70 命中 getchildren 接口与 get_polygon 参数，腾讯街道轮廓用法属实。
---
- 使用 `get_polygon=3` 获取街道轮廓：不是独立接口，是腾讯 WebService 行政区划 API 的参数。
- 在区级大屏上，调用 `ws/district/v1/getchildren` 并传入 `id` 和 `get_polygon=3` 以获取街道轮廓。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Parâmetro Tencent get_polygon=3",
  "source_extraction_id": "bd420326a12843babc324cc305cc151c",
  "version": 1,
  "memory_type": "preferences"
}
-->
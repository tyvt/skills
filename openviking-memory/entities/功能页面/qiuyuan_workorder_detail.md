# 求援工单详情
苏住房防汛C端 H5 的求援工单详情页，按 rescueId 查询并渲染工单与处置日志。

## Description
- 列表首条目标工单为 `QYGD20261123000006`，地点路南苑；2026-11-24 在 8095 实机进入列表正常。
- 详情页路由按 rescueId 传参 `?id=2124811065694998530`。
- 接口按 rescueId 查询返回 200 且数据完整（`rescueNo=QYGD20261123000006`）。

## Interface
- 真实字段：区域用 `subdistrictName/communityName`，日志用 `operator/operateTime/content`，`urgentLevel="1"`，`status="4"`。
- 原 `RescueApiRow` 的 region/street/community/logs 字段名与真实接口不符。
- 列表接口为 RuoYi 风格 `{code,msg,rows,total}`，rows 在顶层，故列表渲染正常。

## Known Issues
- 2026-11-24 详情页字段全空根因：`request.ts:96` 的 `raw:true` 返回完整信封 `{code,msg,data}`，`detail.vue:72` 直接 `mapRow(r)` 把信封当数据行；应改为 `mapRow(r.data ?? r)`。
- 补充修复计划已提交审核并获通过（返回 pass 与 `approved_sha256`），范围含信封解包、字段映射修正；待用户确认后实施。

## Relations
- 所属项目「zhi2-mobile-query-h5-c」；部署站点「苏住房防汛C端 H5 nginx 站点」。

<!-- MEMORY_FIELDS
{
  "category": "功能页面",
  "name": "qiuyuan_workorder_detail",
  "source_extraction_id": "a5bb84377f824810939d97ca9ef65808",
  "version": 1,
  "memory_type": "entities"
}
-->
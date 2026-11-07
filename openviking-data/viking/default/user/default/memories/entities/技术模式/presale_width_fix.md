# 预售方案填报表单宽度修复
苏州市房地产监测V3 的 PresalePlanFillForm 组件修复了叙事块内输入框与日期选择器被撑满的问题。

## 修改内容
- 原因：`.narrative-block` 里把 `.el-input` 设成 `width: 100%`，导致日期选择器也被撑满整行
- 改为仅 textarea 全宽，竣工/交付/工程进度里的幢号输入框和日期选择器恢复为紧凑 inline 宽度（约 48px / 100px）
- 与其他填空保持一致

## 涉及文件
- `zhi2-web-admin/src/views/presale/permit/components/PresalePlanFillForm.vue`
- `zhi2-web-admin/src/views/presale/permit/plan/detail.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 刷新页面即可看到效果
- 所属项目：苏州市房地产监测V3；来源会话ID：76e18476-410b-48e2-8684-b252aafae89d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_width_fix",
  "source_extraction_id": "48df189a4d5045ffbb5db9580c9d5c11",
  "version": 1,
  "memory_type": "entities"
}
-->
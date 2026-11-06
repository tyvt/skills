# 定金退款通知书有效期字典缺失修复
苏州市房地产监测V3 中修复 `refund/detail.vue` 在字典缺少 `REFUND_NOTICE_VALIDITY` 项时抛错的问题。

## 根因
- `refund/detail.vue` 的 `initDict()` 加载 `NOTICE_VALIDITY` 字典后直接对 `find()` 结果访问 `.dictValue`；字典缺项时抛 `Cannot read properties of undefined (reading 'dictValue')`

## 修复内容
- 新增工具函数 `zhi2-web-admin/src/utils/noticeValidity.js`：`getNoticeValidityDays(list, key)` 安全查找有效天数，`formatNoticeEffectiveDate(dayjs, days)` 计算有效日期
- 修复 `refund/detail.vue`：字典项存在时自动填充「通知书有效日期」；缺失时提示「未配置退款通知书有效期，请手动选择通知书有效日期」且不抛错
- 同步修复同类隐患（4 个文件，含 `allocation/detail.vue`）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`refund/detail.vue`、`zhi2-web-admin/src/utils/noticeValidity.js`、`allocation/detail.vue` 等
- 所属项目：苏州市房地产监测V3；来源会话：78d15986-f89e-4ac8-b7bf-426222e6b9db；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_notice_validity_fix",
  "source_extraction_id": "6b2829c917c749e4b68d277d60842f1c",
  "version": 1,
  "memory_type": "entities"
}
-->
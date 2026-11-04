# 退款详情中缺失字典的安全查找
Suzhou Real Estate Monitoring V3 系统：当字典项缺失时直接访问 `.dictValue` 会导致错误；已添加带警告的安全查找。

## 问题根因
- `refund/detail.vue` 中的 `initDict()` 在 `REFUND_NOTICE_VALIDITY` 缺失时，访问 `find()` 结果的 `.dictValue`，读取到 undefined

## 修复
- 在 `src/utils/noticeValidity.js` 中创建 `getNoticeValidityDays` 以进行安全查找
- 当字典缺失时，`refund/detail.vue` 提示手动选择而不是抛出错误

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/038.md
- 涉及文件: refund/detail.vue, noticeValidity.js, detail-template.vue, dict-tag.vue, detailMixins.js, scan-tag-mismatch.js 等
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: 78d15986-f89e-4ac8-b7bf-426222e6b9db; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_dict_missing",
  "source_extraction_id": "a7d4b155515447d4b59be6579654e5d2",
  "version": 1,
  "memory_type": "entities"
}
-->
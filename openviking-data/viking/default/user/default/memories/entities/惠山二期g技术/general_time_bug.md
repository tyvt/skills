# 通用详情页时间变更覆盖选择Bug
业主自治通用详情页因handleDecisionTimeChange强行改写时间致回显错误，已通过default-time修复。

## 问题根因
- zhi2-web-admin/src/views/autonomy/general/detail.vue 中 @change="handleDecisionTimeChange" 将选中时间改写为00:00:00/23:59:59
- 覆盖用户原始选择，导致回显错误

## 修复方案
- 删除该事件绑定，改用 :default-time="['00:00:00','23:59:59']"
- 移除 handleDecisionTimeChange 方法

## 验证与归属
- 验证证据：src=惠山二期G/012.md
- 涉及文件：src/views/autonomy/general/detail.vue、src/components/zs-date-picker/zs-date-picker.vue
- 所属项目：惠山二期G；来源会话：599febc8-15af-4a92-bfc3-4d8864681fc6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "general_time_bug",
  "source_extraction_id": "231c4221ac6f44ddb6585f0f9f0386c6",
  "version": 1,
  "memory_type": "entities"
}
-->
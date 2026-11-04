# ctUserIdentityApply详情页补齐contentInfo
在 `zhi2-web-admin/src/views/property/ctUserIdentityApply/detail.vue` 补齐并对齐缺失的 `contentInfo`，使查看模式不再缺失。

## 改动内容
- 将 `contentInfo3` 调整为「合同/产证相关证件」，展示 `certificatePhoto`（`type: 'image'`）
- 新增 `contentInfo4` 用于「身份证明相关图片」，展示 `identityPhoto`（`type: 'image'`）
- 新增 `contentInfo5` 承接原错放在 `contentInfo3` 的「审核信息」（审核状态、审核人、审核时间、意见说明）

## 说明
- 现有 IDE 诊断报错集中在原有 `dictFormatter/getDicts/$refs` 类型推断，非本次新增 `contentInfo` 引入

## 关联信息
- 验证证据：extracted source=cursor project=G
- 涉及文件：zhi2-web-admin/src/views/property/ctUserIdentityApply/detail.vue
- 来源会话：453ca103-a90b-469b-8674-257148a1b956
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ctuseridentity_contentinfo_added",
  "source_extraction_id": "c236da9a3df445bb9d98b7def057c10b",
  "version": 1,
  "memory_type": "entities"
}
-->
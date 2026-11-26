- 不要显式配置 `submitApi`；`getSubmitApi` 按照约定正确地拼接了路径 `/autonomy/ownerCommitteeLog/submit`。
- `submitApi` 的生成逻辑是正确的；避免基于先前错误判断的冗余调整或配置。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: submitApi 的生成",
  "source_extraction_id": "3227bb6e122946bcad3020c0c46e6188",
  "version": 1,
  "memory_type": "preferences"
}
-->

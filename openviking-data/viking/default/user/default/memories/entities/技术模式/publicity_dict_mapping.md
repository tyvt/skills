# 公示类型与结论字典映射接入
泰兴小程序维修项目已接入 `t_mf_publicityType` 与 `t_mf_publicityConclusion` 字典映射做值转文案。

## 修改内容
- `maintainProject.js` 新增字典常量 `MF_PUBLICITY_TYPE = 't_mf_publicityType'` 与 `MF_PUBLICITY_CONCLUSION = 't_mf_publicityConclusion'`
- `fetchPublicityDetail` 中并行拉取两个字典（`Promise.all`）
- `mapPublicityDetail` 通过 `dictLabel` 做值转文案：`type` 与 `conclusion` 均显示字典文案，无匹配回退原值

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：`src/pages_maintain_project/maintainProject.js`、`src/pages_maintain_project/publicity-detail.vue`
- 来源会话ID：1dedcb9e-9461-47e6-ad26-b08c91aca59f
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publicity_dict_mapping",
  "source_extraction_id": "737837da48e84bd3b1294514eb020349",
  "version": 1,
  "memory_type": "entities"
}
-->
# 验收意见并入信息卡片不再单独分块
泰兴小程序 completion-acceptance.vue 中删除 opinion-card，将验收意见区域移入 info-card 内部紧贴竣工验收日期之下。
## 问题根因
- 验收意见区域原为独立 opinion-card 分块。
## 解决方案
- 删除 opinion-card，将验收意见移入 info-card 内部紧贴竣工验收日期之下。
- 保留原有展开/收起逻辑，附件材料保持独立卡片。
## 验证与归属
- 验证证据：src=泰兴小程序/020.md
- 涉及文件：src/pages_maintain_project/completion-acceptance.vue、src/pages_maintain_project/final-cost-detail.vue、src/pages_maintain_project/apply-detail.vue、src/pages_maintain_project/maintainProject.js、src/pages.json、src/pages_maintain_project/object-detail.vue、src/pages_maintain_project/project-detail.vue、src/pages_maintain_project/construction-manage.vue、src/pages_maintain_project/third-party-appraisal.vue
- 来源会话ID：1001f03a-2149-436d-91f2-135277c72900
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "acceptance_opinion_infocard",
  "source_extraction_id": "3035b0b609d145a6af09e8f9d214d24d",
  "version": 1,
  "memory_type": "entities"
}
-->
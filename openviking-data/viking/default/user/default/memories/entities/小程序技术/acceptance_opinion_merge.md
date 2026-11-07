
# 验收意见并入信息卡片
泰兴小程序 completion-acceptance.vue 已将「验收意见」并入上方信息卡片，不再单独分块。

## 改动要点
- 删除原 opinion-card。
- 将「验收意见」区域移动到 info-card 内部，紧跟「竣工验收日期」下面。
- 保留原有「展开/收起」逻辑。
- 「附件材料」仍保持独立卡片。
- 已检查 lint，无报错。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/pages_maintain_project/completion-acceptance.vue、final-cost-detail.vue、apply-detail.vue、maintainProject.js、pages.json、object-detail.vue
- 来源会话ID：1001f03a-2149-436d-91f2-135277c72900
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "acceptance_opinion_merge",
  "source_extraction_id": "eca9392103974c479511f0942f341ea8",
  "version": 1,
  "memory_type": "entities"
}
-->
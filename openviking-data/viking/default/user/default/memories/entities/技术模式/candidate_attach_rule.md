# 园区报名表单条件附件联动
园区差异化报名表单按身份与政治面貌动态切换条件附件及必填的实现约定。
## 触发条件
- 身份标识为「业主」时显示并必填「物业费结清证明」。
- 政治面貌为党员（dictValue='0'）时显示并必填「党员证明」。
## 实现要点
- 监听身份标识、政治面貌变更，动态 v-if 上传块并切换 rules。
- 字段隐藏时清空 model 与校验状态，避免隐藏字段拦截提交。
- 大小/格式限制与其它材料一致（如 100MB、jpg/png/pdf）。
## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/autonomy/candidateCollect/components/CandidateDialog.vue
- 所属项目：园区公共收益；来源会话：9188dc08-2eb6-4f25-a62a-99cd041edbf7；代码基线：191094f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_attach_rule",
  "source_extraction_id": "7305906246884e7399822169329ad226",
  "version": 1,
  "memory_type": "entities"
}
-->
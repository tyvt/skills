# 表决详情发起公示统一公示类型16
园区 zhi2-web-admin 四种表决详情维护结果后接公示，统一抽 decisionPublicity.js 处理公示类型 16 与多议题结果校验。

## 核心逻辑
- 常量 DECISION_RESULT_PUBLICITY_TYPE = '16'（与字典 t_mf_publicityType 表决结果公示一致，值不同只改常量）
- startDecisionPublicity / viewDecisionPublicity 跳转新增公示页并预填区域名、表决编号、公示类型；getDecisionDetailPath 供公示详情反向跳回
- 按钮显隐：一般/选项/排序表决在 bizState=='2' 且 form.result 有值；多议题须 checkAllTopicsHaveResult() 全部子议题有结果
- 无 publicityId 显示「发起公示」，有则「查看公示」（详情接口须返回 publicityId）
- publicity/detail.vue 的 goToRelBusinessDetail 对 publicityType=='16' 按 relBusinessType 映射回对应表决详情

## 验证与归属
- 验证证据：表决发起公示计划落地摘要与后端配合事项（字典 16、publicityId）
- 涉及文件：zhi2-web-admin/src/views/autonomy/components/decisionPublicity.js、publicity/detail.vue、general/detail.vue、multiply/detail.vue、publicity/components/StartPublicityBtn.vue
- 所属项目：园区公共收益；来源会话：9232c3f8-e145-49c4-a229-423452a543fb；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_publicity_pattern",
  "source_extraction_id": "7450b259a3f74eb1a01721b1303c3886",
  "version": 1,
  "memory_type": "entities"
}
-->
# 候选人征集详情页发布按钮显隐逻辑
在产品2.0的candidateCollect/detail.vue中调整发布按钮显示条件，使筹备组受isShowPublishButton控制，其他类型走通用条件。

## 修改内容
- 通用条件始终判断：bizState/msgId/candidateCollectType/publishState
- 仅当businessType为PREPARATORY_GROUP时，额外要求isShowPublishButton为true
- 其他businessType不受isShowPublishButton影响
- 核心判断改为：(businessType !== CANDIDATE_COLLECT_BUSINESS_TYPE.PREPARATORY_GROUP || isShowPublishButton)

## 验证与归属
- 验证：extracted source=cursor project=产品2.0
- 涉及文件：D:/repository/产品2.0/zhi2-web-admin/src/views/autonomy/candidateCollect/components/detail.vue
- 所属项目：产品2.0；来源会话：e756305d-8e7b-4296-8933-69ec5779f62d；代码基线：none
- 现有lint报错为文件原有TS插件报错，与本次改动无关

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_publish_btn",
  "source_extraction_id": "c5fda021628641648e01366542bde487",
  "version": 1,
  "memory_type": "entities"
}
-->
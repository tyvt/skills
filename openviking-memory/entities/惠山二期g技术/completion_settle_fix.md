# 竣工验收施工结算总额注释修正
竣工验收详情页「施工结算总额」的问号提示误用了「线下核查费」注释，已修正文案。

## 问题根因
- zhi2-web-admin/src/views/maintenance/completion/detail.vue 计算属性 constructionSettleAmountTip（第486行）文案为「线下核查费金额：统缴项目此项无需填写…」
- 该注释被误复制到「施工结算总额」字段上

## 修复方案
- 注释改为「维修工程的实际造价，仅针对维修施工阶段发生的费用。」
- 该计算属性被两处引用均已同步：新增/编辑表单 el-tooltip 与详情查看模式 contentInfo 的 labelTooltip

## 验证与归属
- 验证证据：extracted source=workbuddy project=惠山二期G
- 涉及文件：zhi2-web-admin/src/views/maintenance/completion/detail.vue
- 所属项目：惠山二期G；来源会话：6bac5a7c-3034-4609-9345-03915c598bc6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "completion_settle_fix",
  "source_extraction_id": "ae053fea123242788f33036f4ed333c3",
  "version": 1,
  "memory_type": "entities"
}
-->
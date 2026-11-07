# 信息推送详情页组件修复
苏州市房地产监测V3 中修复 InformationPush 模块 detail.vue 与 changeDetail.vue 的 Vue 警告与组件名问题。

## 修改内容
- detail.vue：data() 补充 primaryKey: 'regulatorProjectId'、moduleName: 'prefund'、businessName: 'infoReport'；组件名 BankBranch 改为 InformationPushDetail；整理 data() 末尾多余大括号缩进
- changeDetail.vue：同样补充三字段（businessName 为 'infoReportChange'）；组件名改为 InformationPushChangeDetail；取值与同目录 index.vue 对齐

## 涉及文件
- src/views/supervision/unblock/InformationPush/detail.vue
- src/views/supervision/unblock/InformationPush/changeDetail.vue
- src/views/supervision/unblock/InformationPush/index.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：b2283e1b-5660-4ecc-9c6b-175b05319777；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "information_push_detail_fix",
  "source_extraction_id": "dfa75a1a33464c4a91b18744ec547ae7",
  "version": 1,
  "memory_type": "entities"
}
-->
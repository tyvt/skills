# 业委会选举在线表决推送接口路径
太仓G端业委会选举「是否已推送在线表决」应请求 onlineDecisionProperty 模块而非 ownerDecision 模块接口。

## 问题描述
- ownerDecision.js 中 hasOnlineDecisionPush 若写成 `/estate/ownerDecision/hasOnlineDecisionPush`，选择物业小区后 isDisabled() 打错接口
- 正确路径为 `/estate/onlineDecisionProperty/hasOnlineDecisionPush?propertyProjectId=`，控制「推送业主在线表决」是否禁用

## 修复约定
- 迁移或复制 API 文件时按模块名核对 onlineDecisionProperty 与 ownerDecision 前缀

## 验证与归属
- 验证证据：会话 6d3a400f 用户抓包应为 onlineDecisionProperty，代码写成 ownerDecision，改路径后验证通过
- 涉及文件：zhi1-web-admin/src/api/estate/ownerDecision.js
- 所属项目：太仓G；来源会话：6d3a400f-8db2-4fad-adb0-25ba9f86e82a；代码基线：e177dad

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "online_decision_push_api",
  "source_extraction_id": "9f1553d11e6748dbbd5b1e168b4a4daf",
  "version": 1,
  "memory_type": "entities"
}
-->
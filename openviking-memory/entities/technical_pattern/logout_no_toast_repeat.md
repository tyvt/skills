# 销户成功无提示致重复点击
无锡锡山V2 的 zhi2-web-admin 中销户成功仅刷新数据无提示，用户易误判未生效而重复点击。

## 现象与问题
- benefit/pubRegulatoryAccount/detail.vue 的 withdraw() 销户成功仅调用 getDetail() 刷新，无成功提示
- 用户易误判未生效而重复点击销户按钮

## 解决方案
- 在 pubRegulatoryAccount/detail.vue 与 pubAccPropMgmt/detail.vue 增加销户确认框及「销户成功」提示
- 反馈风格与取消备案保持一致

## 验证与归属
- 所属项目：无锡锡山V2
- 验证证据：extracted source=cursor project=无锡锡山V2
- 验证：src=无锡锡山V2/001.md
- 涉及文件：benefit/pubRegulatoryAccount/detail.vue、benefit/pubAccPropMgmt/detail.vue 等多文件
- 来源会话：1260fc7c-7539-4aac-a8f7-c60a18826489；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "logout_no_toast_repeat",
  "source_extraction_id": "2b3b431dfc5c4ca08b1fc7e3928ac2bf",
  "version": 2,
  "memory_type": "entities"
}
-->
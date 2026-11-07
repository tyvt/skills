# 小程序消息页未读数统计与头部滚动跟随
消息页未读数统计须带readFlag:0，顶部管理/筛选移入z-paging并关闭fixed以跟随列表滚动。

## 问题背景
- 个人中心/消息角标调getMsgNum/unReadMsgNum不带参数拿到全量消息数而非未读数，角标永不为0
- 消息列表页将「管理」「筛选」固定在page-top顶部，用户觉占位且与列表割裂
- z-paging默认将整页容器当滚动区，头部区块留外层必固定，放入内才同滚动流

## 解决方案
- 未读数统计统一readFlag:0（getMsgNum另带projectType:1），列表筛选readFlag空串表示全部
- page-top移入z-paging内部，z-paging显式:fixed="false"，页面容器overflow:hidden，内容区flex:1，滚动交z-paging
- 底部批量操作栏（全选/设为已读/删除）保持固定，避免批操作丢失列表滚动位置

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话bcb98835用户诉求加readFlag:0及头部跟随滚动；代码核实index.vue:56,62带readFlag:0，My_Suzhufang.vue:114带projectType:1
- 涉及文件：pages_main/message/index.vue、message.vue、pages_main/my.vue、pages_tab/components/My_Suzhufang.vue、hooks/usePaging.js
- 所属项目：苏住房C；来源会话：bcb98835-f1ec-41eb-9aea-afdbf1871d66；代码基线：77666f8

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "message_readflag",
  "source_extraction_id": "524203ab1a35488d949dbc062913ff56",
  "version": 1,
  "memory_type": "entities"
}
-->
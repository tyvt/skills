# 未读角标不消失问题
苏住房C「我的」页 getMsgNum 不传参返回消息总数而非未读数，导致角标不消失。

## 现象
- 消息中心全部已读后返回「我的」页，未读角标数等于历史消息总数不归零

## 根因
- My_Suzhufang.vue 的 loadUnread 调 getMsgNum() 未传查询参数
- 消息中心调用带 { readFlag: 0, projectType: 1 }，readFlag=0 只查未读
- 不传参时后端按默认口径返回消息总数，已读后总数不变

## 解决方案
- 「我的」页补成 getMsgNum({ readFlag: 0, projectType: 1 })，onShow/返回时重新请求
- 同一计数接口多处消费时参数必须严格同源，避免 A 页未读 B 页总数分歧
- 联调用 vConsole 看 /msg/msg/msgNum?readFlag=0&projectType=1 返回体定位

## 验证与归属
- 验证：会话 318a55ec 全部已读角标不消失，已在 loadUnread 补齐参数
- 涉及文件：pages_tab/components/My_Suzhufang.vue、pages/index/components/My_Suzhufang.vue、pages/message/index.vue、api/msg.js
- 所属项目：苏住房C；来源会话：318a55ec-f120-4633-be9b-7750ed534251；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "get_msg_num_badge",
  "source_extraction_id": "bfcdbef44d864551a289c9427a08b7e8",
  "version": 1,
  "memory_type": "entities"
}
-->
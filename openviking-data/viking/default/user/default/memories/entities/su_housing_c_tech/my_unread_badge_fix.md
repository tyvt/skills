# 我的页未读角标参数缺失修复
苏住房C 小程序「我的」页未读消息角标因调用 `getMsgNum()` 未传参导致显示总数而非未读数，已修复。

## 问题原因
- `My_Suzhufang.vue` 的 `loadUnread` 调用 `getMsgNum()` 未传 `{ readFlag: 0, projectType: 1 }`
- 未传参时接口返回消息总数，全部已读后角标不消失

## 修改内容
- 在 `My_Suzhufang.vue` 的 `loadUnread` 中补上与消息中心一致的参数 `getMsgNum({ readFlag: 0, projectType: 1 })`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：318a55ec-f120-4633-be9b-7750ed534251
- 代码基线：none
- 涉及文件：`src/pages_tab/components/My_Suzhufang.vue`、`src/pages/message/index.vue`、`src/api/msg.js` 等

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "my_unread_badge_fix",
  "source_extraction_id": "d33c1384ff4a4ddeb16868b3c22e62c2",
  "version": 1,
  "memory_type": "entities"
}
-->
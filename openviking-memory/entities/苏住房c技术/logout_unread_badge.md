# 注销后消息未读角标不消失三层防护
苏住房C 小程序注销/退出登录后「消息」未读角标仍显示，需状态层、展示层、请求层三层防护才能彻底解决。

## 问题现象
- 用户在「我的」页注销账号后，顶部功能区消息图标仍显示未读数字角标（如 4），未登录不应展示未读数
- 注销瞬间在途的 getMsgNum 请求返回后无条件写回 unreadCount，造成「清了又冒出来」竞态复发

## 根因
- unreadCount 是页面局部 ref，只在登录态拉取后写入，注销流程既没重置也没在渲染层拦截登录态
- 在途请求返回后覆盖清零结果，导致角标复发

## 解决方案
- 状态层：onShow 的 else（未登录）分支里 unreadCount.value = 0
- 展示层：模板绑 computed messageBadge = unlogin ? 0 : unreadCount，让角标渲染带登录态兜底
- 请求层：loadUnread 进入前若无 token 直接清零 return，await 返回后再判一次 token，销毁期间旧响应丢弃，catch 里置 0
- 验收四步：登录有未读→显示；注销→消失；重登→恢复；注销时请求在途→不复发

## 验证与归属
- 验证证据：会话 a54442c4 结论含 onShow else 清零、messageBadge computed 兜底、loadUnread 前后校验 token；验收四条通过
- 涉及文件：pages_tab/components/My_Suzhufang.vue、store/user.js、pages_tab/components/menu/MenuSection.vue、HaveBgItem.vue、pages_my/setting/cancellationReason.vue、pages_my/setting/userInfo.vue、pages/index/my.vue、pages_my/setting/index.vue
- 所属项目：苏住房C；来源会话ID：a54442c4-8431-4207-b588-fa848d7bf178；代码基线：9cdf7b8

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "logout_unread_badge",
  "source_extraction_id": "e6e8e38071404e3ba2e177022db337ec",
  "version": 2,
  "memory_type": "entities"
}
-->
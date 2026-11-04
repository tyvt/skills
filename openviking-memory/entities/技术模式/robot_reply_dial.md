# robot_reply_dial 小程序机器人回复拨号入口
小程序机器人回复含电话号码时，因 rich-text 屏蔽事件导致 `<a href="tel:">` 不可点击，改为回复气泡下渲染可点拨号条目。
## 背景与原因
- 查微信官方文档：rich-text 屏蔽所有节点的事件（官方 Bug & Tip），组件无可用点击事件，回复里 `<a href="tel:">` 在小程序端点了没反应。
- uni-app 文档明确提示“内容中有链接需要点击则不能使用 rich-text”。
- `utils/index.js` 的 `linkifyPhoneNumbersInHtml` 已修好（切分逻辑正确），保留未动。
## 解决方案
- `pages_main/automaticRobot/index.vue` 回复气泡新增拨打入口：答案含电话号码时，富文本下方渲染可点条目（电话图标+号码+“拨打”，淡蓝底圆角），点击走 `uni.makePhoneCall`，不依赖 rich-text。
- `makePhoneCall(phone)` 加固：空号码 toast 提示“客服电话获取失败”；拨号失败有 toast 反馈，不再静默。
- 热线客服按钮 `@click="makePhoneCall()"`。
## 验证与归属
- 验证：正则行为 7/7 用例验证通过，lint 通过。
- 涉及文件：pages_main/automaticRobot/index.vue、utils/index.js、openAutomaticRobot.js、pages_my/robot/index.vue
- 所属项目：苏住房C；来源会话：fd6c9dda-33d2-4104-b5a6-db0fd1f2b3aa；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "robot_reply_dial",
  "source_extraction_id": "896550f80b6642d5a4aa13e5c0d3a711",
  "version": 1,
  "memory_type": "entities"
}
-->
- 微信小程序 `rich-text` 组件屏蔽所有节点事件，`<a href="tel:">` 电话链接不可点击（uni-app 亦不支持），须改用 `uni.makePhoneCall` 入口并加固空号与失败 toast。
- `utils/index.js` 的 `linkifyPhoneNumbersInHtml` 切分逻辑保留，不删除。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "richtext_phone_link",
  "source_extraction_id": "4dbe334130d741aa8c86c1e62c643463",
  "version": 1,
  "memory_type": "preferences"
}
-->
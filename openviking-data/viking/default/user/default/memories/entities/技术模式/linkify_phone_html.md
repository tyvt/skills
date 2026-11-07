# linkify_phone_html 号码转 tel 链接修复
`utils/index.js` 的 `linkifyPhoneNumbersInHtml` 修复：按通用标签切分，仅处理纯文本片段，避免整段 HTML 被跳过。
## 背景与原因
- 原逻辑按 `<a>` 标签切分后，用 `/^</` 跳过整段；因整段 HTML 以 `<p` 开头，导致整段被跳过，一个号码都转不了。
- 电话转链接需求来自安卓手机打开机器人时样式放大场景，需正确生成 `tel:` 链接。
## 解决方案
- 新逻辑按通用标签 `/(<[^>]*>)/g` 切分，只处理纯文本片段。
- 标签属性里的数字（`src`、`width` 等）不会被误判成号码。
- 只跳过 `<a>` 标签内的文本，标签外的号码正常转 `tel:` 链接。
## 验证与归属
- 验证：5/5 用例通过（`截图 <p>…0512-67422386转812</p>` 转 `tel:0512-67422386`、属性含8位数字未被改、已是 tel 链接不重复包、`<a>` 内+标签外只转外、纯文本无标签），`npm run build` 通过 `[validate-dist] ok`。
- 涉及文件：utils/index.js、dist/pages_main/automaticRobot/index.js、dist/utils/openAutomaticRobot.js、dist/utils/index.js
- 所属项目：苏住房C；来源会话：1ee54692-8a12-4edb-825c-181f617f22db；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "linkify_phone_html",
  "source_extraction_id": "896550f80b6642d5a4aa13e5c0d3a711",
  "version": 1,
  "memory_type": "entities"
}
-->
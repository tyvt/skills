# HTML文本电话号码转tel链接规范
苏住房C 机器人答案/公告等后端下发 HTML 中的电话须转为可点击 `tel:` 链接，须按通用标签切分只处理纯文本片段。

## 问题现象
- 原实现按 `<a>` 标签切分后用 `/^</` 跳过整段，结果整段 HTML 以 `<p` 开头，一个号码都转不了且不报错

## 根因
- 粗粒度「跳过以 < 开头的片段」误伤了正文所在片段
- 须避免误把标签属性里的数字（src、width、文件名 20240101.png）当成电话号码

## 解决方案
- 按通用标签切分：`html.split(/(<[^>]*>)/g)`，只对不含标签的纯文本片段做号码识别与替换
- 维护 inAnchor 状态只跳过 `<a>` 内文本，标签外号码正常转 `tel:`；已是 `tel:` 链接不重复包装
- 校验：直接跑源码真实实现写用例（5/5 通过），覆盖带转接号、属性含数字文件名+正文手机号、已是 tel: 链接、`<a>` 内文本+标签外号码、纯文本无标签五类
- 改完须核对 dist 产物（dist/utils/index.js 为新实现）再交付

## 验证与归属
- 来源会话：1ee54692；代码基线：9a3c8db；涉及文件：src/utils/index.js、pages_main/automaticRobot/index.vue、components/ZsRichText/ZsRichText.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术模式",
  "name": "html_tel_link",
  "source_extraction_id": "4edd2b91cca8449093310dc478e50406",
  "version": 1,
  "memory_type": "entities"
}
-->
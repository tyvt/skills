# WXSS不支持选择器反斜杠转义致报错
泰兴小程序 uno.config.ts 的 leading-1.4 规则生成带反斜杠选择器，微信 WXSS 不支持而编译报错。
## 问题根因
- `uno.config.ts` 的 `leading-1.4` 规则生成 `.leading-1\.4` 类选择器。
- 微信小程序 WXSS 不支持选择器反斜杠转义，编译报错。
## 解决方案
- 增加静态规则 `leading-1-4` 映射 `line-height: 1.4`。
- 将 `OptionCardList.vue` 类名同步修改为 `leading-1-4`。
## 验证与归属
- 所属项目：泰兴小程序
- 验证证据：extracted source=cursor project=泰兴小程序
- 验证证据：src=泰兴小程序/017.md
- 涉及文件：src/App.vue、src/static/iconfont.css、src/uni.scss、package.json、dist/build/mp-weixin/app.wxss、tmp-check-wxss.js、uno.config.ts、src/pages_owner/decision/components/multiple/OptionCardList.vue
- 来源会话ID：a0d0009b-0349-4d48-8002-ad825a15e96d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "wxss_backslash_escape",
  "source_extraction_id": "14f9f34c6b2047cf86ef295274671d43",
  "version": 1,
  "memory_type": "entities"
}
-->
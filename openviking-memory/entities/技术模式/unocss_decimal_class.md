# 小程序UnoCSS小数类名导致WXSS编译错误
泰兴小程序使用 UnoCSS 时，带小数点的类名（如 `leading-1.4`）会生成非法 WXSS 选择器导致编译失败。
## 问题根因
- `uno.config.ts` 规则 `/^leading-([.\d]+)$/` 使模板中 `leading-1.4` 生成 `.leading-1\.4`，微信小程序 WXSS 不支持选择器反斜杠转义，报 `unexpected \`。
- `1.4` 被当成 1.4rpx 行高，语义错误；行高倍数应为无单位 `1.4`。
## 解决方案
- `uno.config.ts` 增加静态规则 `leading-1-4` → `line-height: 1.4`（无单位倍数）。
- `OptionCardList.vue` 将 `leading-1.4` 改为 `leading-1-4`。
## 经验沉淀
- 小程序用 UnoCSS 时，不要使用带小数点的类名。
## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：`app.wxss`、`uno.config.ts`、`OptionCardList.vue`
- 所属项目：泰兴小程序；来源会话ID：a0d0009b-0349-4d48-8002-ad825a15e96d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unocss_decimal_class",
  "source_extraction_id": "1d73c2d6945a4b4f88a81ca174efdb92",
  "version": 1,
  "memory_type": "entities"
}
-->
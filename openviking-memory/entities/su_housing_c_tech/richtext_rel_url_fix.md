# 富文本相对路径图片修复
苏住房C 小程序「苏州市购房政策」详情页正文图片因相对路径在小程序 `rich-text` 中无法加载导致页面空白，已修复。

## 问题原因
- 接口返回正文为 HTML，图片地址是相对路径 `/zs-fym/...`
- 微信小程序 `rich-text` 组件无法加载相对路径图片；`ZsImage` 组件会自动补全域名，但 `ListDetail` 里的 `rich-text` 未处理

## 修复内容
- `utils/index.js`：新增 `resolveFullMediaUrl` 和 `formatRichTextContent`，将富文本相对图片路径转为完整 URL（如 `https://szfang.szfcweb.cn/zs-fym/...`）
- `pages/news/components/ListDetail.vue`：购房政策详情页渲染前对正文做 URL 转换
- `buyHousePolicy/index.vue` / `fundPolicy/index.vue`：修正跳转链接里多余的 `??`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`utils/index.js`、`pages/news/components/ListDetail.vue`、`buyHousePolicy/index.vue`、`fundPolicy/index.vue`
- 所属项目：苏住房C；来源会话ID：5dc51561-f159-4aea-926e-8205773be7f2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "richtext_rel_url_fix",
  "source_extraction_id": "7e3e0be08a0d49459cf6cdab5cb477e0",
  "version": 1,
  "memory_type": "entities"
}
-->
# 账户注销页面 UI 异常修复
苏住房C 小程序账户注销页（cancellationWarning.vue）修复空白区域、图标未居中及协议渲染不全问题。

## 问题原因
- `.page-content` 设 `min-height:50vh` 导致内容少时大片空白
- `ZsImage` 为块级元素，`text-align:center` 无法居中警告图标
- 富文本混合 HTML 标签与实体编码时旧解码逻辑跳过解码，协议正文丢失

## 修改内容
- `cancellationWarning.vue`：移除 `min-height:50vh` 改用 flex 布局，flex 居中警告图标，优化字体样式
- `cancellationWarning.vue`：数据加载 `res.data` 为空时回退 `res.msg`
- `utils/index.js`：修复 `decodeHtmlEntitiesIfNeeded`，含 HTML 实体即解码

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：b5ae7e42-f2bf-4ced-a0de-6ca8ba5bd6e2
- 代码基线：none
- 涉及文件：`src/pages_my/setting/cancellationWarning.vue`、`src/components/ZsRichText/ZsRichText.vue`、`src/utils/index.js`

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "cancel_page_ui_fix",
  "source_extraction_id": "d33c1384ff4a4ddeb16868b3c22e62c2",
  "version": 1,
  "memory_type": "entities"
}
-->
# 富文本解码函数正文空白
苏住房C 账户注销页 decodeHtmlEntitiesIfNeeded 遇标签与实体混排跳过解码致正文空白。

## 现象
- 账户注销页 cancellationWarning.vue 协议只剩标题《用户注销协议》，正文整块不显示

## 根因
- utils/index.js 的 decodeHtmlEntitiesIfNeeded 以「是否含 HTML 标签」判定是否解码
- 后台下发富文本含真实标签与实体化标签混排时，判定已有标签直接返回原串
- 实体标签未还原为可渲染节点，ZsRichText 渲染出空内容

## 解决方案
- 判定条件改为「是否含 HTML 实体」（&xxx; / &#xxx;），含实体即解码，纯 HTML 解码无损
- 移除 .page-content 的 min-height:50vh，改 flex 按内容自适应
- ZsImage 块级元素父级用 flex + justify-content/align-items 居中
- 若布局正常仍只有标题，问题在后台 szf.user.cancellation 未配完整富文本

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 b5ae7e42 注销页 UI 异常，改解码判定并移除 min-height、flex 居中
- 涉及文件：utils/index.js、pages_my/setting/cancellationWarning.vue、components/ZsRichText/ZsRichText.vue
- 所属项目：苏住房C；来源会话：b5ae7e42-f2bf-4ced-a0de-6ca8ba5bd6e2；代码基线：77666f8

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "decode_html_entities",
  "source_extraction_id": "bfcdbef44d864551a289c9427a08b7e8",
  "version": 1,
  "memory_type": "entities"
}
-->
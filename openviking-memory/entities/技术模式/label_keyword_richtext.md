# label关键词项须为richtext
contentInfo/contentInfo2 计算属性中 label 含特定关键词的项需统一置为 richtext 类型。

## 问题现象
- `contentInfo`/`contentInfo2...` 计算属性中 `label` 含"说明/描述/内容/概况/简介/备注"的项未统一置为 `richtext`

## 解决方案
- 将 `label` 含"说明/描述/内容/概况/简介/备注"的项 `type` 统一置为 `richtext`
- 涉及 166 个 `.vue` 文件 197 处替换，脚本校验零遗漏

## 验证与归属
- 验证证据：src=web-admin/001.md
- 涉及文件：`.vue`
- 所属项目：园区物管2.0；代码基线 none；来源会话：16386daf-af1e-478d-8f26-18c54b8c5204

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "label_keyword_richtext",
  "source_extraction_id": "6399c380350447e9ad0523af8f3bf37f",
  "version": 1,
  "memory_type": "entities"
}
-->
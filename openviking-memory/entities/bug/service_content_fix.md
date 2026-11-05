# 服务内容弹窗固定文本与输入项混淆修复
产品2.0 的 complexServiceDetailDialog.vue 中「服务内容」弹窗曾将固定文本与占位符塞进同一输入框，已修复为内联展示。
## 问题根因
- 截图显示“11 222 [x]”被整段塞进一个输入框，[x] 本应是可编辑占位项
## 修复内容
- 类型判断由 === 改为 ==，兼容接口返回数字类型，确保固定文本与可编辑项正确分流
- 对 contentType == '1' 且内容为 [x]/【x】的项显示为空输入框，不展示占位符文本
- 外层 content-container 增加边框与内边距；固定文本用 span 内联，可编辑项用小尺寸内联输入框
## 验证与归属
- 修复后固定文本、已填内容和待填占位项在同一区域展示
- 涉及文件：complexServiceDetailDialog.vue、complexServiceDetailTable.vue、serviceItem/detail.vue
- 所属项目：产品2.0；来源会话：0795a3c7-8e50-4638-8a48-817e2f850829；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "service_content_fix",
  "source_extraction_id": "e626ff8127fa48a1baaecc584e194dd4",
  "version": 1,
  "memory_type": "entities"
}
-->
# 园区物管V0 小区公告仅上传图片无法保存
园区物管V0 小区公告富文本组件仅上传图片时误报「请填写内容」无法保存，已修复。

## 问题根因
- 保存逻辑用正则去掉所有 HTML 标签和空白后，仅用剩余字符串判断是否有内容
- 只插入图片时 HTML 类似 <p><img src="..."></p>，去标签后为空，误报「请填写小区公告内容！」
- 涉及文件：policy/js/policy_SmPolicyCommunityRecordAdd.js

## 解决方案
- 新增与编辑（policy_SmPolicyCommunityRecordEdit.js）保持一致逻辑
- .html() 可能为 undefined，统一写成 || ''
- 去掉标签后无文字时，用临时 div 解析 HTML，若存在 img 则视为有内容

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管V0
- 涉及文件：policy/js/policy_SmPolicyCommunityRecordAdd.js、policy/js/policy_SmPolicyCommunityRecordEdit.js
- 所属项目：园区物管V0；来源会话ID：c95e7ecd-3f26-4fcc-b024-33db02cc9535

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "policy_image_only",
  "source_extraction_id": "699078b4f19642a0bb7063574b980cd1",
  "version": 1,
  "memory_type": "entities"
}
-->
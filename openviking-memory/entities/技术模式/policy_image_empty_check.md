# 社区公告的纯图片内容保存失败
js 文件 policy_SmPolicyCommunityRecordAdd.js 在移除 HTML 标签后判定内容为空，导致无法保存纯图片。

## 问题
- 正则表达式移除所有 HTML 标签和空格；内容 `<p><img></p>` 变为空，导致虚假的内容缺失错误。

## 解决方案
- 统一使用 .html() || ''，若没有文本，则使用临时 div 检测 img 标签以确认内容有效。
- 同样应用于 policy_SmPolicyCommunityRecordEdit.js。

## 文件与来源
- 涉及文件: policy_SmPolicyCommunityRecordAdd.shtml, policy_SmPolicyCommunityRecordEdit.shtml, js/policy_SmPolicyCommunityRecordAdd.js, js/policy_SmPolicyCommunityRecordEdit.js.
- 来源会话: c95e7ecd-3f26-4fcc-b024-33db02cc9535.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "policy_image_empty_check",
  "source_extraction_id": "946821cb168e4998b6ec501f63eecd13",
  "version": 1,
  "memory_type": "entities"
}
-->
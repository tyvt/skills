# 文档模板字段尺寸修复
苏房V3客测部署版本文档模板中调整 companyName 与 bankName 字段的 pt 宽度/高度，避免压住底图标签。

## 修改要点
- companyName 宽度由 197.55pt 加宽至 217pt，单行放下测试值，右缘 394.25pt 不碰底图「统一社会信用代码」标签（399.4pt）
- bankName 宽度由 193pt 收窄至 155pt，不再压「预售资金监管账户」标签
- bankName 高度由 30.45pt 加高至 45pt，支持两行折行完整显示

## 实施方式
- worktree 基线 4432d357，与客测部署版本一致
- 先提取两个 AlternateContent 块确认内部结构，再实施模板修复

## 项目归属
- 所属项目：苏房V3 web-admin-h5（gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited）
- 来源会话时间：2026-11-06

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "template_field_fix",
  "source_extraction_id": "c91d9e4743be4ff78c0092caa799fcd4",
  "version": 1,
  "memory_type": "entities"
}
-->
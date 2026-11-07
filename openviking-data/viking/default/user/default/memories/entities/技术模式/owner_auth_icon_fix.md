# 业主认证选择圆圈样式缺失修复
苏住房C 业主认证页面右侧勾选圆圈加载不出来，根因是 icon-checked.svg / icon-nocheck.svg 在重构中被删但页面仍引用。

## 问题根因
- icon-checked.svg、icon-nocheck.svg 在之前重构中被删除，页面仍在引用，勾选圆圈一直加载失败

## 修复内容
- 从 git 历史恢复缺失图标（icon-checked、icon-nocheck、icon-contract 等共 8 个 SVG）
- 在 TitleCard 内置 CSS 单选圆圈，不再依赖图片文件：未选中灰色空心圆，选中蓝色渐变圆 + 白色对勾
- 简化页面代码，去掉失效的 ZsImage 插槽引用

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_owner/house/owner/authentication.vue、src/pages_owner/house/components/TypeChoose_Suzhufang.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：7f2654d5-5bab-4165-aa36-1e84ddbdfa13；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "owner_auth_icon_fix",
  "source_extraction_id": "7078ae91ae8c4d12956f0dcd2e68e7a4",
  "version": 1,
  "memory_type": "entities"
}
-->
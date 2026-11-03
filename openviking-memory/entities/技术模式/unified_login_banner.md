# UnifiedLogin platform-banner-desc 左对齐规范
门户 UnifiedLogin 顶部平台区文案图与设计稿一致为左对齐时，应避免固定宽度百分比拉伸。

## 正确做法
- 推荐 height: 59.15%（按设计稿 97/164 比例）+ width: auto 等比缩放
- object-position: left top 让两行文案从左侧装饰区之后起排
- max-width 限制在右侧按钮区左侧，避免与按钮重叠
- 去掉 width: 33.55% 一类固定宽度百分比把文案块拉成视觉居中

## 验收顺序
- 用户验收常先改 desc 左对齐，再调标签与按钮
- 改完用设计稿截图或 unified-login-visual.spec.ts 对比

## 涉及文件与归属
- 涉及 UnifiedLogin.vue、tests/e2e/unified-login-visual.spec.ts、public/assets/images/UnifiedLogin
- 所属项目：门户；来源会话 1c06a96f；代码基线 a1e5beb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unified_login_banner",
  "source_extraction_id": "24c50c3f5b784d6182980508c1026f96",
  "version": 1,
  "memory_type": "entities"
}
-->
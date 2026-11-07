# uni-app 自定义组件根节点 margin 不生效改用父级 flex gap
苏住房C 的 zhi2-mobile-shimin 中，父组件 scoped 样式作用不到自定义组件根节点，模块间距须用父容器 flex + gap 控制。

## 问题根因
- pages_owner/project/info 顶部小区信息卡片与「小区周边」白卡贴在一起，加 module-gap（margin-top:10px）类无效
- uni-app 小程序端父组件 scoped 样式作用不到自定义组件根节点，class 挂上样式却不落

## 解决方案
- 页面根容器（如 .project-page）用 display:flex; flex-direction:column; gap:20rpx 控制子模块间距
- 删掉无效的 module-gap 类，与社区/街道信息页写法保持一致
- 间距嫌小调 gap 到 24rpx/32rpx；通用约定：卡片间留缝一律用父级 flex gap，不给子组件根节点写 margin，也不 :deep 到子组件根做间距

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话 80f4d555（基线 8fc3cc5），pages_owner/project/info/index 间距不生效改 .project-page flex+gap 后修复
- 涉及文件：pages_owner/project/info/index.vue、components/commonNew/baseCard.vue、pages_owner/community/info/index.vue、pages_owner/subdistrict/info/index.vue
- 所属项目：苏住房C；来源会话：80f4d555-4b91-4605-a249-4affc7710dfd；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "module_gap_flex",
  "source_extraction_id": "62d87249144d403883d1af7d2739cef7",
  "version": 1,
  "memory_type": "entities"
}
-->
# uni-app 模块间距用父级 flex gap
在 uni-app 小程序端，给自定义组件根节点加 margin 类不生效，模块间距需用父容器 flex + gap 控制。

## 问题根因
- pages_owner/project/info 中小区信息卡片与「小区周边」白卡贴在一起，加 module-gap（margin-top:10px）类无效
- uni-app 小程序端父组件 scoped 样式作用不到自定义组件根节点，class 挂上去了样式却不落

## 解决方案
- 在页面根容器（如 .project-page）用 display:flex; flex-direction:column; gap:20rpx 控制子模块间距
- 删掉无效的 module-gap 类，与社区/街道信息页写法保持一致
- 间距仍嫌小就把 gap 调到 24rpx / 32rpx

## 通用约定
- 需要「卡片之间留缝」时一律用父级 flex gap，不要给子组件根节点写 margin
- 不要在父级 scoped 里 :deep 到子组件根上做间距

## 验证与归属
- 验证证据：会话 80f4d555（基线 8fc3cc5）结论为父组件 scoped 作用不到自定义组件根导致 module-gap 无效，改 flex+gap 后修复
- 涉及文件：pages_owner/project/info/index.vue、components/commonNew/baseCard.vue、pages_owner/community/info/index.vue、pages_owner/subdistrict/info/index.vue
- 所属项目：苏住房C；来源会话：80f4d555-4b91-4605-a249-4affc7710dfd；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "uni_module_gap",
  "source_extraction_id": "0bb48399527b42a8b82c414ecfd73497",
  "version": 1,
  "memory_type": "entities"
}
-->
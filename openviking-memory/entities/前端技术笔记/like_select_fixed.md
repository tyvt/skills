# zs-like-select在可滚动dialog内下拉定位修复
dialog body 设 overflow:auto 时，zs-like-select 下拉列表被父级裁剪或定位错位，需改用 fixed 定位。

## 问题根因
- dialog body 设 overflow:auto 时，下拉层依赖 absolute 相对于被 overflow 裁剪的祖先导致错位

## 解决方案
- 下拉层使用 position: fixed + 较高 z-index
- 打开时用 trigger 的 getBoundingClientRect 计算 left/top/width
- 监听所属 dialog 的 scroll 与 window resize，滚动时重算位置

## 验证与归属
- 验证：长表单 dialog 内打开 like-select，滚动 dialog 后下拉仍贴齐输入框且不被裁切
- 验证证据：会话 7f3a94cb 诉求 4 用户要求 like 组件下拉不被 dialog overflow 裁剪，结论 fixed 定位 + scroll/resize 同步
- 涉及文件：zhi2-web-admin/src/components/zs-like-select/index.vue
- 所属项目：2-0；来源会话：7f3a94cb-8b2a-4c1e-9d3e-4f8a1b2c3d4e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "like_select_fixed",
  "source_extraction_id": "359c236a1969416fa338e5f5e1bf3a00",
  "version": 1,
  "memory_type": "entities"
}
-->
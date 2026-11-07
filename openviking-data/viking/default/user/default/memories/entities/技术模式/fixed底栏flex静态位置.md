# fixed底栏被flex静态位置摆偏
position:fixed 底栏在兄弟节点使用 align-items:flex-end 的 flex 布局下会按静态位置摆放，导致整块底栏偏到一侧、文字不居中。

## 问题现象
- 登录页（或任意页面）的 position:fixed 底栏在兄弟节点使用 align-items:flex-end 的 flex 布局下，文字突然不居中、整块底栏偏到一侧
- 改内部 text-align 无效，看起来像定位失效

## 根因
- fixed 元素在 left/right 为默认 auto 时，其水平位置按 flex 的「静态位置」算法确定
- 会被 flex 容器的对齐方式（如 flex-end）带着走

## 解决方案
- 给 fixed 元素显式补 left:0; right:0 + box-sizing:border-box，让其相对视口左右贴齐，再由内部 text-align:center 居中
- 若仍异常，检查外层是否有 transform（会把 fixed 的包含块改为该祖先）

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 4b4a9576 最终结论，.login.login--form-only 的 align-items:flex-end 使 fixed 底栏按静态位置摆放，补 left:0; right:0 + border-box 后恢复居中
- 涉及文件：zhi2-web-admin/src/views/login.vue
- 所属项目：园区物管2.0；代码基线 b2b559778；来源会话 4b4a9576-d928-45cc-bdb7-cc109ec7c990

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fixed底栏flex静态位置",
  "source_extraction_id": "fb667fe1f44c48baa6770df578884eff",
  "version": 1,
  "memory_type": "entities"
}
-->
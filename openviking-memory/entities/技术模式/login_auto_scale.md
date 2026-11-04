# 登录页JS动态放大修复
苏州市房地产监测V3 登录页因JS动态计算尺寸导致加载中自动放大拉伸的bug与修复要点。

## 问题现象
- 输入登录地址页面自动放大拉伸，视觉上不该有的拉升
- 后台左侧图片加载后 syncLoginBoxLayout() 按图片宽高比和表单高度改写面板宽度/最小高度
- ResizeObserver 与 window.resize 反复触发重算，加载过程多次跳变
- dist 中无 CSS 过渡，确认是 JS 逻辑导致

## 解决方案
- 仅修改 zhi2-web-admin/src/views/login.vue
- 删除整套动态尺寸逻辑：loginBgInlineStyle、syncLoginBoxLayout、measureLoginFormHeight、ResizeObserver、resize 监听及相关 data/watcher
- 布局首帧即固定：面板宽度固定 520px，图片用 object-fit: cover 填充左侧区域，加载零跳动
- 顺带修复短视口溢出：.login 由 height:100% 改为 min-height:100%，内容超高页面滚动，“主办方/技术支持”不再压住登录按钮

## 验证与归属
- 验证：浏览器复现线上问题（登录框撑大、底部文字压按钮），本地 dev serve 通过
- 涉及文件：zhi2-web-admin/src/views/login.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：68b279ff-7526-4e1e-b55d-551e0e5c8376；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_auto_scale",
  "source_extraction_id": "6b04a545eba749769f2ebbcc33cd448f",
  "version": 1,
  "memory_type": "entities"
}
-->
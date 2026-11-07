# 云守护相关页面UI调整
苏住房C(zhi2-mobile-shimin)中【掌服务-小区管理-云守护】相关UI已调整，涉及云守护首页与申请Step1组件。

## 云守护首页(pages_guard/index/index.vue)
- 页面容器 `padding` 设为 0，顶部信息区背景仅保留下方内边距，信息卡片顶角圆角去除以贴合屏幕边缘
- 头像改用 `userStore.avatar`，加载失败时回退到默认头像
- 梯形背景图 `icon_tip_bg.png` 补充分包路径 `subpackage="pages_guard"` 并设固定高度，修复不显示问题
- 按设计图重排首页布局：用户信息、统计文案、「继续申请云守护」按钮统一放入蓝色头部区域（`header-section`），守护对象列表独立放在头部下方白色区域
- 头部背景浅蓝 `#e5ecf7`，右下角圆角 `48rpx`；用户卡片为白色圆角 `16rpx` 卡片并留白
- 头像改为左侧圆形头像、灰色占位背景；统计文案去掉左侧白底与右侧装饰图，改为蓝色背景上的纯文字
- 修复统计条右侧错位色块：原 `white-bg` + `icon_tip_bg.png` 组合布局有误，已改为简洁文案样式
- 确认分包静态资源 `pages_guard/static/images/default-avatar-gary.png` 存在，避免头像不显示

## 申请云守护Step1(guardApply/components/step1.vue)
- 房屋选中图标 `.select-yes` 设 `40rpx × 40rpx` 尺寸
- 「是否有电梯」单选项间距由 `20rpx` 调整为 `32rpx`(16px)
- 添加紧急联系人加号 `::before` 伪元素改 `inline-flex` 居中，修复加号不在圆心
- 上传附件「+」图标 `up-loader.svg` 复制到 `pages_guard/static/svg/`，修复分包静态资源缺失

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_guard/index/index.vue`、`guardApply/components/step1.vue`、`step2.vue`、`ZsImage.vue`
- 来源会话ID：5d912c3c-3130-4cf8-9e0a-0d48f904b5f4；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "cloud_guard_fix",
  "source_extraction_id": "7bbfec6e00654c00b561e884e8122dfc",
  "version": 2,
  "memory_type": "entities"
}
-->
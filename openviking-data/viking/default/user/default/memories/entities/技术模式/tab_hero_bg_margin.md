
# 含背景tab页顶部留白边距不一致
多个员工端 tab 页（home/workbench/profile/organization）含背景图时顶部留白与边距不一致，通过调整 `ZsImage` 的 `mode` 与各自 hero 背景宽度/定位修复。
## 问题根因
- 各 tab 页 hero 背景图缺少统一 `mode` 与宽度/定位规则，导致含背景时顶部留白边距不一致。
## 解决方案
- `src/components/ZsImage/ZsImage.vue` 新增 `mode` prop（默认 `aspectFit`），内部 `<image>` 改用 `:mode="mode"`。
- `src/pages/staff/home/index.vue`：`<ZsImage mode="aspectFill">` + `.hero-background{width:815rpx; top:0; right:0}`。
- `src/pages/staff/workbench/index.vue`：去掉 `.hero-bg-wrap` 包裹，图片直挂 hero，`width:1071rpx`。
- `src/pages/staff/profile/index.vue`：hero 高度改纯 px 计算（`uni.upx2px(280)+statusBarHeight`），新增 `heroBgStyle` 动态宽度，`mode="aspectFill"`。
- `src/pages/staff/organization/index.vue`：同步调整 hero 背景。
## 验证与归属
- 验证证据：src=泰兴小程序
- 涉及文件：src/components/ZsImage/ZsImage.vue、src/pages/staff/home/index.vue、src/pages/staff/workbench/index.vue、src/pages/staff/profile/index.vue、src/pages/staff/organization/index.vue
- 来源会话ID：46d3f531-42c8-47d5-a99d-50772f08989d
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tab_hero_bg_margin",
  "source_extraction_id": "628e445ead5342fe8e8a0f3c75869f07",
  "version": 1,
  "memory_type": "entities"
}
-->
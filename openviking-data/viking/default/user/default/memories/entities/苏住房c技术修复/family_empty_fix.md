# 业主端家庭空状态图片与按钮样式修复
苏住房C小程序family页面因图片缺失、路径错误及按钮宽度问题导致渲染层报错与样式异常，已从Git恢复资源并改用主包路径与固定宽度。

## 问题根因
- `family-empty.png`与`bg-button.png`在重构中被删，页面仍引用导致渲染层网络层错误
- `family/index.vue`使用`../static/images/family-empty.png`，微信小程序解析为分包路径无文件触发500
- 空状态容器未设宽度，`ZsButton`为`width:inherit`导致「前往添加」按钮挤成竖排小方块

## 修复内容
- 从Git历史恢复`src/static/images/family-empty.png`和`bg-button.png`
- 空状态改用`ZsImage`，路径改为主包格式`images/family-empty.png`（实际加载`/static/images/family-empty.png`）
- 列表顶部`PageBg`改为`images/bg-button.png`
- 空状态容器设`width:100%`，按钮固定`280rpx`宽度

## 涉及文件与归属
- 涉及文件：`family/index.vue`、`mainStaticPaths.js`、`authentication/family/index.vue`、`ZsImage.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：4b96617b-0fec-4c96-af40-e0ec9f6a6e13；代码基线none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "family_empty_fix",
  "source_extraction_id": "dd644fade7404995bf520b780ef14064",
  "version": 2,
  "memory_type": "entities"
}
-->

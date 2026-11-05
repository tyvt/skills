# ZsEmpty空状态图塌缩修复
苏住房C小程序 `ZsEmpty` 组件因尺寸循环依赖导致空状态图塌缩为0，已修复并影响所有使用页面。

## 问题根因
- `ZsEmpty` 中 `.empty-pic` 使用 `width/height: fit-content`，内部 `ZsImage` 设 `100%`
- 微信小程序父依赖子、子依赖父形成循环依赖，图片区域塌缩为0只显文字

## 修复要点
- `ZsEmpty.vue`：`.empty-pic` 改固定尺寸 `320rpx × 320rpx`（与 `family/index.vue` 空状态图一致）
- `myContract.vue`：为 `ZsEmpty` 显式传 `subpackage="pages_main"` 确保加载分包静态资源

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/components/ZsEmpty/ZsEmpty.vue、src/pages_main/my/myContract.vue、src/components/ZsImage/ZsImage.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：269bb15a-f2a2-4040-ac11-d7ad84921432；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zsempty_style_fix",
  "source_extraction_id": "28e8d98968314a9086db1bb85f1eddd6",
  "version": 1,
  "memory_type": "entities"
}
-->
# 首页热门活动轮播图裁切修复
苏住房C 首页「热门活动」轮播图因 `aspectFill` 导致宽图左右被裁切，已改为 `aspectFit` 并自适应容器比例。

## 问题原因
- 轮播图使用 `mode="aspectFill"`，固定高度容器内按高度铺满，宽图左右被裁掉

## 修复内容
- `Home_Suzhufang.vue`：图片缩放模式 `aspectFill` → `aspectFit`，完整显示不裁切
- 容器高度由固定 `158px` 改为按比例 `690:240` 自适应：`height: calc((100vw - 20px) * 240 / 690)`
- 与屏幕宽度联动，避免容器比例与图片不匹配

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`Home_Suzhufang.vue`、`ZsSwiper.vue`、`ZsImage.vue`
- 所属项目：苏住房C；来源会话ID：6d739bef-cad1-47be-b7b4-83a3d7029671；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "home_carousel_crop",
  "source_extraction_id": "10da4203cded4af8a50dcda2490f11c8",
  "version": 1,
  "memory_type": "entities"
}
-->
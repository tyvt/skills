# 决策列表绑定complexPhoto显示项目
苏住房C 小程序业主端决策列表 `DecisionList.vue` 已改为绑定 `complexPhoto` 远程图片，无图回退蓝色占位图。

## 修改内容
- `DecisionList.vue`：固定占位 `<image>` 改为 `<ZsImage>`，绑定 `:src="item.complexPhoto"` 且 `:local="false"` 走 `resolveMediaUrl` 解析远程路径
- 无图或加载失败回退 `images/house_szf.png`（`pages_vote` 分包）
- `decision/index.vue` 与 `elect/index.vue`：在 `rows.map` 显式保留 `complexPhoto: el.complexPhoto`

## 验证情况
- 三个文件无 linter 报错，`npm run build` 编译通过
- 需本地确认 `listDecisionView` 响应中 `rows[].complexPhoto` 有值则显示真实小区照片，为 null 仍显示蓝色占位图（需后端填充）

## 涉及文件
- src/pages_owner/decision/components/DecisionList.vue
- src/pages_owner/decision/index.vue
- src/pages_owner/elect/index.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：a33c6375-1500-460f-81a1-56831ba1739b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_complexphoto",
  "source_extraction_id": "77dfc578cbe248d99adb47bed2b7e4a2",
  "version": 1,
  "memory_type": "entities"
}
-->
# 空态图empty.png分包迁移路径失效修复
苏住房C 分包迁移后 `empty.png`、`apply-empty.png` 等空态图主包路径失效导致微信开发者工具报 500，已增加分包静态映射修复。

## 问题根因
- `17443e68` 提交将 `empty.png`、`apply-empty.png` 从主包 `src/static/images/` 迁到各分包如 `pages_credit`、`pages_main`、`pages_owner`
- 代码仍用 `images/empty.png`，`resolveStaticUrl` 在主包 Tab 页及未配置分包时错误解析到主包路径
- 主包已无该文件，微信开发者工具报 500 错误

## 修复要点
- 在 `src/utils/index.js` 增加 `SUBPACKAGE_STATIC_IMAGES` 映射（与 `scripts/migrate-main-empty-static.mjs` 一致）
- 更新 `resolveStaticUrl` 正确解析分包静态图

## 涉及文件
- `src/utils/index.js`
- `src/components/ZsEmpty/ZsEmpty.vue`
- `src/components/ZsImage/ZsImage.vue`
- `package.json`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：9b92579b-9f3a-4e44-a8e1-f17d395f2790
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "empty_png_subpkg",
  "source_extraction_id": "8af34dd423d746b8b76e046dd6ee35eb",
  "version": 1,
  "memory_type": "entities"
}
-->
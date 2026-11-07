# 业主报修页本地静态图未打包修复
苏住房C 中 `pages_owner/repair/add.vue` 引用 `./static/` 图片未被 uni-app 打包导致 500，已迁移至 `pages_owner/static/` 并修正引入路径。

## 问题根因
- `add.vue` 从 `./static/` 引用图片，构建后路径为 `/pages_owner/repair/static/xxx.png`。
- uni-app 不会把 `pages_owner/repair/static/` 复制到小程序输出目录，运行时找不到文件返回 500。
- 同模块 `submit.vue` 使用 `./static/`（即 `pages_owner/static/`）会被正确打包。

## 修复内容
- 将 `icon_feedback.png`、`icon_repair.png` 复制到 `pages_owner/static/`。
- 修改 `add.vue` 的 import 路径：`import iconArrowRight from './static/icon_arrow_right.png'`、`import iconRepair from '../static/icon_repair.png'`、`import iconFeedback from './static/icon_feedback.png'`。

## 涉及文件
- `src/pages_owner/repair/add.vue`
- `src/pages_owner/repair/submit.vue`
- `src/pages_owner/repair/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：bf727bff-d0f8-4d85-8723-cfa12502510a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "owner_repair_static",
  "source_extraction_id": "8742ccd3462a4edebd58a07c474a1c2d",
  "version": 1,
  "memory_type": "entities"
}
-->
# 构建报错资源路径修复（authentication/publishHouse）
苏住房C 因 `authentication.vue` 等资源路径解析到错误目录导致构建失败，已改为 `ZsImage` 并修正相对路径，构建通过。

## 问题根因
- `authentication.vue` 位于 `pages_owner/house/owner/`，模板用 `./../../static/images/szf/icon-checked.svg` 解析到 `src/static`，但文件实际在 `pages_owner/static/images/szf/`
- Vite 打包找不到文件报错

## 修复要点
- `authentication.vue` 勾选图标 `<img>` 改为 `ZsImage`，与 `addTypeChoose.vue` 一致（项目约定：`ZsImage` + `/images/szf/...`）
- `publishHouse/index.vue`：`warn.png` 在 `src/static/images/`，将 `../static` 改为 `./../static`；`yiwen.png` 仍在 `src/static`，继续用 `../../../static`
- 本地执行 `npm run build:suzhufang` 构建通过

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`authentication.vue`、`addTypeChoose.vue`、`publishHouse/index.vue`
- 来源会话ID：4f2dff10-9967-4330-9845-304bfa354448
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "auth_build_fix",
  "source_extraction_id": "8c968f7c69c54016b77e3b6eff8de193",
  "version": 1,
  "memory_type": "entities"
}
-->
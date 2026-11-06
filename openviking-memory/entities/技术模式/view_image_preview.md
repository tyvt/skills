# 查看模式图片点击预览
苏住房防汛C端移动查询H5(zhi2-mobile-query-h5-c-unlimited)查看模式下的图片已补全 `uni.previewImage` 点击预览交互。

## 改动文件
- `src/pages/project-check/detail/index.vue`：新增 `previewOne(src)` 单图预览，检查签字两处 `<image>` 加 `role="button"` 与 `@click="previewOne(record.signCompanyLeader|signInspector)"`
- `src/components/flood/Ref8443Detail.vue`：8443 对照详情静态现场图改为可点击，用 `previewRefImages(urls, current)` 全屏预览（检查类 2 张、求援类 3 张各一组）
- `src/pages/home/index.vue`：「学习园地 / 新闻公告」带 `image` 的卡片缩略图增加 `@click.stop="previewArticleImage(...)"` 进预览列表

## 提交与分支
- Worktree `苏住房防汛C端-wt-view-img-preview`，分支 `feat/view-image-preview`，合并后 remove + prune
- 提交 `2e8954b` — `feat(ui): 查看模式下图片支持点击预览`，位于 `dev` 顶端并 `git push origin dev`（`5fb2322..2e8954b`）

## 构建验证
- 本机 `npm run build`/`bun run build` 因 `uni` 未在 PATH/node_modules 解析成功，未跑出 `dist`
- 需在装好依赖后执行 `bun run build`（或项目现用构建命令），用 nginx UI 指到 `dist` 验证

## 后续可能
- 整改页只读态下「整改后照片」等 `PhotoPicker` 相关展示可统一成「必可点大图」，待 Lead 指定页面/状态后跟进

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "view_image_preview",
  "source_extraction_id": "4fc2bd602e6e4c9492a5c0c4b8a4f26a",
  "version": 1,
  "memory_type": "entities"
}
-->
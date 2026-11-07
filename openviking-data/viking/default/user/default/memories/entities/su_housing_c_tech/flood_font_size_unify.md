# 防汛表单字段字号统一为14px
苏住房防汛C端 H5 将防汛相关页面表单同类字段字号统一调整为 14px 的技术修复（2026-11-06）。

## 修改内容
- 共用样式 `src/styles/theme.css` 中将以下字段类由 15/16px 改为 14px：`.field-label`/`.upload-label`、`.field-input`/`.field-textarea`、`.field-input > input`、`.field-textarea-wrap .field-textarea.inner`、`.complex-picked-text`、`.seg-choice`、`.choice`/`.choices.levels .choice`
- `.sec-item-label` 原本即为 14px，现与其他字段类完全一致
- 清理此前会话遗留的 `inspection/index.vue` 中 `.date-field` 局部覆盖（已由全局规则统一生效），文件恢复干净

## 未改动部分
- `ref8443.css` 字段类（field-block-label/ref-input 等）本就 14px，无需改动
- project-check 各页 `ov-field-label`/`rf-field-label` 本就 14px
- `.stepper-value` 等数值显示控件保留原字号（非文本字段）

## 验证与归属
- 隔离 worktree `苏住房防汛C端-wt-font14`（分支 `fix/flood-font14`）构建，临时 nginx 8099 站点实测：汛前检查页与求助页的 `.field-label`/`.upload-label`/`.field-input`/`.choice` 计算字号均 14px
- 提交 `9b05d98`，合并 `dev` 为 `4088d72`，已推送 origin/dev（`fb0e9d9..4088d72`），worktree 与分支已删除，主目录 dist 已重建
- 并行任务 `-wt-defaultnav` 工作区与其 nginx 8095 部署未触碰

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "flood_font_size_unify",
  "source_extraction_id": "4bd14e9448594468a19829e74d5881d9",
  "version": 1,
  "memory_type": "entities"
}
-->
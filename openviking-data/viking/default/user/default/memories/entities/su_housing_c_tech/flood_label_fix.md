# 汛中巡检工单详情标签省略号修复
修复苏住房防汛C端 H5 汛中巡检工单详情页左侧标签被单行省略、右侧空白的问题。

## 问题根因
- 详情页每行用 `.detail-row-label` / `.detail-row-value` 结构
- `src/styles/theme.css` 中标签设 `max-width: 62%` + `white-space: nowrap` + `text-overflow: ellipsis`
- 右侧取值 `flex: 1` 占满剩余宽度，长标签（如「路基下沉、坑洞、空鼓、开裂」）被截成「…」且右侧留白

## 修复内容
- `.detail-row-label` 允许换行：`flex: 1 1 auto`、`min-width: 0`、`white-space: normal`、`overflow-wrap: anywhere`，去掉省略号
- `.detail-row-value` 按内容宽度靠右：`flex: 0 0 auto`、`max-width: 45%`、`text-align: right`
- 修改文件：`src/styles/theme.css`

## 交付与验证
- 独立 worktree 开发，合并进 dev，提交 `f006228`，已 `git push origin dev`
- 本地 `bun run build:h5`，产物在 `dist/`
- 8095 站点 root 指向该目录后强刷 `http://127.0.0.1:8095` 打开「汛中巡检工单详情」验证
- 若仍像旧版，nginx UI 将该站点 root 指到 `D:epository\苏住房防汛C端\dist`

## 项目归属
- 所属项目：苏住房防汛C端 H5
- 来源会话：2026-11-06 对话

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "flood_label_fix",
  "source_extraction_id": "26cef00f71d344f0971dfce9ded59dcb",
  "version": 1,
  "memory_type": "entities"
}
-->
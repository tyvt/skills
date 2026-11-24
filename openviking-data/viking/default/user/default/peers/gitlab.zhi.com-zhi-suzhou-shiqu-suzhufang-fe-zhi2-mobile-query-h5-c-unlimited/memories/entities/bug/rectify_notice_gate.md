# 管理APP现场巡检整改通知书缺失（禅道 6938）
禅道 bug 6938 反映管理APP「现场巡检」检查表单第 06 节整体情况缺少「整改通知书」区块，而「物业自查」页面该区块存在。

## 问题与根因
- bug 类型为 codeimprovement，属于管理APP检查表单的前端 UI 缺失。
- 根因：`project-check/form/index.vue:544` 的整改通知书区块被 `v-if="hasRectifyItems"` 门控，仅当存在扣分项时才显示，满分的检查记录整块隐藏，正是报告症状。
- 该门控由提交 `f5cc9ef5` 有意引入；报告中的「期望」截图来自更老构建（附件上限 10MB、签字标签不同），与当前仓库（20MB 上限、相同占位文案）不一致。
- 同目录的 `.vue.js` 文件是 vue-tsc 生成的类型检查产物，非运行时代码，与本次问题无关。

## 修改内容
- 共 4 处定点修改移除 `hasRectifyItems` 门控，改后 grep 确认无残留引用。
- 修改文件：`project-check/form/index.vue`；该文件已有其他任务未提交的改动，实施时必须避免干扰。
- 该门控此前仅在本文件内被引用，评审提出的两个 P1 灰区已核实。

## 验证与进度
- 2026-11-24 方案经审查 PASS 并经用户确认，计划 frontmatter 已写入批准状态。
- 2026-11-24 `npm run build` exit 0，dist 已更新，nginx 直读 dist，部署地址 http://localhost:8095 可访问。
- 实机 agent-browser 验证、截图入会话确认、提交推送、禅道 6938 回写附图与过程产物清理尚未完成，已排程下一跳接手。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "bug",
  "name": "rectify_notice_gate",
  "source_extraction_id": "4709d68cef3c4fbeb3ab8fdf8afb74b0",
  "version": 1,
  "memory_type": "entities"
}
-->
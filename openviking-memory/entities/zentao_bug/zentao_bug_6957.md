# ZenTao Bug 6957 现场图片提示文案
禅道缺陷 6957：zhi2-mobile-query-h5-c 项目检查填写页「现场图片」上传提示文案错误，已修正并完成实机验证、推送与禅道回写。

## Description
- 位置：防台防汛 → 汛前检查 → 检查填写页，`src/pages/project-check/form/index.vue:456`。
- 原缺陷文案为「大小为 png/jpg/jpeg」；修正后为「请使用水印相机拍摄（自动加时间、地点水印），大小不超过 5MB 格式为 png/jpg/jpeg 的文件，最多 5 张；未获取到位置不可拍摄」。

## Fix & Verification
- 唯一生产改动为 index.vue:456 单行文案；改前基线与改后 `npm run build:h5` 均 exit 0。
- 2026-11-25 实机验证：测试站 8162 → 工作台 → 防台防汛 → 检查填写（`pages/project-check/form/index?local=1`），改用 SPA hash 内导航（不 reload）成功渲染修正文案；截图 1256×581 / 27172 bytes，自检通过并获用户确认。
- 上一跳卡点：直接打开 `?local=1` 报「检查单不存在」、reload 丢失 SPA 路由参数；改用 hash 内导航解决。
- 工作区另有 `src/composables/useMainNav.ts` 一处 tracked 改动（删 data tab），不属本任务，已排除未提交。

## Resolution
- 提交 `f02db6e`（仅 index.vue）并推送 origin/dev（分支 dev）。
- 禅道 DBX 回写：status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=lichandan；comment id 99428 内嵌验证图 `{24306.png}`，附件 fileID=24306 已挂到 bug 6957，事务提交并复核落库。
- 过程产物 `$env:TEMP\zentao-6957\` 已清理，无后台任务残留，chain_id=bug6957-hint-wording 链路终止。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6957",
  "source_extraction_id": "3ff1a1d2f7834d5cba1edc704400604c",
  "version": 1,
  "memory_type": "entities"
}
-->
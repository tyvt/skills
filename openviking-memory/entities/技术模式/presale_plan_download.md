# 预售方案增加下载功能
苏州市房地产监测V3 中预售许可方案详情页与面板新增下载功能，遵循先维护再下载的业务流程。

## 实现要点
- 改动文件：`src/views/presale/permit/components/detail.vue`、`src/views/presale/permit/components/PermitPlanPanel.vue`
- `PermitPlanPanel.vue` 两处 `permit-plan-panel` 增加 `@download="handleDownloadPlan"`
- 新增 `handleDownloadPlan()`：从 `form` 解析方案文件路径，用 `fetch` 拉取为 blob 触发浏览器下载（与 entrustSale / leaseContract 模块方式一致）
- 文件名优先取资源原名，回退为「方案名.pdf」；引入 `getFileNameFromAssetUrl` 并新增 `downloadLoading` 字段

## 业务约束
- 下载按钮可用条件：需先在方案维护页「保存」并生成 `planDocSite`（加盖公章上传后）；未生成时按钮置灰，符合「先维护、再下载、盖章、再上传」流程
- 无文件时提示「暂无可下载的预售方案文件」，失败有错误提示

## 验证与归属
- ESLint：`PermitPlanPanel.vue` 无报错；`detail.vue` 仅有一处既有无关报错位于 `#168`，不在改动范围
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：session_56f811a5007e2e242a6e287bb8751256；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_plan_download",
  "source_extraction_id": "6b122800a3944e5ab589de37f06d7ee6",
  "version": 1,
  "memory_type": "entities"
}
-->
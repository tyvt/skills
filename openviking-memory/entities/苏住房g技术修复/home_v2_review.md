# 首页 v2 Vue 代码审查结论（苏住房G）
苏住房G 首页 v2（`index-v2.vue` 及组件/导航/API）代码审查结论与遗留风险项。

## 审查结论
- Options API 与父子事件绑定整体正常
- 需优先处理：`CheckDataNav` 里 `progressPct` 的 `console.log`；`index-v2` 中附件 `window.open`、消息 `msgUrl` 跳转的 URL 校验
- 中等风险项：列表 `key`、字典竞态、图表 `watch`（上一轮已列明细）

## Lint 情况
- `npm run lint` 命令成功退出，但全量 `eslint src/**/*.{vue,js}` 在非本次范围文件上报既有 quotes/semi 问题，输出被 `head -40` 截断，未单独验证 home v2 文件是否零告警
- 合入前门禁建议单独跑：`eslint src/views/home/**/*.{vue,js}`

## 涉及文件与归属
- 文件：`zhi2-web-admin/src/views/home/index-v2.vue`、`KeyDataNav.vue`、`CheckDataNav.vue`、`PublicBenefit.vue` 等
- 所属项目：苏住房G；来源会话：a6d1b5a7-1983-49a4-8898-bb4bc9230465；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "home_v2_review",
  "source_extraction_id": "d8a74d1aab5b4d0b85d30ea4f6cc11b7",
  "version": 1,
  "memory_type": "entities"
}
-->
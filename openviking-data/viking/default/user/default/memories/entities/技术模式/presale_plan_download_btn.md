# 预售方案新增下载按钮及校验
`PermitPlanPanel.vue` 新增「下载」按钮与可点击计算属性，补齐真实下载入口。

## 背景
- 此前预售方案仅「查看」按钮在新标签页打开 PDF，无真实下载入口（提示文案 #58 要求下载）

## 实现要点
- 新增「下载」按钮，testId 为 `presale-permit-download-plan-btn`
- 新增 `canDownloadPlan` 计算属性，仅当 `planDocSite`/`planUrl` 存在时可点击
- 新增 `downloadPlanTestId` prop

## 验证与归属
- 验证证据：extracted source=zcode session=session_56f811a5007e2e242a6e287bb8751256
- 涉及文件：`src/views/presale/permit/components/PermitPlanPanel.vue`
- 来源会话ID：session_56f811a5007e2e242a6e287bb8751256

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_plan_download_btn",
  "source_extraction_id": "b95348e2547a4fca98ef615e2cc3835f",
  "version": 1,
  "memory_type": "entities"
}
-->
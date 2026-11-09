# zhi2-web-admin 子模块与门户部署结构
zhi2-web-admin 是房产综合服务平台门户（父仓库「门户」）的 git 子模块，承载 Vue2 大屏前端代码，开发分支 develop/v2.6.2-portal。

## 构建与部署
- 部署目标为 nginx 8092 站点，root 为 D:/repository/门户/dist
- 在子模块内执行 npm run build，产物直接输出到门户/dist 即部署目录，无需改 nginx 配置或重载
- 构建产物含 AreaStructurePanel-*.js 等组件包
- 根目录 market-monitor.standalone.html 为离线备用产物，非部署对象

## 并行任务隔离
- 主工作区可能存在并行任务的未提交改动（如 TradePanel.vue、BuyerOverviewPanel.vue、vite.config.js、public/version.json），改动时须避免夹带
- 另有独立 worktree：zhi2-web-admin-wt-payfund/（支付类任务）、zhi2-web-admin-wt-noclicklink/
- 迭代惯例：默认在主工作区就地修改、保持改动于 working tree（历史会话形成）；用户亦可选择仅提交自己的改动

## 关键组件位置
- 市场监管大屏「成交面积段结构」面板：src/views/property/marketMonitor/components/AreaStructurePanel.vue
- 详情弹窗 DetailModalC 仍使用 data.js 的 commercialShare/existingShare 字段

## 验证与归属
- 所属项目：门户 / zhi2-web-admin
- 来源会话：2026-11-09 房产大屏改动会话

<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "zhi2_web_admin_submodule",
  "source_extraction_id": "e51fbf59b0f0494b9051d36971db8c23",
  "version": 1,
  "memory_type": "entities"
}
-->
# 防汛C端
苏住房防汛C端移动查询 H5 项目，用于防汛相关 C 端页面。

## 部署
- 开发站点以“防汛C端”登记在部署面板，网关 dev 端口为 8161。
- 测试站点端口为 8162；8161/8162 曾可直接访问但未在部署面板登记。
- 旧记忆中的 8095 端口已过时，不适用于当前防汛 C 端 H5 站点。
- 2026-11-26：8162 已起站，站点配置为 防汛C端-test.conf，root 指向本仓 dist，http://localhost:8162/ 可打开。
- 2026-11-26：8150 已在部署面板登记为 local，但 gen_nginx_sites.ps1 报错导致 nginx local 片段未生成、端口未监听。

## 构建与页面
- 该项目使用 uni-app H5，构建命令为 bun run build:h5。
- 求援工单页位于 src/pages/rescue/index.vue。
- 求援填报页位于 src/pages/rescue-workorder/form.vue。
- 2026-11-26：附件字段已对齐 G 端，检查保存（buildSavePayload）补 inspectionFileUrl/inspectionFileName，求援保存（submitRescueRemote）补 attachUrl。
- 保存检查单接口为 /v2.0/safety/flood/inspection/save，需携带 inspectionFileUrl/inspectionFileName。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "防汛C端",
  "source_extraction_id": "70e3d8531a25404c908fb4daf889d5d2",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->
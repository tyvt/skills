# 惠山物管 V1（无锡惠山住建局物业管理平台）
无锡市惠山住建局物业管理相关的 Web 管理端项目，前端仓库子模块为 zhi1-web-admin，另有 H5 端。

## 项目构成
- 管理端：zhi1-web-admin（Vue 管理后台，含 estate/ownerDecision 等业务模块）
- H5 端：zhi1-web-admin-h5（当前会话所属仓库）
- 测试站使用自签证书，浏览器需开启忽略 HTTPS 错误
- 前端主工作分支：wuxi-huishan-wuguan-main-v1.26
- 本地 nginx 站点 8100（惠山物管V1.conf，root=惠山物管V1/dist，代理惠山测试后端）
- 惠山生产后端 180.101.184.99:8280；同一接口在太仓物管后端仓 `D:\repository\太仓物管后端` dev 分支另有实现

## 工作线与交付流程
- 缺陷来自禅道任务（如 task 2768），附件下载到 `D:\禅道附件\task\<id>\`
- 交接文档目录：`D:\plan\惠山物管V1\`，命名如 session-handoff-20261124-task2768-hop1.md
- 常规完成链路：登录取证路由名 → 出修复计划送审 → 修复 → 构建并截图验证 → 提交推送 + 禅道回写 + 清理临时产物

## 关联
- 长任务采用 chain-YYYYMMDD-huishan-task<id> 分跳接力，成本超 1.00M 执行 P0 硬交接
- 浏览器易被 ST苏住房（localhost:8101）等其他项目页面抢占，需独立会话隔离

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "huishan_property_management",
  "source_extraction_id": "5733bad6d224402c950dcec8010d393f",
  "peer_id": "gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->
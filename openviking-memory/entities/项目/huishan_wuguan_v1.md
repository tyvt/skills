# 惠山物管V1 前端（zhi1-web-admin H5）
无锡惠山物管的 admin H5 前端项目，本地经 nginx 部署在 localhost:8100 做实机验证。

## 项目信息
- GitLab 项目 `gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited`
- 本地部署：自建 nginx 站点指向本地构建产物 dist，访问 `http://localhost:8100/`
- 登录方式：admin 账号 + 图形算术验证码（2026-11-24 为 `8-5=?`，答案 3）

## 任务：预算备案申请表决（2026-11-24 交接）
- 2026-11-24 交接文档给出目标（第 1 节）与未完成项（第 4/9 节）：修复「预算备案申请」详情页点「发起表决」后的 `hasOnlineDecisionPush` 相关 404
- 代码已改完、构建已过（第 3 节要求基线+改后各一次 exit=0，属禁止重跑项）
- 实机验证：从待办「预算备案申请-天奇城A座」进入详情页，点「发起表决」后网络面板无 `hasOnlineDecisionPush` 请求、无 404 → 核心断言通过
- 剩余步骤：弹窗内勾选维修对象行 → 确定 → 断言 radio 可用且无 404 弹窗 → 整页截图；随后证据入会话、提交推送、回写禅道并清理产物

## 维修资金表决路由名缺陷
- 根因：惠山站「维修资金表决」路由 name=`OwnerDecision/owner`，`$route.name.split('/')[1]=='owner'` ≠ 'maintain'，`estate/ownerDecision/` 下 index.vue 与 detail.vue 各 13 处判断走 OWNERS 分支
- 同组件复用路由：vote（业委会选举）、supervisory（监委会）；提交 ae02888b2 曾把注释里的 owner 全量改成 maintain，但惠山菜单仍发 `OwnerDecision/owner`
- 修复：判断同时兼容 `owner` 与 `maintain`，统一用 computed `isMaintainDecision` 引用（index.vue:304 与 detail.vue）
- 验证（2026-11-24）：本地 nginx 8100 站列表 542 条、表头「关联业务名称」「业务类型」、请求 decisionType=MAINTAIN；vote/supervisory 回归通过
- 交付：远端 SHA=9c7dea66e 已推送并更新父仓 gitlink；`src/api/estate/ownerDecision.js` 的未提交删除属他人遗留，未纳入提交

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "huishan_wuguan_v1",
  "source_extraction_id": "586971cf7f9d48d6892a4ef7a4cae89d",
  "version": 2,
  "memory_type": "entities"
}
-->
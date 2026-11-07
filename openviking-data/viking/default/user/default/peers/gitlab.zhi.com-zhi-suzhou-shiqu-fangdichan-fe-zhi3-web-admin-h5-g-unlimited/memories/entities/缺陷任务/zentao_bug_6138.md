# 禅道Bug 6138 价格备案参数维护业务状态显示数字0
房产管理系统价格备案-价格备案参数维护列表页「业务状态」列渲染为数字0而非中文文本。

## 根因
- 页面 zhi2-web-admin/src/views/commercialHousingSales/priceFiling/priceParameters/index.vue
- 「业务状态」列 type:'tag' + options: this.bizStateOptions，但 initDict 用 getDicts('BIZ_STATE')（大写）
- 平台业务状态字典类型是小写 biz_state，大写取不到值；且 tag 列未传 dictUrl，标签字典为空 → 回退渲染原始码值 0
- 与 E-029/E-034 同源（业务状态字典大写问题）

## 修复方案
- 业务状态列补 dictUrl: 'biz_state'
- initDict 改为 getDicts('biz_state')，并对 response.data || [] 兜底
- 参照 bug 6093 已验证模式（recordPriceMngSuzhou/index.vue 同款修复）

## 验证与交付
- eslint 该页退出码 0
- npm run build 通过（buildTime 2026/11/4 11:30:52，gitHash a43c04bd2）
- 产物 dist/assets/priceParameters-CrKKyqdJ.js 含 1 处 dictUrl:"biz_state"
- 子模块 zhi2-web-admin：a7263a4e8 fix → 1141777b6 merge，develop/v3.0.0 → origin/develop/v3.0.0（a43c04bd2..1141777b6）
- 父仓库：025f6a5（含台账 E-035 + 子模块 gitlink），已推送
- 改动经独立 worktree 分支 fix/bug6138-priceparams-bizstate 完成，已合并并删除 worktree/分支，主工作区干净

## 禅道回写与未验证
- bug 6138：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、resolvedDate=2026-11-04 11:31:48、assignedTo=zhunan（原提交人）
- 新增 zt_action id 86784（action=resolved），comment 记录根因/修复/验证证据
- 未验证：客测账号页面目视确认（本环境无客测登录态）
- 台账 docs/frontend/common-errors.md 新增 E-035

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6138",
  "source_extraction_id": "eec3d6743ea54191a459e0f9eb73f7b3",
  "version": 1,
  "memory_type": "entities"
}
-->
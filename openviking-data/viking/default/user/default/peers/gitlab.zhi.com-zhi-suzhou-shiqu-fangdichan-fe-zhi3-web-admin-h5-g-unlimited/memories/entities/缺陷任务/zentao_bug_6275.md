# 禅道Bug 6275 预售转现售申请保存后按钮仍有保存
房产管理系统zhi2-web-admin中【苏州房产】预售转现售申请：保存后按钮仍有保存，由 lichandan 于 2026-11-09 09:48 重新打开，本会话已修复并合并 develop/v3.0.0。

## 基本信息
- 标题：【苏州房产】预售转现售申请：保存后按钮仍有保存
- 当前状态：已修复并合并主分支，禅道回写处理中（由 AI助手 执行）；lichandan 于 2026-11-09 09:48 重开，备注「此问题仍存在」
- 历史误判：前次会话误按「楼幢列表清空」修复（提交 c3d746631 / 17b0a9d，实际属 bug 6298），导致 6275 真实问题未解决

## 根因与定位
- 页面：`zhi2-web-admin/src/views/presale/cashsale/components/CashsaleDetail.vue` 第 789 行覆写 `addCallback`，手工 `$router.push(... { formMode: 'edit' })`，首次保存后页面留在编辑态
- 框架默认（`detailMixins.js:134`）、同模块 `permitExtend/detail.vue`、本页 `editCallback` 均用 `changeFormState('view', id)`
- `OperationBtnGroup`：「保存」在 `formMode !== 'view'` 显示、「编辑」在 `formMode === 'view'` 显示，故保存后残留保存按钮
- 影响现售备案申请与预售转现售申请两个共用页面

## 修复方案
- `addCallback` 改为 `this.changeFormState('view', newId)`，删除手工拼路径
- `docs/frontend/common-errors.md` 新增 E-043 台账条目（含误修历史说明）

## 验证与交付
- 改动文件 eslint → 0 error；全量 lint 为存量红基线（5001 errors / 7511 warnings，均属其他文件）
- `npm run build` 成功（buildTime 2026/11/9 11:08:52），`public/version.json` 生成物已回退不入库
- nginx 8098 镜像部署新 dist：`/` 返回 200、产物 `CashsaleDetail-3eQ4tiRc.js` 含 `addCallback(t){...this.changeFormState("view",e)}`，被 8 个清单 chunk 引用
- 未验证：客测环境真实账号点测保存流程（本机无客测登录态、不启 dev server）
- 子模块 worktree `苏州市房地产监测V3-wt-bug-6275`，分支 `fix/bug-6275-cashsale-save-view`；提交 `f4add75b5` 推送，合并提交 `22fa66c69` 推送 origin/develop/v3.0.0
- 父仓库 gitlink 提交 `3f8e0cb` 推送 origin/develop/v3.0.0（fast-forward）；合并后从合并态重新构建部署
- 会话期间主分支被并行任务推进（develop/v3.0.0 8037426 → 19ad84d，gitlink → bf8799a0f）；`cdd058231` 为 `bf8799a0f` 祖先且目标文件未变，修复可干净合并


<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6275",
  "source_extraction_id": "aabf50b3baa74aa78110a3efab487cd6",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->
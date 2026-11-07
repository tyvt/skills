# 禅道Bug 6298 预售许可申请维护返回清空楼幢列表
房产管理系统zhi2-web-admin中预售许可申请新增态，点「预售方案→维护」进入方案页返回后，预售楼幢列表被清空（共0条）。

## 根因与定位
- 页面：预售许可申请 presale/permit/components/detail.vue
- 此前 bug 6275 修复靠 tryRestorePlanNavDraft 从 sessionStorage 草稿恢复楼幢列表，恢复后立即删草稿并 clearPlanNavRestoreQuery 清理 URL 标记
- AppMain.vue 用 `<router-view :key="$route.fullPath">`，清理标记的 $router.replace 改变 fullPath 触发申请页整页重建
- 新增态不重新拉详情接口且草稿已删，重建实例无从恢复 → 列表清空

## 修复方案
- detail.vue 的 tryRestorePlanNavDraft 中：仅当本次不会再因清理标记而重建时才删除草稿；若仍有待清理标记则保留草稿，交给重建实例再消费一次
- 改动最小，保留原有恢复逻辑

## 验证与交付
- 独立 worktree szfc-v3-sub-wt-bug6298（分支 fix/zentao-6298-permit-building-restore）开发，合并回 develop/v3.0.0 后删除
- ESLint 单文件通过；npm run build 成功（dist 于 15:28 重新产出）；模板编译与脚本语法检查通过
- 子模块 zhi2-web-admin 合并提交 de5cc464d，已推送 origin/develop/v3.0.0
- 父仓库 gitlink 提交 8589417，已推送 origin/develop/v3.0.0
- 禅道 DBX 事务回写：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=lichandan，附根因+修复+验证说明（action 88490）

## 未验证项
- 未在浏览器实机登录点击复测（项目约定不启动本地 dev server）
- 已通过构建+逻辑/截图核对确认根因与修复点

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6298",
  "source_extraction_id": "a4dcc800d8794b1aa8b6c4f61565c6b7",
  "version": 1,
  "memory_type": "entities"
}
-->

# 禅道Bug 5983 Navbar返回首页
房产管理系统 zhi2-web-admin 中 Navbar「返回首页」按钮落点错误（应回门户按登录态分流，曾误改成站内管理端首页）的缺陷任务，最终于 2026-11-09 按用户澄清口径修复。

## 需求与根因
- 用户诉求：返回首页应整页回门户 9001，由门户按自身登录态落「对内首页 /index」或「对外首页 /UnifiedLogin」；不应留在管理端、也不应被登出
- 2026-11-02 提交 6cc5eba2c 误改成站内 $router.push('/index')，理解错误
- 2026-11-03 提交 01861fe87 恢复跳门户但登录仍被带进 ?redirect= 登录流程；2026-11-09 10:18 被 lichandan 以「此问题仍存在」重新激活
- 同日一度按「留在管理端」修复并回写禅道（11:25:06），用户澄清后作废、重新激活

## 最终修复方案
- 9002 Navbar.vue：goHome() 恢复读 sys.portal.index.url 并整页跳门户；配置缺失兜底回管理端落地页，NavigationDuplicated 时 reload 给可见反馈（真实落地页 /todo，不能只判断 hash 含 /index）
- 门户 src/router/index.js handleUnauthenticatedRoutes：对 /index 与 / 直接落 /UnifiedLogin 不拼 ?redirect=；其它受保护路由仍保留 redirect 以免深链登录丢失目标页
- 注册单页「原路返回门户」（禅道 5995，portalBack.js）未改动；5983 与 5995 是两套约定不可混用

## 提交与验证
- 隔离 worktree 苏州市房地产监测V3-wt-bug-5983-v2（9002，分支 fix/bug-5983-portal-home-v2）、门户-wt-bug-5983（门户）已删除并 git worktree prune
- 9002 提交 add460515 → 合并 develop/v3.0.0 父仓 0967c67；门户提交 b9b43d35a → develop/v2.6.2-portal 736b515，均已推送
- eslint：9002 Navbar.vue 0 错误；门户 router 11 处报错与基线一致（仅行号偏移），无新增
- npm run build 成功；8098（9002）version.json 11:55:00/add460515，8092（门户）11:56:43/b9b43d35a，HTTP 与磁盘一致
- 未验证：完整点击级浏览器验证需 9001/9002 真实登录态，本地不具备
- 6324/6326/6322/6275 及门户 zhi2-web-admin-wt-payfund/ 未触碰；public/version.json 已还原，无残留后台任务

## 禅道状态
- 重新激活补备注 action 89219；验证通过后回写：status=resolved、resolution=fixed、resolvedBy=tiany、resolvedDate=2026-11-09 11:59:32、assignedTo=lichandan
- action 89253 含最终口径、根因、两端修复与验证/提交证据；用无事务连接复核落库


<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_5983",
  "source_extraction_id": "93def48a3cb44df5b0c5c50f2a296124",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 4,
  "memory_type": "entities"
}
-->
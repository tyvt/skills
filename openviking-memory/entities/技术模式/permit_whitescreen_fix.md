# 预售许可申请维护白屏与页签丢失修复
苏州市房地产监测V3 预售许可申请页点「预售方案-维护」出现紫色加载页+约1秒白屏+页签10个剩1个+跳不到维护页（禅道 bug 6285）。

## 问题根因
- 录屏(21802.gif)逐帧核对：上一轮「顶部导航图标变方框」为误判，方框只是唯一页签关闭按钮□→×
- version-check.js 将 checkUpdate() 挂在 history.pushState/replaceState 与 popstate/hashchange 上，任何路由跳转都拉 version.json 比对，发版后 buildTime 变化即 forceRefresh()→location.reload()，「点菜单」本身成了发版检测点
- main.js 传的 interval 未被 VersionChecker 实现，页面不主动检测版本，仅跳转瞬间被强刷；刷新发生在 pushHash 之前，URL 仍是申请页
- importWithChunkRetry 返回 never-resolve Promise 挂死导航
- TagsView 在动态路由 addRoutes 之前用 $router.resolve().matched 把 10 个页签全过滤掉
- 用户口径：「点击菜单不应该刷新；版本更新导致的刷新才合理」

## 修复历程
- 第一次（不完整）：autoRefresh.js 新增 reloadWithOverlay() 刷新前显示全屏遮罩并写页签到 sessionStorage；version-check.js 与 permission.js chunk 兜底改走该函数；TagsView 刷新后校验路由再还原页签。子模块 d2cbc1742→合并 a2862e39c（develop/v3.0.0），父仓库 zhi3-web-admin-h5-g-unlimited 提交 7a7fa89。缺陷：仅加遮罩与页签快照、仍保留整页重载并中断跳转；2026-11-09 被激活「此现象仍存在」
- 第二次（正确）：版本检测改独立 30s 轮询+visibilitychange 移除跳转挂钩；真检测到新版本才自动刷新并延后到跳转结束；chunk 404 兜底带跳转目标刷新后落原目标页；CHUNK_RELOAD_KEY 改 10s 窗口；页签快照 meta 仅留可序列化字段；还原延到 router.onReady 且不过滤有效页签。子模块 d650ca177→合并 d806d639c（develop/v3.0.0），父仓库 0144a81，8098 已部署；eslint 0 新增告警、build 通过、Playwright 冒烟 3/3 PASS

## 可复用判断
- 「整页白屏 + 页签清空 + URL 未变」先查 location.reload()（版本校验/chunk 兜底）而非业务代码
- 只装饰刷新不等于修好，必须切断「导航触发刷新」这条因果链
- 「点某按钮才白屏/丢页签」先查版本检测是否挂在 pushState 上，而非先改业务页面
- zhi3 的 TagsView 不持久化，整页刷新必丢页签

## 验证与归属
- 涉及文件：zhi2-web-admin/src/utils/version-check.js、src/store/modules/permission.js、src/layout/components/TagsView/index.vue、src/utils/autoRefresh.js
- 所属项目：苏州市房地产监测V3；禅道 bug：6285

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_whitescreen_fix",
  "source_extraction_id": "693ce07a83204387b48531dd70132c4d",
  "version": 4,
  "memory_type": "entities"
}
-->
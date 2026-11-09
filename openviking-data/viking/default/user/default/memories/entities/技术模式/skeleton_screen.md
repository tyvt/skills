# 门户首页二级页骨架屏实现
门户首页二级页在导航过渡（首页→二级页 open()、二级页内 navigate()）时展示统一骨架屏组件；直接刷新二级页不触发全页骨架屏（数据 mock/同步，仅数据区异步加载时显示局部骨架）。

## 组件构成
- PortalSkeleton.vue：按二级页真实版式输出占位结构，skeletonVariant 共 17 种取值（agencies、rental、agency-credit、profile-broker、broker-list、profile-agency、profile-store、broker-sub-list、rental-contract、rental-list 等），均映射至组件内 PARTS 键，覆盖楼盘/房屋/许可/公告/机构/人员/租赁列表、公告正文、可售房源与即时成交汇总、合同与租赁合同查询、楼幢列表、楼盘表 54 格销控网格、经纪机构/经纪人/分支机构列表、机构/经纪人/分支机构三类基本信息；位于 zhi2-web-admin/src/views/home/publicPortal
- PortalDialogHost.vue：二级页导航过渡时以 `<portal-skeleton v-if="pageLoading" :variant="skeletonVariant" />` 展示骨架屏，最短展示 600ms（复用 @/utils/loading.js 的 waitForMinDuration），用 loadingToken 丢弃被后一次切换覆盖的等待；叠加详情弹窗不触发骨架屏
- @/utils/loading.js：提供 waitForMinDuration 最小时长与 token 丢弃机制
- portalRoutes.js：二级页路由配置文件

## 历史与状态
- 组件由提交 9cb987bd0（feat(portal): new components and loading experience）引入 PortalDialogHost，后被 descope 移除，PortalSkeleton 成为孤儿组件
- 2026-11-09 在 worktree fix/portal-secondary-skeleton（基于 develop/v2.6.2-portal）重新将 PortalSkeleton 接入 PortalDialogHost，仅作用于导航过渡，npm run build 通过（exit 0）；提交 fa85ff790 后推送并快进合并入 develop/v2.6.2-portal，worktree 已移除，部署 dist 为含改动的生产构建

## 验证与归属
- 验收测试：tests/e2e/public-portal-skeleton.spec.ts 规定直接 load（goto）时禁止全页骨架屏，仅断言过渡场景
- 验证证据：extracted source=zcode project=门户
- 涉及文件：PortalSkeleton.vue、PortalDialogHost.vue、@/utils/loading.js、portalRoutes.js（均在 zhi2-web-admin/src/views/home/publicPortal 下）
- 所属项目：门户；来源会话ID：session_8fedec701ebfbbfa2d3c0a93a4c98a27 及 2026-11-09 骨架屏接线会话；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "skeleton_screen",
  "source_extraction_id": "8595218b1fe14e71800efda5ddaff666",
  "version": 3,
  "memory_type": "entities"
}
-->
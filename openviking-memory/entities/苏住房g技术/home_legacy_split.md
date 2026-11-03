# B端首页恢复旧工作台分流
苏住房G 后台首页通过 index-wrapper.vue 按 terminalType 分流，B 端渲染旧版 index-legacy.vue，其余走 index-v2.vue，cwzxt 走 index-bak.vue。

## 问题背景
- 新版 index-v2 上线后 B 端误看新版，需求为旧版图1；入口未分流，terminalType 首屏常未就绪（来自登录后用户信息）。
- 首帧 Vuex terminalType 为 null，isBTerminalUser 把 null 判非 B，B 端先挂载 index-v2，GetInfo 回写后再切 legacy：两子首页 created 各跑（loadAll、toggleSideBar），闪屏、重复请求、错误首页，类型不写入则永久停 v2。
- 与已知「terminalType==null 被当成 B 端」判定方向反不同，本条是时序未就绪。

## 修复方案
- index-wrapper.vue 作分流壳，utils/terminalUser.js 提供判断；旧工作台另存 index-legacy.vue 不叠加条件。
- 渲染前加 terminalType 就绪门闩（对齐 statisticsMapDetail/index.vue 的 terminalTypeReady）：先判 != null 再分叉，此前占位/骨架；v-if 加 :key 重建子树，非当前分支改 () => import() 异步组件。
- useFinanceHome 的 computed 只读 localStorage 无响应源，需改读 Vuex 或写入处重进路由；同步维护 tests/e2e/home-v2.spec.mjs 的 B 端旧工作台断言。

## 提交与经验
- 子模块提交 47d6ce19a「fix(home): B 端恢复完整旧工作台首页」；父仓提交 1a408c2 更新指针；env/.env 不提交，推送前 pull --rebase。
- 来源会话 e089d931（基线 db4f82c）及补充 0ed5cf4a（审查时序缺陷）；验证 useBLegacyHome 在 null 为 false，B 端先 mount v2 再切 legacy 两 created 各跑。
- 经验：业务单据页可页面内分流，但首页应壳页分流加旧版留档，勿在新版塞 if；涉及 index-wrapper.vue、index-legacy.vue、terminalUser.js、store/modules/user.js、statisticsMapDetail/index.vue。

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "home_legacy_split",
  "source_extraction_id": "7d100a0bc1f64c549abc1801c01d6406",
  "version": 3,
  "memory_type": "entities"
}
-->
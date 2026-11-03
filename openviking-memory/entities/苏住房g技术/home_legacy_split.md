# B端首页恢复旧工作台分流
苏住房G 后台首页通过 index-wrapper.vue 按 terminalType 分流，B 端渲染旧版 index-legacy.vue，其余走新版 index-v2.vue。

## 问题背景
- 新版 index-v2.vue 上线后，B 端用户错误看到新版工作台，需求应是旧版图1样式
- 入口未做端别分流，B 端直接落进新版；terminalType 来自登录后用户信息，首屏常未就绪

## 修复方案
- index-wrapper.vue 保留为分流壳，由 utils/terminalUser.js 提供 terminalType 判断 B 端
- 旧工作台原样另存为 index-legacy.vue，不在 index.vue 上叠加条件
- 渲染前加 terminalType 就绪门闩，未就绪不渲染分支，防止闪跳与误判
- 同步维护 tests/e2e/home-v2.spec.mjs 的 B 端命中旧工作台断言

## 提交与验证
- 子模块 zhi2-web-admin 提交 47d6ce19a「fix(home): B 端恢复完整旧工作台首页」
- 父仓库提交 1a408c2 仅更新子模块指针；env/.env 等 WIP 不提交，推送前 pull --rebase
- 来源会话 e089d931-94c4-4e19-8df7-c93db12d1e61；基线 db4f82c；所属项目苏住房G

## 经验沉淀
- 业务单据页可按 terminalType 页面内分流不拆两套，但首页应壳页分流加旧版留档，勿在新版塞满 if

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "home_legacy_split",
  "source_extraction_id": "0486331f426744389b891531c5cf81c6",
  "version": 1,
  "memory_type": "entities"
}
-->
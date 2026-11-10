# 禅道Bug 6436 合同换房列表业务状态显示原始码值
预售资金监管 → 合同换房列表页「业务状态」列显示原始数字"2"而非字典中文标签。

## 现象与定位
- 模块：预售资金监管 → 合同换房（exchangeContract）列表页 `zhi2-web-admin/src/views/commercialHousingSales/presale/exchangeContract/index.vue`
- 现象：业务状态列 `prop: 'bizState'` 显示原始码值 `2`，未回显中文标签
- 对比：同模块已知正确页面 `contractRevoke/index.vue`、`versionManagement/index.vue`、`contractMainInfo/index.vue` 的「业务状态」列均用 `type: 'tag' + dictUrl: 'BIZ_STATE'`

## 根因
- 该列原配置 `type: 'tag', options: this.bizStateOptions`（异步 `getDicts('BIZ_STATE')` 结果渲染）
- 按 AGENTS.md 第7条：`zs-table-column` 的字典/tag 列须传 `dictUrl`——`displayColumns` 仅在列签名变化时重算，异步字典（options 绑定）不会自动回填，故显示原始码值

## 修复方案与验证
- 将列配置 `options: this.bizStateOptions` 改为 `dictUrl: 'BIZ_STATE'`，保留 `type: 'tag'` 样式
- 保留 `initDict()`（查询表单 select 仍依赖 `bizStateOptions` 本地选项）
- 在子模块主工作区直接修改，未创建独立 worktree
- `npx eslint <file>` → 0 error/warning（exit 0）
- `npm run build` → 通过（exit 0，仅 Sass `@import` 存量弃用告警，与本次无关）
- 未启动本地 dev server 目视验证；字典回显逻辑与同模块列表一致，已通过 lint + 构建间接验证

## 提交推送与禅道回写（2026-11-10 用户授权后执行）
- 子模块 `zhi2-web-admin` 提交 `7ea6073b1` 推送 origin/develop/v3.0.0（先于父仓库）
- 父仓库 gitlink 提交 `6559142` 推送 origin/develop/v3.0.0（gitlink `d98c4a801..7ea6073b1` → `7dd856c..6559142`）
- 还原构建污染的 `public/version.json` 等构建产物，仅提交 `index.vue`；未夹带 `env/.env` 及临时文件（`.tmp-bug*`、bug6417 截图等）
- 禅道回写（DBX 事务，connection ID `4027e274-2f63-49e6-8a8d-5f25eb1e6c5e`）：`zt_bug` 置 `resolved/fixed`（解决人 tiany，指派回 zhunan），新增 `zt_action` 90296（extra=fixed），事务内与提交后双校验通过

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6436",
  "source_extraction_id": "13400c900680448babf9b2126cfe630a",
  "version": 1,
  "memory_type": "entities"
}
-->
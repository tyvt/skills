# 禅道任务 2788
禅道任务 2788 要求把苏住房G「其他租赁合同」列表页的「新增」按钮改为独立权限字符控制，原字符与经营用房租赁合同共用。

## 背景与根因
- 用户提出「换一个字符，目前和其他合同共用字符」：resourcesLeaseContractFiling（其他租赁合同）与 assetsLeaseContractFiling（经营用房租赁合同）的 businessName 都是 `pubRevenueContract`，新增按钮权限码同为 benefit:pubRevenueContract:add，无法单独控制显隐。
- 用户确认新权限字符为 benefit:otherRevenueContract:add；权限码须与后端菜单配置一致。

## 方案与实施
- permsMixins.js:7 注释：businessName 与接口强相关，隔离权限应覆盖 permsPrefix；本次改用 `extraPerms` 扩展点（仅 permsMixins.js:29 引用），只覆盖新增按钮。
- 改动落点：resourcesLeaseContractFiling/index.vue:80 的 computed 新增 `extraPerms`，把新增按钮权限码覆盖为 benefit:otherRevenueContract:add；同页其他按钮与接口不动。
- 写计划前已 grep 该页面（仅 data()/computed 两处、无 extraPerms 重复键）；计划自动审核 78/100、无 P0 阻断，用户确认后置 status=approved、human_confirmed=true。
- 开工快照：父仓与子模块均在分支 develop/v2.6.2-suzhufang（非 detached），已有未提交改动（父仓 dirty=4、子模块 dirty=3）需保留；子模块脏文件集中在 flood/screen，与本任务无关。

## 验证与状态
- ESLint 通过（exit 0）；npm test 构建通过（exit 0，51 秒），dist 生成于父仓根 `D:\repository\苏住房G\dist`。
- 已在本地 nginx 部署验证站点（苏住房G local 环境，端口 8165，返回 200），但登录验证码接口 /api/v2.0/code 未被代理导致卡住，尚未截图取证。
- 2026-11-24 会话超 1.00M 触发 P0 硬交接，已写 9 节交接文档并安排 hop2（17:43 启动）续办：修 nginx 代理 → 登录（账号密码需用户提供）→ 截图 → 用户确认 → 提交 → 禅道回写。

<!-- MEMORY_FIELDS
{
  "category": "zentao_task",
  "name": "zentao_task_2788",
  "source_extraction_id": "1a0e7b46db974b45bfcadd1f5fbc4962",
  "version": 1,
  "memory_type": "entities"
}
-->
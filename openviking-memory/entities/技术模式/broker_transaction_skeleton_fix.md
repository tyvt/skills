# 门户经纪机构页交易记录骨架屏修复
修复门户经纪人/机构详情页交易记录骨架屏持续转动不揭开的问题，通过最长等待兜底与分支复位解决。

## 问题根因
- BrokerPages.vue 交易记录加载时，部分早退分支未复位 `transactionLoading`
- `ownerId` 缺失导致请求挂起，骨架屏一直转不揭开

## 修复要点
- 提交 e2d7219dd 引入 `TRANSACTION_SKELETON_MAX_WAIT=3000`（毫秒），骨架屏最多转 3s 即揭开
- 所有早退分支均复位 `transactionLoading`
- 增加 `ownerId`/`personnelId`/`companyId` 兜底（占位 `"0"` 时退化为真实主键），避免请求缺失参数挂起
- 编译后 `I=3e3` 的 `setTimeout` 复位 `transactionLoading` 即为此 fix

## 验证与状态
- 本地 zhi2-web-admin 工作区与 dist 已含改动，并已推送到 origin/develop/v2.6.2-portal（tip c20b0443c 含该 fix）
- 本地 8092 部署（root D:/repository/门户/dist）BrokerPages chunk 含 fix，实测无问题
- 远程测试服务器 http://58.210.252.230:9001/ 的 version.json gitHash=166c325 为 fix 前提交，其 BrokerPages js 仅 9489 字节且不含 I=3e3（本地同名 16601 字节含 fix），即远程为旧构建未重建
- 该服务器走 GitLab 分支构建（gitBranch=HEAD），本沙箱无法 SSH（22端口不通），需从 develop/v2.6.2-portal 重新构建部署方可生效
- 2026-11-09 用户选择自行上传 zip 替换部署；助手已将含修复的门户 dist 打包为 `门户-dist-fix-e2d7219dd.zip`（约 61.1MB，gitHash 60808eac1，含修复后 `BrokerPages-CvrSDNy4.js`），解压覆盖 9001 站点静态根后强制刷新即可
- 本地 dist 被并行任务多次重建（chunk 由 `BrokerPages-COZJ05qM.js` 变为 `BrokerPages-CvrSDNy4.js`），打包时取当下内部一致且含修复的快照

## 涉及文件
- zhi2-web-admin/src/views/home/publicPortal/pages/BrokerPages.vue
- 所属项目：门户；来源：2026-11-09 修复状态核实会话；代码基线：e2d7219dd

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "broker_transaction_skeleton_fix",
  "source_extraction_id": "b024349611374b40b3bd932f3b84c932",
  "version": 2,
  "memory_type": "entities"
}
-->
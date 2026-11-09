# 淮安存量房前端
淮安存量房（cunliangfang）前端项目，使用 zhi2-web-admin-h5-g-unlimited 父仓子模块，任务 2336 涉及修改密码加密。

## Task Context
- 禅道任务 2336：「【淮安存量房】【前端】修改密码：密码需要加密」，要求 `/v2.0/system/profile/updatePwd` 参数全部加密，参照 `/v2.0/security/auth/login` 加密方式
- 父任务 1907 引用 bug 4947 获取完整细节，提及传输与存储均需加密
- bug 4947 曾因「确认密码需加密」+「加密后旧密码报错」复现，于 10-22 关闭，因「实现提起了任务」，任务 2336 即该后续
- 任务 2336 已于 2026-11-09 完成：crypto.js 改为通用逐字段加密并保留 `confirmPassword` 字段名；子模块分支 `huaian-all-cunliangfang-dev-v2.2` 提交 `8f0547242` 合并远程 CI 修复 `b1d53426c` 后推进至 `da61486cb`，父仓 `淮安存量房` 提交 `c2c6d22`（gitlink→`da61486cb`），均推送远端
- 禅道回写：任务 2336 置 `done`，`finishedBy=tiany`、`finishedDate=2026-11-09 11:52:28`，新增 `finished` 动作记录 `zt_action` id 89238（含 705 字根因/修复/验证/提交号备注）；推送时远端有 task 2176 与 CI 修复两个新提交，用正常 merge 整合未强推
- 父任务 1907（后端传输/存储加解密）仍为 `doing`，本次仅闭环前端，前后端实际改密联调待测试验收

## Code Facts
- 子模块 `src/utils/crypto.js` 的 `buildUpdatePwdBody(params)` 通用逐字段加密（用登录同款 `encrypt()` AES-ECB），原样保留后端字段名；修复前曾硬编码 `UPDATE_PWD_FIELD_SCHEME` 把确认密码改名为 `rePwd`（全仓仅 10-19 一次提交出现，真实请求体用 `confirmPassword`）
- 子模块已有 AES 加密提交；`assets/` 覆盖层仅含图片，故子模块代码为权威
- `VITE_APP_BASE_API=/api/v2.0` 表明 `/v2.0` 仅为网关基础路径，非新 API 版本
- 旧错误请求体为 `{oldPwd, newPwd, rePwd}`（确认密码被改名且明文），导致「旧密码错误」；修复后请求体为 `{oldPwd:密文, newPwd:密文, confirmPassword:密文}`，三处改密入口（ChangePasswordDialog、ResetPwdDialog、profile/resetPwd.vue）无需改动
- AES 验证：`ZS0001Aa!` → `E4iA5HS/gAMhrxJtY5LC+w==`，与禅道 bug 截图密文一致；任务 2336 于 2026-11-09 完成（子模块 `da61486cb`、父仓 `c2c6d22` gitlink→`da61486cb`）
- `npm run build` 退出码 1 为既有现象（rollup-plugin-unused 报告 4 个未引用文件），dist 完整生成；远端提交 `b1d53426c` 的 vite.config.js unused-files CI 修复已合入，合并后构建转绿，与本次改动无关

## Relations
- 父仓为 zhi2-web-admin-h5-g-unlimited（同无锡市区G 父仓）
- Lead 为董浩然，负责任务分配与备注（如 2026-11-09 任务 2336 备注）
- 与苏住房G、门户 zhi2-web-admin 同属淮安/苏州房产前端体系

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "huaian_existing_housing_fe",
  "source_extraction_id": "fdf97a501c9d467b8358c7e92da20271",
  "version": 3,
  "memory_type": "entities"
}
-->
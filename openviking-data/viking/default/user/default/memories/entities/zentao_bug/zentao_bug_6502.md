# 禅道 Bug 6502
苏住房防汛C端移动查询H5「手持端直接打开地址显示登录状态」问题；2026-11-12 完成根因定位与代码修复，禅道回写为已解决（resolvedBy=tiany，assignedTo=lichandan）。

## Description
- 问题标题：【苏住房】手持端：直接打开地址，系统是登录状态
- 现象：移动端直接打开深链地址时显示已登录态，实际不应为登录态
- 禅道链接：http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6502
- 附 2 张截图附件确认 UI 症状

## 根因分析（2026-11-12）
- App.vue 的 onLaunch 逻辑只要存在 token 就 reLaunch 到首页，盲目信任持久化 token，无有效性校验
- 两套 token 体系：store/user.ts 用 `token`（persist:true）；request.ts 用 `flood-token-v1`；登录响应缓存本地（flood-login-user-v1），token 持久化 localStorage，全程无校验
- 测试环境 VITE_FLOOD_MOCK=false，demo token 自动注入非根因；真正根因为持久化 token（flood-token-v1 + user-store persist:true）无校验
- 设计本意是「本地已有 token 直接进入首页」（持久登录），bug 本质是缺乏 token 校验
- 登录接口为 /v2.0/security/auth/login（管理端 auth）；校验须用同上下文端点，不能用 C 端 ctAuth/profile

## 修复（2026-11-12）
- 进入首页前新增令牌校验 isTokenAlive()：调用 /v2.0/security/auth/getInfo
- 校验通过 → 进入首页（保留持久登录意图）；校验失败（HTTP 401/403）→ 清除本地令牌与登录用户信息（clearToken/clearLoginUser），停在登录页（pages.json 首个页面）
- 演示/本地 mock 模式（isDemoDataMode）跳过校验
- 网络异常等不确定情况返回「有效」，不贸然清空有效会话
- 仅修改 src/App.vue 一个文件，提交 1446391 推送 origin/dev

## 当前状态
- 禅道 6502：status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=lichandan，已提交事务并复核通过
- 提交仅含 src/App.vue（.tmp-bug6418/、.tmp-bug6456/、苏住房-项目跟进.xlsx 均未纳入）
- 类型检查 vue-tsc --noEmit 对 src/App.vue 无新增报错；前端构建 uni build 未执行（环境受限）
- 验证建议：用已过期/失效令牌直接打开地址，应停在登录页而非自动进入首页

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6502",
  "source_extraction_id": "bde1ff9cb5eb42e0951b59b59c02e0b4",
  "version": 4,
  "memory_type": "entities"
}
-->
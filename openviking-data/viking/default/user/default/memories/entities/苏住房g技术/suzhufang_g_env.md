# 苏住房G 测试环境与登录
苏住房G（zhi2-web-admin）前端由本机 nginx 8101 提供服务，浏览器实机验证需要先走带图形验证码的接口登录、再注入 token。

## 部署与访问
- 验证地址 `http://localhost:8101`，由 nginx 配置 `苏住房G.conf` 服务 dist 根目录 `D:/repository/苏住房G/dist`。
- 部署登记表里没有苏住房条目，只能通过 nginx 配置与监听端口定位站点（nginx PID 24288 监听多个端口）。
- 项目根目录没有 `.env`；测试环境取值来自 nginx 配置引用的 `.env.test` 类示例文件。
- 8101 反代指向 dev 网关 `suzhou.dev.zhi.com`；测试库数据（如防汛大屏险情速报事件）在本地看不到，实机验证需临时把代理切到测试网关（备份→改→reload→验证→恢复）。

## 登录与鉴权
- 测试登录用户 `zsbase`，密码存放在 `%TEMP%\e2e_pass.txt`，辅助脚本 `e2e-login-keys.cjs` 描述登录做法。
- 8101 网关 `/v2.0/code` 返回 base64 验证码图片（在 `data`）与顶层 `uuid`，需 OCR；旧的 8080 网关直接返回验证码文本。
- 8101 提交登录后会跳到测试网关自身的登录页 `https://180.101.184.99:8280/login`：账号与验证码已带过去但密码为空，需再填一次密码和本页验证码；网关登录接口为 `POST /api/v2.0/security/auth/userLogin`。
- 登录相关 el-message 提示约 3 秒自动消失（4 秒后再查已查不到），应一次异步 eval 完成「填码→点登录→等约 1.5s→抓错误提示」。
- 验证码是算式题，2026-11-24 实机出现「3+4=7」「9*2=18」「8+7=15」；整页大图 OCR 不稳，可单独取验证码小图（如 `window.__cap2`）解码放大后再识别。
- 登录成功返回 `data.accessToken`；应用把它存在 `sessionStorage['Admin-Token']`，注入浏览器即可跳过手工登录进后台。
- 接口调用需带请求头 `Authorization: Bearer <token>`（`request.js:189`）。

## 业务路由
- 隐患处置列表路由 `/safety/electrocar/hazard`，详情路由 `/safety/electrocar/hazard/:id`。
- 路由由后端驱动（SYS_MENU）动态注入，只有 `router.getRoutes()` 能枚举全部路由。

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "suzhufang_g_env",
  "source_extraction_id": "f30aaf58dbd94f4bb90809f2ddbfb567",
  "version": 4,
  "memory_type": "entities"
}
-->
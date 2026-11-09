# ZenTao Bug 6354
禅道 Bug 6354：靖江商品房登录页三个注册按钮点击不跳转，2026-11-09 修复并 resolved。

## 描述与归属
- 标题：[靖江商品房] 登录页下方的三个注册按钮点击不会跳转到对应的注册页面
- 产品 product=72、项目 project=223、执行 execution=224
- openedBy=zhoudongdong、assignedTo=tiany

## 根因
- 登录页按钮走 window.open(MAINIP + 路由)；子应用 src/App.vue created() 无 token 即跳回 login.html
- 注册页为对外自助入口不应要求登录，新窗口弹回登录页表现为「点了没反应」
- 仅「开发企业注册」对应已有 /register 页；另两按钮目标路由不存在

## 修复
- 范围（用户选定）：仅打通开发企业注册，经纪/经纪人按钮暂留
- App.vue created 放行 /register 等注册路由，无 token 不再强跳；以 hash 为权威解析（created 阶段 $route.path 可能未就绪）
- 非注册页登录校验不变；仅改 src/App.vue 一个文件

## 验证与回写
- 本地 nginx 8118 部署后无痕截图：#/register 无 token 渲染备案表单；#/home 无 token 仍跳登录（校验未破坏）
- 分支 taizhou-jingjiang-shangpinfang-dev-v1.0.0 提交 eff2b994，已推送 origin
- 禅道 DBX 回写 status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、resolvedDate=2026-11-09 16:15:27
- 新增 zt_action id=89485（含根因/修复/验证 1496 字备注）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-taizhou-jingjiang-shangpinfang-fe-zhi0-web-admin-h5-g-unlimited",
  "category": "禅道缺陷",
  "name": "zentao_bug_6354",
  "source_extraction_id": "7c519f5a9aad44dd937f91c65e673c68",
  "version": 1,
  "memory_type": "entities"
}
-->
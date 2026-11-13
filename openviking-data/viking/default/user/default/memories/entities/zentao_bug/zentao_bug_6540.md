# 禅道 Bug 6540
苏住房G（zhi2-web-admin）物业自查记录详情页图片破图，2026-11-12 完成根因定位与代码修复，禅道回写为已解决（resolved by tiany）。

## Description
- 问题标题：【苏住房G】物业自查记录图片破图
- 现象：详情页图片破图，部署目录被误判为 /login/zhi2-dev/...
- 证据：用户手拼附件地址 http://unlimited.g.h5.admin.web.v2.suzhufang.shiqu.suzhou.test.zhi.com/zhi2-dev/2026/9/n/6/b76ee6d0-8a0f-4e33-bc16-a358232b640f.png 可访问，证明文件存在

## 根因分析
- 401 跳转 window.location.href='/login' 后登录成功执行 $router.push('/')，hash 路由不改变 pathname，会话停留在 /login
- resolveServerAssetUrl.getAssetResolveBase() 将 /login/ 当作部署目录，图片 URL 变为 /login/zhi2-dev/...
- 命中 nginx SPA fallback 返回 HTML 而非图片，导致破图

## 修复（2026-11-12）
- login.vue、LoginForm.vue、companyLogin.vue 登录成功改为 window.location.replace('/')（共 4 处）
- api/index.js 中 401 跳转改为 '/#/login'
- 修复提交 `23baaa9`（4 文件），合入分支 develop/v2.6.2-suzhufang；父仓 gitlink `21a50ad` 已推送

## 验证与归属
- 构建验证：npm test（test 模式 Vite）成功 exit 0，时间 17:14:44–17:17:22，gitHash 54829a6bb（2026-11-12）
- 本地 nginx 8101（root=D:/repository/苏住房G/dist）验证 /zhi2-dev/...jpg 返回 200，/login/zhi2-dev/... 返回 404
- 禅道已回写 resolved/fixed，resolvedBy=tiany，assignedTo 退回 lichandan，附根因+证据评论
- 修复计划经编排器审核通过并人工确认：.plan/bug6540-broken-image.md
- 真实登录态 E2E 未执行（无登录态），需测试同学按 401→重登→查看记录 2120785757668904961 复验
- 真实登录态 E2E 未执行
- 注意：api/index.js 存在预存 eslint semi/arrow-parens 报错，非本次引入
- 注意：env/.env 有一份非本次的 stash 冲突（"temp env changes"，他人遗留）已还原为 HEAD，stash 条目保留未动

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6540",
  "source_extraction_id": "5634ca7588e74a0e9ff2ad2c831e040e",
  "version": 2,
  "memory_type": "entities"
}
-->
# 苏住房G
苏住房G 是当前维护的 Vue 2.7 前端管理项目，主仓位于 D:/repository/苏住房G，承载巡检等业务后台页面。

## 项目结构
- 主 checkout 绝对路径为 `D:/repository/苏住房G`，当前分支 `develop/v2.6.2-suzhufang`。
- 工作区存在 4 个与 flood 模块相关的预存脏文件，属于其他任务，需保留不动。
- 仓内 `worktrees/` 目录下的 `screen-motion` worktree 属于另一任务，不在主线处理。
- 巡检记录详情页实现文件为 `detail.vue`，标题区使用 `Headline` 组件，该组件支持 `#right` 槽并渲染在标题栏最右侧。
- 隐患处置详情页实现文件为 `src/views/electrocar/hazard/detail.vue`，属于安全管理 > 电动车管理 > 隐患处置。

## 页面布局约定
- 隐患处置详情页父容器 `.detail-container` 在 `index.scss:299-306` 使用 `flex-direction: column-reverse`，会把按钮挤到顶部标题行，需用 `position: fixed` 吸底栏对齐原型。
- 按钮吸底居中的参考实现是报事工单详情页的底部操作栏 `work-order-detail-actions`。

## 本地运行环境
- 本地 nginx 站点配置为「苏住房G.conf」，监听 `localhost:8101`，root 指向 `D:/repository/苏住房G/dist`，API 代理到 dev 网关。
- 需先执行 `npm run build` 生成 dist 才能访问本地站点；构建输出直接写入该 root，无需额外部署步骤。
- 本地站点可登录账号为 `zsbase` / `Zs@2026Aa!`，登录页含算术验证码；产品2.0 的 `zsbase` / `ZS001Aa!` 在本站登录会提示「密码错误」。
- deploy-env 技能注册表未收录 suzhufang，仅登记了 portal 与 fdc-v3。

<!-- MEMORY_FIELDS
{
  "category": "前端项目",
  "name": "苏住房G",
  "source_extraction_id": "aefafa1253e743a49ea16a704e9a70b5",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->
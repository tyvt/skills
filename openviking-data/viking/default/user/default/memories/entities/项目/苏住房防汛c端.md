# 苏住房防汛C端
原 worktree D:\repository\苏住房防汛C端-wt-login-align（fix/login-design-align）2026-11-04移除。

## 后端与服务
- 后端：zhi2-property(9604)/common-framework(9211 auth)/service-expand(9610，60防汛接口/7控制器)，响应 JsonResult/PageResult
- 登录 POST /api/v2.0/security/auth/login（VITE_AUTH_BASE_URL=/api，2026-11-04由/api-auth改/api）
- 巡查提交 SubmitInfoDto；缺配置报错"提交流程失败，请检查审批流配置"；bizState 2历史/3汛中/4汛后；权限 flood:inspection:add/submit；搜索示例天地华城小区 code 667577485357516；/v2.0/property/patrol/item/page total=0（多数据源疑2026-11-03）

## 前端状态与页面
- .env：VITE_API_BASE_URL=/api、VITE_AUTH_BASE_URL=/api（2026-11-04由/api-flood、/api-auth统一改/api，本地gitignore）；VITE_DATA_MODE=remote；VITE_LOGIN_USER/PWD废弃
- task-1 2026-11-03 inspection/detail/history/rescue+types（commit d3c7440）；task-2 e2e 5绿；task-6 2026-11-04 全局内联红错横幅改toastError（13文件，未交Lead）
- 2026-11-04 新页 systems/index.vue、home/housing/data/index.vue、BottomNav 5 tab、mine/data index.vue 按设计稿（e2e visual 4/4绿，commit 1a5b51e 已推 origin/dev fecf00a）
- App.vue onLaunch 登录分流：localStorage 有 flood-token-v1→reLaunch /pages/systems/index；无 token→停登录页（2026-11-04 验证）

## 部署与CI
- nginx D:\nginx\conf\sites-available\防汛C端（sites-enabled符号链接）8095监听，/api/ 代理→http://unlimited.c.h5.query.mobile.v2.suzhufang.shiqu.suzhou.dev.zhi.com（2026-11-04由test改dev网关，proxy_pass保留完整URI）；root 主区dist
- CI：gitlab-runner无Bun；commit 04b0c7b install-deps.mjs；test→npm test && uni build；二次CI修注入后20测绿
- 2026-11-04 合并 origin/dev（上游：筛选框样式调整、task1395项目检查模块）无冲突，vue-tsc+20测+build全绿，推 origin/dev 8b5d971..fecf00a；.env与nginx本地配置不入库
- Playwright/Chromium 路径 C:\Users\Administrator\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe；拦截figma.com/font

## 近期提交
- 2026-11-06 防台防汛 mock（47af55e）；物业自查 mock（ae35a7d，详见 zhi2_evaluation_mock）
- 2026-11-06 防汛页 .stepper 40→56px（theme.css#L122）、project-check/form 48→56px（83bddfa 推 dev）；ref8443 .counter 已 56px
- 2026-11-06 ref8443 图片上传改用 PhotoPicker.vue，删 Ref8443Uploads.vue（fb0e9d9 推 dev）
- 2026-11-06 表单字号统一14px（theme.css，4088d72 推 dev，详见 flood_font_size_unify）
- 2026-11-06 ref8443 移除 Ref8443Header 双标题栏（b595f75 合 07a5f36 推 dev）
- 2026-11-06 追加填报日期日历图标（c164dfe 推 dev，基于 07a5f36）
- 2026-11-06 ref8443 详情页照片网格改三列（photo-grid two→three，f7beb30 合 26e6d80 入 dev，未推送）
- 2026-11-06 ref8443 检查详情移除底部按钮组（226268d 合 bc7c934 入 dev，未推送）
- 2026-11-06 ref8443 历史页移除「查看草稿」按钮及 goDraft 方法（b8b49c4 合 4543137 入 dev，未推送）
- 2026-11-06 所有大文本域限制 maxlength=200（13处 textarea，ad033a8 合 626b71f 入 dev，未推送）
- 2026-11-06 ref8443 积水深度说明文字裁剪为「积水...厘米」（b931c16 合 a08cf18 入 dev，未推送）
- 2026-11-06 ref8443 选项标签字重统一500、选择题块与字段间距补14px（f3b4d3d 合 734056a 入 dev，未推送）
- 2026-11-06 ref8443 紧急联系电话移除「呼叫」文案并改为点击整条号码区域拨号（`uni.makePhoneCall`，号码 18888888888），相关文件 `src/components/flood/Ref8443Detail.vue`、`src/styles/ref8443.css`；worktree 分支 `feat/emergency-phone-tap` 提交并 fast-forward 合 dev 推送（本机无 node_modules 未本地构建）
- 2026-11-06 底部存草稿/提交按钮高度改56px：ref8443.css `.ui-ref8443 .action-bar .btn` 40→56px；theme.css `.action-button` 增 height:56px、`.action-bar` 高度 calc(72px+…)→calc(88px+…) 且 padding 12px→16px；worktree `苏住房防汛C端-wt-action-btn-56` 构建成功，提交 `5a2105d` fast-forward 合 dev，未推送 origin/dev
- 2026-11-06 所有防汛页面字体统一 16px（行高 24px）：涵盖卡片标题/表单标签/选项标签/字段标签/巡检/整改/筛选/详情/启动/房屋列表等页面选择器；worktree `苏住房防汛C端-wt-font16` 分支 feature/font-label-16px 提交 `89f8c85` fast-forward 合 dev 推送 origin/dev

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房防汛C端",
  "source_extraction_id": "465f6d6427d94561ad40bb43fadcf170",
  "version": 40,
  "memory_type": "entities"
}
-->
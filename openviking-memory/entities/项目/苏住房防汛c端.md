
# 苏住房防汛C端
uni-app Vue3 H5 防汛前端项目，主工作区 D:\repository\苏住房防汛C端，worktree D:\repository\苏住房防汛C端-wt-login-align（分支 fix/login-design-align）。

## 后端与服务
- zhi2-property(9604)/common-framework(9211 auth)/service-expand(9610，60防汛接口/7控制器)；响应 JsonResult/PageResult
- 登录 POST /api-auth/v2.0/security/auth/login {username,password(AES-256 base64)} 头 zhi-project-id: suzhufang；token→localStorage flood-token-v1；账号 zsbase/Zs@2026Aa！ AES密文 H03W0LoMA6EFQZIW46BnNA==
- 巡查提交 SubmitInfoDto；缺配置报错"提交流程失败，请检查审批流配置"；bizState 2历史/3汛中/4汛后；权限 flood:inspection:add/submit；搜索示例天地华城小区 code 667577485357516；/v2.0/property/patrol/item/page total=0（多数据源疑2026-11-03）

## 前端状态与页面
- .env VITE_DATA_MODE=remote；VITE_LOGIN_USER/PWD废弃；类型 FloodItem/FloodRecord；Store API fetchTemplate等；雪花19位ID必须String()防精度丢失
- 页面：task-1 2026-11-03 inspection/detail/history/rescue + types，commit d3c7440；task-2 e2e 5绿；task-6 2026-11-04 全局移除内联红错横幅改toastError（13文件，未交Lead）
- 2026-11-04 新页 systems/index.vue、home/housing/data/index.vue、BottomNav 5 tab、mine/data index.vue 按设计稿（e2e visual 4/4绿，未交Lead）

## 部署与CI
- nginx D:\nginx\conf\conf.d\flood-c-h5.conf 8095 监听，proxy /api-flood/→9610/、/api-auth/→9211/；root 原主区dist，task-1改worktree dist
- CI：gitlab-runner无Bun；commit 04b0c7b install-deps.mjs；test→npm test && uni build；二次CI修注入后20测绿
- Playwright/Chromium 路径 C:\Users\Administrator\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe；拦截figma.com/font


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房防汛C端",
  "source_extraction_id": "2fb6b09cc6b04eb5bada4090400fbd04",
  "version": 27,
  "memory_type": "entities"
}
-->
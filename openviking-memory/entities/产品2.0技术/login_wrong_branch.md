# 登录页改版改错分支
后台登录页改造需落在 develop/v2.6.2-portal 分支并基于门户逻辑重新整合，不可直接套用其他分支 UI 代码。

## 问题背景
- 按设计图改造登录页（授权/账号密码登录、第三方入口、注册链接，去二级 Tab 与图形验证码）后，用户指出改错分支
- 项目并行多条发布分支（develop/v2.6.2-yulin、develop/v2.6.2-portal 等），各分支登录逻辑不等价
- portal 分支走门户登录接口 /portal/sso/login（字段 userName）并有 setStoredUserId 等专属逻辑

## 解决方案
- 源分支 stash 登录页 + 注册页共享组件 accountInfo.vue + 新登录图标静态资源
- 切到 develop/v2.6.2-portal 解决冲突，基于 portal 原有逻辑重新整合 UI 改动
- 逐项保留 /portal/sso/login、userName 字段、setStoredUserId，勿整文件套用源分支
- zhi2-web-admin 是子模块，父仓库也要一并切到 develop/v2.6.2-portal，源分支工作区恢复干净再交付
- 改分支前先与用户确认目标分支

## 验证与归属
- 来源会话 453c62ef：用户第 5 轮明确改错分支，从 yulin 暂存切到 portal 解冲突重新整合
- 涉及文件：src/views/login.vue、LoginForm.vue、home/RegisterLogin.vue、companyLogin.vue、register/components/accountInfo.vue
- 所属项目：产品2.0；代码基线：8e16dca

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "login_wrong_branch",
  "source_extraction_id": "770fdb55ea6d4c7ebbe5d0d9060bf199",
  "version": 1,
  "memory_type": "entities"
}
-->
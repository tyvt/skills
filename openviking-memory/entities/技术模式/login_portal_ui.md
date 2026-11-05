# 登录页UI调整迁移至portal分支
产品2.0 的 zhi2-web-admin 登录页 UI 改动已迁移到 develop/v2.6.2-portal 分支（即 262portal 分支）。

## 操作说明
- 从 develop/v2.6.2-yulin 暂存登录页相关改动，切换到 develop/v2.6.2-portal 并解决冲突
- 基于 portal 分支原有逻辑重新整合 UI 改动（未直接套用 yulin 分支代码）
- 父仓库已切换到 develop/v2.6.2-portal

## Portal 分支适配要点
- 保留门户登录接口 /portal/sso/login（字段 userName）
- 保留 setStoredUserId 等 portal 专属逻辑
- 新 UI：授权登录 / 账号密码登录、第三方入口、注册链接
- 账号密码登录：无二级 Tab、无图形验证码

## 验证与归属
- 已暂存待提交文件：src/views/login.vue、src/views/register/components/accountInfo.vue、public/assets/images/login-icon-alipay.png、public/assets/images/login-icon-js-auth.png
- 所属项目：产品2.0；来源会话：453c62ef-4912-4526-ae16-57cb42408710；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_portal_ui",
  "source_extraction_id": "ce7689f8bffb4226a4a239088e1262fc",
  "version": 1,
  "memory_type": "entities"
}
-->
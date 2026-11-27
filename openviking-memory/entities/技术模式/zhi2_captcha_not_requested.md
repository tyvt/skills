---
audit_status: valid
last_checked: 2026-11-27T10:45:39+08:00
verdict_note: 在苏住房防汛C端仓源码命中核心符号(3/4)refreshcaptcha,request,unlimited，涉及文件存在，描述与现状一致，判有效。
---
# 苏住房防汛C端图形验证码demo构建不请求
苏住房防汛C端H5(zhi2-mobile-query-h5-c-unlimited)在demo构建下图形验证码接口不请求，仅显示"点击刷新"。

## 问题根因
- refreshCaptcha() 原含 `if (!isRemote) return` 门禁
- 8095部署的是demo构建(VITE_DATA_MODE=demo)，isRemote=false导致直接return，从不请求/api/v2.0/code
- nginx已把/api反代到网关，/api/v2.0/code实际可用(返回真实验证码图)

## 解决方案
- 移除login/index.vue与login-design/index.vue中refreshCaptcha的isRemote门禁，onMounted无条件请求
- src/utils/request.ts的fetchLoginCaptcha改为getApiBase() || '/api'兜底，demo构建也能走同源/api反代
- 登录失败后也刷新验证码

## 验证与归属
- 验证：Playwright捕获GET /api/v2.0/code→200，图形验证码框渲染真实验证码图
- 涉及文件：src/utils/request.ts、src/pages/login/index.vue、src/pages/login-design/index.vue
- 所属项目：苏住房防汛C端(zhi2-mobile-query-h5-c-unlimited)；来源会话：2026-11-04；代码基线：fix/login-design-align分支

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_captcha_not_requested",
  "source_extraction_id": "0663dc0d90f74cb2a40a9ab91da4603a",
  "version": 1,
  "memory_type": "entities"
}
-->
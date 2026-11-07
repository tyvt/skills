# 主动退出登录抑制401过期弹窗
苏住房G项目退出登录时仍弹「登录状态已过期」，需通过 isLoggingOut 标志区分主动退出与自然过期。
## 问题根因
- 退出登录清 token 后跳转，在途或无权限请求落地成 401
- utils/request.js 的 401 分支只按收到 401 判定，无法区分自然过期与用户主动退出
- 于是照样调 showAuthDialog() 弹出不需要的提示
## 解决方案
- request.js 加模块级 isLoggingOut 并导出 setLoggingOut(bool)；401 拦截仅当 !isLoggingOut 才弹会话过期框
- store/modules/user.js 的 LogOut 与 FedLogOut 开头先 setLoggingOut(true) 覆盖所有手动退出入口
- utils/auth.js 的 setToken() 中必须 setLoggingOut(false) 复位，避免重新登录后真过期不提示
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 来源会话：ffd2efe4-6853-464a-a9e4-0fe7137a2cf0
- 验证：会话 ffd2efe4-6853-464a-a9e4-0fe7137a2cf0，用户明确要求退出不提示过期
- 涉及文件：zhi2-web-admin/src/utils/request.js、store/modules/user.js、utils/auth.js
- 所属项目：苏住房G；代码基线：2a3ef8a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "logout_401_dialog",
  "source_extraction_id": "71cf8ea7ee9642e091216d28eb95e865",
  "version": 1,
  "memory_type": "entities"
}
-->
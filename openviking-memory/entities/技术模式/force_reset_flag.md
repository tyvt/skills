# 强制改密开关禁用避免登录拦截
苏住房G 项目通过 `FORCE_RESET_PASSWORD_ENABLED` 开关在登录链路禁用强制改密弹窗，避免 `ResetPwdDialog` 拦截登录，同时保留个人中心改密入口。

## 背景与问题
- 密码过期强制改密逻辑会在登录后弹出 `ResetPwdDialog`，拦截正常登录流程。
- 需要一种可逆方式临时关闭强制改密而不删代码，恢复时仅改开关即可。

## 修复要点
- `zhi2-web-admin/src/utils/passwordReset.js` 新增 `FORCE_RESET_PASSWORD_ENABLED = false`。
- `shouldForceResetPassword` 与 `resolveNeedResetPassword` 在开关关闭时恒返 `false`。
- 开关关闭时清除 `sessionStorage` 的 `needResetPassword` 标记。
- `store/modules/user.js` 的 `SET_RESET_PASSWORD` mutation 在开关关闭时忽略置 `true` 请求。
- 个人中心 `ChangePasswordDialog` 保持可用，仅屏蔽登录拦截弹窗。

## 恢复与验证
- 恢复强制改密仅需将 `FORCE_RESET_PASSWORD_ENABLED` 改为 `true`。
- 验证证据：src=苏住房G/074.md；来源会话：526fcf75-c8f3-449c-8d6b-9706dbca2a59。
- 涉及文件：passwordReset.js、store/modules/user.js、layout/index.vue、permission.js、ResetPwdDialog.vue、login.vue、LoginForm.vue。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "force_reset_flag",
  "source_extraction_id": "80b8d85da2ca487fb92817c245845f78",
  "version": 1,
  "memory_type": "entities"
}
-->
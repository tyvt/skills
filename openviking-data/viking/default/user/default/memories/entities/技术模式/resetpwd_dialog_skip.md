# 强制改密弹窗刷新被跳过与isUpdatePwd门禁覆盖
园区公共收益项目中，登录响应 isUpdatePwd:false 需强制改密，但 GetInfo 异步回写可能覆盖 store 标记导致刷新跳过弹窗。

## 问题根因
- 登录响应 isUpdatePwd:false（需改密）时，layout/permission 展示 ResetPwdDialog 后，GetInfo 或其他用户信息拉取把 store 改密标记冲掉
- 现象：「刷新页面就跳过强制改密」「isUpdatePwd 为 false 却不弹窗」
- 仅用单次 login 响应驱动弹窗而无并发拉取保护会导致状态丢失

## 修复要点
- 在 user 模块与路由守卫链路保证强制改密标记在 GetInfo 之后仍生效（或 GetInfo 合并时保留需改密状态）
- 直到用户完成改密前不清除标记；profile/resetPwd 提交后再清理状态
- 涉及 permission.js、layout、ResetPwdDialog 与 store/modules/user.js

## 验证与归属
- 验证：会话 b3e919f5 用户报强制改密刷新跳过、isUpdatePwd false 无弹窗；子模块提交 fix(user) 修复覆盖问题（27cece7ce）
- 涉及文件：store/modules/user.js、permission.js、layout/index.vue、home/ResetPwdDialog.vue
- 所属项目：园区公共收益；来源会话：b3e919f5-8279-449b-bd26-f23578eddea1；代码基线：bac29bb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "resetpwd_dialog_skip",
  "source_extraction_id": "2d8c5d9579cd49e0af90cf0231ceaa4e",
  "version": 1,
  "memory_type": "entities"
}
-->
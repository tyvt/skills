# 登录按钮防抖重复import修复
苏住房C 登录页因 `useSubmitLock` 被重复 import 导致连续点击无防抖，已修复。

## 问题根因
- `input.vue` 中 `useSubmitLock` 被重复 import 两次（第61行和第71行），且混在变量声明中间
- 所有调用接口的按钮未统一做防抖，登录可连续点击

## 解决方案
- 去掉重复 import，将 import 语句整理到文件顶部
- 重新编译后报错消失（暗示防抖生效）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/pages/login/index.vue`、`src/components/ZsButton/ZsButton.vue`、`src/utils/index.js` 等
- 来源会话ID：90f801fd-16cc-4974-98c1-c375232f80c4
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "login_submit_lock_fix",
  "source_extraction_id": "5098ffda0d4344d19a85da69bcffd9f0",
  "version": 1,
  "memory_type": "entities"
}
-->
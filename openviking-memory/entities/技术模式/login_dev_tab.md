# 开发环境放开账号密码登录 Tab
门户本地 npm run dev 需直接看到「账号密码登录」Tab 时，在 showPasswordLogin 中增加 import.meta.env.DEV 判断。

## Description
- 场景：本地 npm run dev 调试时需要账号密码登录入口，但生产/测试默认依赖 IP 白名单接口校验。
- 涉及文件：zhi2-web-admin/src/views/login.vue；zhi2-web-admin/src/App.vue

## Solution
- 在 login.vue 的 showPasswordLogin 计算属性中增加 import.meta.env.DEV 为 true 则始终展示账号密码登录。
- 与项目内 App.vue 等处的 DEV 判断保持一致；生产/测试构建行为不变，仍依赖 IP 白名单接口校验通过后才显示。

## Verification
- 验证证据：用户要求开发环境放开账号密码登录，实现为 showPasswordLogin 增加 DEV 判断并说明生产仍走白名单。
- 所属项目：门户；代码基线：04586c4；来源会话ID：5236cf21-0cd9-483b-99dd-26c7a89bddb3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_dev_tab",
  "source_extraction_id": "ed1fac0b5fc74af090dd3e2c670437c9",
  "version": 1,
  "memory_type": "entities"
}
-->
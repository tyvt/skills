# 注册页路由哨兵 add 被误当作 applyId
太仓G zhi1-web-admin 注册页把路由参数 add 当作公司 ID 去请求接口而触发 401，已在 register/index.vue 忽略该哨兵值修复。

## 根因
- /register/add 将 add 作为 applyId 传入，页面误把它当作公司 ID
- 进而请求 GET /company/base/add，未授权返回并触发 401 过期弹窗

## 解决方案
- 在 src/views/register/index.vue（约 414 行）忽略该路由哨兵值
- 保留原有的注册成功后验证码刷新逻辑
- 同时移除三个未使用的组件注册，以清除 ESLint 错误

## 验证与归属
- 真实 API E2E：注册与登录均返回 200，凭据已返回并预填、密码按协议加密，getInfo 返回 userType=01
- 401 路径为空，注册与登录均未显示过期弹窗；标准公司查询、区域保存、路由生成调用数均为 0
- npm run build exit 0，Nginx 页面返回 HTTP 200；单文件 ESLint exit 0（0 errors / 259 warnings）
- 项目：太仓G / zhi1-web-admin；任务号 2334；代码未提交、未推送

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-taicang-wuguan-fe-zhi1-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "register_route_sentinel_add",
  "source_extraction_id": "e536e896f92741a3a5cfb36d5f05abcd",
  "version": 1,
  "memory_type": "entities"
}
-->
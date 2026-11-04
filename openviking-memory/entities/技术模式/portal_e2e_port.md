# 门户E2E端口冲突跳登录页
跑 public-portal E2E 时若默认 baseURL 指向被占用的 8082 端口会被路由守卫跳登录页，须用 `PLAYWRIGHT_BASE_URL` 显式指向本项目服务。

## 问题根因
- 8082 端口被同机「苏州市房地产监测V3」服务占用，Playwright 默认 baseURL 打开 http://localhost:8082/ 实际访问另一项目
- 对方应用路由守卫将带门户 cookie 的请求 302 到其登录页，表现全红且跳登录页

## 处理做法
- 跑门户 e2e 前用 `netstat -ano | findstr :8082` 确认端口归属
- 用 `PLAYWRIGHT_BASE_URL=http://localhost:<门户自己的端口>` 显式指向（门户 dev server 常用 8099）
- 端口冲突先换端口或停占用进程再谈用例结果
- 汇报分开列「本项目改动失败」与「环境/存量失败」，用 git stash 到 HEAD 复跑逐条比对判定存量

## 验证与归属
- 验证证据：会话 session_3d01b16252048fb94546dd89cb938bd8；10 个失败用例与改动无关、stash 后重跑同样失败
- 涉及文件：zhi2-web-admin/tests/e2e/public-portal-visual.spec.ts、zhi2-web-admin/package.json
- 所属项目：门户；来源会话ID：session_3d01b16252048fb94546dd89cb938bd8；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_e2e_port",
  "source_extraction_id": "dd05c04674b048bf80a36b361c86a7fd",
  "version": 1,
  "memory_type": "entities"
}
-->
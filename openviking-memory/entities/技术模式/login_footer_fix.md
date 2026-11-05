# 登录底栏固定定位水平居中修复
园区物管2.0 登录页 `.el-login-footer` 因 fixed 定位 left/right 为 auto 且父级 flex-end 导致底栏靠左不居中，需显式贴齐视口左右。

## 问题现象
- 登录页底栏 `.el-login-footer` 文字不水平居中，整体靠左显示
- 父级 `.login.login--form-only` 使用 `align-items: flex-end`，底栏作为 flex 子节点在 `position: fixed` 且 left/right 默认 auto 时，水平位置按 flex 静态位置计算

## 根因
- 底栏 `el-login-footer` 虽为 `position: fixed`，但 left/right 未设置（默认 auto），固定定位水平位置回退到 flex 静态位置，导致整块底栏被摆到靠左

## 解决方案
- 给 `.el-login-footer` 加 `left: 0; right: 0;` 显式贴齐视口左右
- 加 `box-sizing: border-box`，靠内部 `text-align: center` 居中文字
- 若仍异常，检查外层 `.login` 是否用 `transform`（会把 fixed 改成相对该层定位）

## 验证与归属
- 验证证据：src=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/login.vue
- 所属项目：园区物管2.0；代码基线 none；来源会话 4b4a9576-d928-45cc-bdb7-cc109ec7c990


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_footer_fix",
  "source_extraction_id": "6c57e8ad6f474e96b0c7179f993c550f",
  "version": 1,
  "memory_type": "entities"
}
-->
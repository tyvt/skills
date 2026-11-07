# e2e 登录态保存脚本修复
zhi2-web-admin 的 save-auth-state.mjs 旧脚本因登录完成判定条件不满足，生产环境常超时退出，导致 zsbase.json 从未生成。

## 问题根因
- 旧脚本只认「动态路由 meta.filePath 已加载」作为登录完成信号
- 生产环境登录后该条件常不满足，30 秒超时退出，从未执行 storageState()
- zsbase.json 一直未生成，后续生产环境只读测试无法运行

## 修复方案
- 自动保存：检测到 Admin-Token 或 URL 已离开 /login 即保存
- 手动保存：登录成功回到终端按 Enter 保存（更可靠）

## 使用步骤
- 执行 npm run test:e2e:auth:save
- 浏览器正常登录看到首页后，切回终端按 Enter
- 终端输出：已保存登录态: ..\e2e\.auth\zsbase.json

## 关联信息
- 涉及文件：zhi2-web-admin/save-auth-state.mjs、zhi2-web-admin/e2e/.auth/zsbase.json
- 所属项目：产品2.0；来源会话：441e5287-5448-4821-9c2e-13e82e944aa5

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_auth_state_save_fix",
  "source_extraction_id": "6b8fdd3bf7ad451a97f037f40baed9eb",
  "version": 1,
  "memory_type": "entities"
}
-->

# G端误弹B端项目选择弹窗：terminalType残留态
园区物管2.0 中 G 端登录时误弹 B 端「物业管理区域选择」弹窗，根因是 terminalType 会话级状态残留。

## 问题根因
- store 的 GetInfo 只在 B 端写入 terminalType，G 端不更新、登出也不清除
- 同会话内切换账号时内存残留 terminalType==='B'，误触发 bProjectDialog
- 误触发后 G 端用户请求 operableProjectList 返回空列表，首次登录无 currentProjectId 时弹窗无法关闭

## 解决方案
- terminalType 属「登录即重取、登出必须清」会话级状态：user.js 始终写入 terminalType、G 端登录清项目缓存、登出重置 terminalType
- layout 用 isBTerminal 严格判定（非 B 端强制关弹窗并清数据），Navbar 仅 B 端显示项目切换入口
- login/LoginForm 登录成功时重置 roles 与 terminalType 强制重新拉用户信息
- 所有按 terminalType 分叉的 B/G 逻辑都要防「上一账号残留」这一前提

## 验证与归属
- 验证：GetInfo 只在 B 端写 terminalType、登出不清除导致残留；修复覆盖五处状态重置
- 涉及文件：src/store/modules/user.js、src/layout/index.vue、src/layout/components/Navbar.vue、src/views/home/bProjectDialog.vue、src/permission.js
- 所属项目：园区物管2.0；代码基线 7fe15a8cb；来源会话 84a73d0e-bafd-4217-bef6-71383e10d880

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "terminaltype_residual_session",
  "source_extraction_id": "2b3b431dfc5c4ca08b1fc7e3928ac2bf",
  "version": 2,
  "memory_type": "entities"
}
-->
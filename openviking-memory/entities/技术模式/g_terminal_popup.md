# G端登录误弹物业管理区域选择弹窗
园区物管2.0 中 G 端登录时（一般部署后第一次登录）误弹「物业管理区域选择」弹窗，根因有两处，已在 user.js、layout/index.vue、Navbar.vue、login.vue/LoginForm.vue 修复。

## 根因
- terminalType 状态管理不完整：GetInfo 只在 B 端写 terminalType，G 端不更新；登出不清除。同会话先登 B 再登 G 或跳过 GetInfo 时内存残留 terminalType==='B' 误触发弹窗
- G 端用户无物业区域列表：误触发后 operableProjectList 返回空，弹窗无内容；首次登录无 currentProjectId 无法关闭只能刷新

## 修复方案
- user.js：始终写入 terminalType；G 端登录清除项目缓存；登出重置 terminalType
- layout/index.vue：用 isBTerminal 严格判断，非 B 端强制关闭弹窗并清空数据
- Navbar.vue：仅 B 端显示项目切换入口
- login.vue / LoginForm.vue：登录成功重置 roles 和 terminalType，确保重新拉取用户信息

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- G 端登录后不再出现该弹窗
- 验证证据：cursor 会话 84a73d0e 提取，根因与修复已确认
- 涉及文件：zhi2-web-admin/src/store/modules/user.js、layout/index.vue、layout/components/Navbar.vue、views/login.vue、LoginForm.vue
- 所属项目：园区物管2.0；来源会话：84a73d0e-bafd-4217-bef6-71383e10d880；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "g_terminal_popup",
  "source_extraction_id": "4549e150f8d74af48f97510d9aa91ad6",
  "version": 1,
  "memory_type": "entities"
}
-->
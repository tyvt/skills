# terminalType 未重置致 G 端误弹物业弹窗
园区物管2.0 中 terminalType 状态管理不全，GetInfo 仅 B 端写入且登出未清，残留值误触 bProjectDialog 弹窗。

## 问题根因
- terminalType 状态管理不全，GetInfo 接口仅 B 端写入 terminalType，且登出时未清空
- 残留的 terminalType 值导致 G 端误触发 bProjectDialog 物业项目弹窗

## 解决方案
- user.js 始终写入并重置 terminalType
- layout/index.vue 以 isBTerminal 非 B 端强关弹窗
- Navbar.vue 仅 B 端显示入口
- login.vue / LoginForm.vue 登录时重置 roles 与 terminalType

## 验证与归属
- 验证：src=园区物管2.0/018.md
- 涉及文件：views/home/bProjectDialog.vue、components/ProjectDialog/index.vue、layout/index.vue、layout/components/Navbar.vue、store/modules/user.js、permission.js、utils/projectContext.js、main.js
- 所属项目：园区物管2.0；来源会话：84a73d0e-bafd-4217-bef6-71383e10d880

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "terminaltype_reset_bug",
  "source_extraction_id": "2b3b431dfc5c4ca08b1fc7e3928ac2bf",
  "version": 2,
  "memory_type": "entities"
}
-->
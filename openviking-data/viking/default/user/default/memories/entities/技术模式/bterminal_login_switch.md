# B端登录弹窗显式开关常量
产品2.0 中 B 端登录后的「选择物业管理区域」弹窗行为，统一由 projectContext.js 的显式常量开关控制，避免散落多处导致回归。

## 问题背景
- B 端从业人员登录后曾反复出现/消失「选择物业管理区域」弹窗，业务方明确要求 B 端登录不弹窗
- 该功能历史记录里曾被改回去、又被静默取消，表现为「又出现了」的回归
- 根因是登录后副作用散落在路由守卫、layout、store 多处，合并/重构时易被改回

## 解决方案
- 在 src/utils/projectContext.js 维护导出常量 ENABLE_B_TERMINAL_PROJECT_DIALOG_ON_LOGIN（注释写清「企业管理员不走此流程」）
- 登录流程与布局组件都读此常量，不在守卫或组件里写 if 条件
- 置 false 后：登录不再自动弹窗；登录时清除本地缓存的 currentProjectId / currentProjectName 避免残留；导航栏保留手动切换入口
- 业务若后续改为「不弹窗但自动选中第一个区域」，在同一常量下接静默选区逻辑，不新开分支条件

## 验证与归属
- 验证：会话 8bec5640 用户报「b端又出现了选物业管理区域的弹窗」，明确 B 端登录不弹窗，最终置常量 false 并清缓存、保留手动切换
- 涉及文件：zhi2-web-admin/src/utils/projectContext.js、zhi2-web-admin/src/mixins/bTerminalProjectMixin.js
- 所属项目：产品2.0；来源会话：8bec5640-c74a-4675-90e1-b0ea5fffe550；代码基线：50767de

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bterminal_login_switch",
  "source_extraction_id": "367daf60193e4512bd7f31c6fd55c740",
  "version": 1,
  "memory_type": "entities"
}
-->
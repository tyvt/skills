# operableProjectList 登录选项目功能移除
苏州市房地产监测V3 前端已移除 operableProjectList 登录选项目/小区功能及其全局项目上下文工具。

## 删除文件
- src/views/home/bProjectDialog.vue（B 端登录选项目弹窗）
- src/utils/projectContext.js（全局项目上下文工具）

## 布局与状态变更
- layout/index.vue：移除 operableProjectList 请求、bProjectDialog 及全部相关状态/方法
- Navbar.vue：移除顶部「切换项目/小区」入口
- store/modules/user.js：移除 currentProject / currentProjectId 状态与 mutation；登录/登出时清理历史 localStorage 键
- store/getters.js：移除 currentProject、currentProjectId getter

## 关联简化
- bTerminalProjectMixin.js：保留 B 端字段锁定判断，去掉全局 currentProjectId 注入
- workOrder/order/index.vue、chargeManage/charge 等关联模块同步简化

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：e878bcab-6ff1-431b-8fab-530533fdf8df；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operable_projectlist_removed",
  "source_extraction_id": "d465aecbeb4342b69de5b9a977f1992c",
  "version": 1,
  "memory_type": "entities"
}
-->
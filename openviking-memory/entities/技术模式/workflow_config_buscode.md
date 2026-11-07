# 流程配置维护页无busCode禁止开弹窗
园区公共收益项目中，tool/workflow 与流程配置弹窗联动规则要求业务编码隐藏且来自菜单，无 busCode 时不打开 ConfigDialog。

## 问题根因
- 流程名称改为必填；业务编码字段 UI 隐藏，实际 busCode 来自菜单
- 新增/编辑流程配置时若选中菜单数据没有业务编码，打开弹窗会导致手填 busCode 与线上路由 meta 双源不一致

## 解决方案
- 无业务编码时不打开 ConfigDialog，直接 message 提示「请先前往菜单管理配置菜单业务编码」
- 避免在流程工具里手填 busCode，统一从菜单管理配置

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：会话 51f3071e 用户诉求业务编码隐藏、无业务编码不弹窗并提示前往菜单管理配置
- 涉及文件：tool/workflow/index.vue、ConfigDialog.vue、ConfigTable.vue
- 所属项目：园区公共收益；来源会话：51f3071e-0992-4ca2-b14d-e0fa6c2d181d；代码基线：479ebe7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workflow_config_buscode",
  "source_extraction_id": "2d8c5d9579cd49e0af90cf0231ceaa4e",
  "version": 1,
  "memory_type": "entities"
}
-->
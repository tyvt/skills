# 待办详情返回路由与 backUrl 修复
惠山二期G 项目中，待办从首页进入详情未带 backUrl、返回路径截错、directDetail 未识别的修复套路。

## 现象
- 首页待办用 navigateToTodoTask 进入详情不带 backUrl，返回只能靠截断路径
- 详情路径为 .../detail/{committeeVersionId} 时，lastIndexOf('/') 截到 .../detail 无 ID 壳页，缺少 formMode=view，误判为新增并触发 committeeVersionId 参数类型错误
- directDetail（已备案物管会）未纳入详情路由识别，待办可能解析到错误详情路由

## 修复方案
- utils/ruoyi.js 的 resolveBackNavigationTarget：正确从 detail/{id} 回到列表
- 待办跳转补充 backUrl；识别 directDetail 路由
- 详情路径与列表页保持一致，使用 getRouterPathByFilePath + id

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 涉及文件：utils/ruoyi.js、OperationBtnGroup/index.vue、main.js
- 所属项目：惠山二期G；来源会话：1f86f5fa-6621-449b-b902-a3be952fcbd5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_backurl_routing",
  "source_extraction_id": "8280b5a305984951910eb7df99f705d7",
  "version": 1,
  "memory_type": "entities"
}
-->
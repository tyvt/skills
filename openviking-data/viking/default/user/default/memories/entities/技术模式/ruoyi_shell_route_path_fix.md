# 壳路由组件路径为空修复
苏住房G项目ruoyi.js修复了壳路由（Layout等）被误当作有效组件路径导致菜单跳转错误的问题。

## 问题根因
- 像component:"Layout"、flattenTree写入的meta.filePath:"Layout"这类壳路由以前被当成有效组件路径
- 单条busCode菜单时还可能走{name:'Property11/:tableid',params:{tableid}}而非待办里的storedPath

## 修复要点
- 新增SHELL_MENU_COMPONENTS：Layout、ParentView、InnerLink、InnerLink/index（与permission.js一致）
- getRouteFilePath：上述壳组件一律视为无页面路径，返回''（hint匹配、filePath查找都不会再命中Layout）
- resolveTodoTaskNavigation：在resolveRegisteredRoute中处理空路径走storedPath

## 涉及文件
- zhi2-web-admin/src/utils/ruoyi.js
- zhi2-web-admin/src/store/modules/permission.js
- zhi2-web-admin/src/views/flowable/todo.vue
- zhi2-web-admin/src/views/home/index-v2.vue

## 验证与归属
- 所属项目：苏住房G；来源会话：f1c7af59-850a-422f-aaa3-9169cf16f750；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ruoyi_shell_route_path_fix",
  "source_extraction_id": "fe0d6d2b918c4a599f472aedc212ae79",
  "version": 1,
  "memory_type": "entities"
}
-->
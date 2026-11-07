# 操作日志操作模块为空诊断
园区公共收益项目操作日志「操作模块」为空的前端诊断结论，根因在请求头菜单名未正确传递。

## 关键结论
- 操作日志操作模块来自后端记录的 title 字段
- 前端通过请求头 zs-menu-name（菜单名称）和 zs-menu-path（菜单路径）传给后端
- 所有接口在 request.js 拦截器里调用 getPageRequestHeaders() 附加这些请求头

## 根因场景
- 新增页（路径以 /add 结尾）当前匹配路由未配置 meta.title
- 新菜单只配列表页，详情页 hidden 路由未配 title/filePath
- 子路由叶子路由 meta 为空但父级路由有配置
- 截图里新增操作操作模块为空，修改/删除/审批有值

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益；来源会话：020b4402-aa87-4f14-bc0e-617da146dbe4；代码基线：none
- 涉及文件：request.js、pageRequestContext.js、system/operlog/index.vue

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "operlog_module_empty",
  "source_extraction_id": "4b566ffdc76e457fbb659ffa7cef0027",
  "version": 1,
  "memory_type": "entities"
}
-->
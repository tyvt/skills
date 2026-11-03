# 操作日志 dataId 误用路由段
园区公共收益项目列表删除等操作日志误把路由段（unit、building、add）当 dataId，致关联单据跳转必然失败。

## 问题根因
- 关联跳转只判断 dataId/menuPath 非空，未区分「业务主键」与「路由片段」
- building/unit 删除日志 dataId 误记为 unit，operlog 关联单据渲染成可点链接

## 解决方案
- 在 zhi2-web-admin/src/utils/ruoyi.js 抽 isNavigableDataId：排除空值、add、纯字母模块段
- 数字主键（如 2071871954305007618）仍视为可跳转
- operlog/index.vue 模板层与 handleViewDataDetail 跳转前双重校验，无效 ID 渲染为普通文本并直接 return
- 排查套路：先核对日志 dataId 是否来自 $route.params 而非行主键字段

## 验证与归属
- 会话 bf7d8178：building/unit 删除日志 data-id 误记为 unit；同步加固 operlog 关联单据跳转
- 涉及文件：zhi2-web-admin/src/utils/ruoyi.js、zhi2-web-admin/src/views/system/operlog/index.vue、zhi2-web-admin/src/views/building/unit/index.vue
- 所属项目：园区公共收益；来源会话ID：bf7d8178-91af-4c4d-8226-59e3910a54bd；代码基线：36a9a7e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operlog_dataid_bug",
  "source_extraction_id": "265d1891016b4a6484b2371a245ed467",
  "version": 1,
  "memory_type": "entities"
}
-->
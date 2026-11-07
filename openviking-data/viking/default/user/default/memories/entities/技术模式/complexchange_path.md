# complexChange 页面空白路由诊断
项目 2-0 中 `/property/property/complexChange` 空白，真实路由 path 更可能是 `/property/complexChange/...`。
## 现象
- `/property/property/complex` 可正常打开；`/property/property/complexChange` 空白。
## 诊断结论
- 代码中“变更”相关跳转用 `getRouterPathByFilePath('property/complexChange/detail')`，说明真正注册在路由里的 path 更可能是 `/property/complexChange/...` 而非 `/property/property/complexChange/...`。
- 疑似后端返回的菜单 path 与前端拼接不一致导致空白。
## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 b3c5e61d（cursor session=b3c5e61d-0c1b-42d7-b8c6-0e42c8a88242）。
- 涉及文件：TagsView/index.vue；所属项目：2-0；来源会话ID：b3c5e61d-0c1b-42d7-b8c6-0e42c8a88242；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complexchange_path",
  "source_extraction_id": "d9ab1a0ce9de4c3f9d36f986e9f6078d",
  "version": 1,
  "memory_type": "entities"
}
-->
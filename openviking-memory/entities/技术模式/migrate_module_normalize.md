# 迁移模块规范化批量替换
产品2.0 的 zhi2-web-admin 完成迁移模块规范化，`npm run build` 通过，旧写法清零。

## 执行结果
- 新增脚本 `normalize-migrated-modules.mjs`（主规范化 164 文件）、`fix-normalize-artifacts.mjs`（修复副作用 107 文件）、`dedup-detail-crud.mjs`（标准页 CRUD 去重）
- `require()`、`v-waiting`、`method: 'get'/'put'` 在迁移目录均为 0 处
- `el-form` 转 `zs-form`（详情页/Dialog 替换，`el-form-item` 保留），`el-input/button/dialog/table/pagination/date-picker` 转 `zs-*`

## 验证与归属
- 验证：`npm run build` 通过
- 涉及文件：big.js、specialcontract/detail.vue、planChange/detail.vue、guarantee/usemoney/detail.vue
- 所属项目：产品2.0；来源会话：875fc450-bf31-4e92-ac86-dd4c8e25223e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "migrate_module_normalize",
  "source_extraction_id": "fa91e52bec984e5cbe8148f4d9145e28",
  "version": 1,
  "memory_type": "entities"
}
-->
# detail.vue导入大小写致Linux构建失败
Windows不区分文件名大小写而Linux区分，`buildinginfo/detail.vue`中import路径大小写不匹配致CI构建失败，需修正为实际文件名。

## 根因
- Windows不区分文件名大小写而Linux（GitLab Runner/Rollup）区分。
- `buildinginfo/detail.vue`中`import`路径`./components/unitTable.vue`与实际文件`UnitTable.vue`大小写不匹配。

## 解决方案
- 修改`buildinginfo/detail.vue`第169行import路径为`'./components/UnitTable.vue'`以通过CI构建。

## 涉及文件
- src/views/projectManagement/buildinginfo/detail.vue
- ./components/unitTable.vue
- UnitTable.vue

## 验证与归属
- 验证证据：src=产品2.0/073.md
- 来源会话ID：77670b3d-757c-4c9b-81a1-088b6d675376
- 代码基线：none
- 所属项目：产品2.0（zhi2-web-admin）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "import_case_fail",
  "source_extraction_id": "55bb34ba05c74db7846be6cfd5d6ceb5",
  "version": 1,
  "memory_type": "entities"
}
-->
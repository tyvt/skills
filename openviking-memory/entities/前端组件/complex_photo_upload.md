# ComplexPhotoUpload 多图上传组件
园区公共收益项目从苏住房分支迁移的图片上传组件，用于物业管理区域的新增/编辑页。

## 功能与结构
- 位置：`zhi2-web-admin/src/components/ComplexPhotoUpload/index.vue`，配套工具 `src/utils/complexPhoto.js`。
- 四个上传位：小区大门图（必填带*）、鸟瞰图、物业服务中心图片、小区特色图片。
- 校验：png/jpg/jpeg，单张 ≤5MB；含预览/删除、右下角图片名称标签、非 ASCII 文件名自动改名上传。
- `complexPhoto.js`：槽位配置与 `complexPhoto` 逗号分隔串的解析/序列化；自动过滤历史数据里的 `empty.svg` 占位图；保存时缺位自动补默认图。

## 使用页面
- property/complex/detail.vue、property/complexChange/detail.vue 等物业管理区域页面。

## 验证与归属
- 来源：从 develop/v2.6.2-suzhufang 分支（提交 1f9ff7254 等）迁移至 develop/v2.6.2-yuanqu；所属项目园区公共收益；来源会话 05d8ab0e-ab89-4e9c-bffb-a284f36311b6。

<!-- MEMORY_FIELDS
{
  "category": "前端组件",
  "name": "complex_photo_upload",
  "source_extraction_id": "03289f07c5334576ab4bc228a9de1fd1",
  "version": 1,
  "memory_type": "entities"
}
-->
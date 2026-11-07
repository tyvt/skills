# 因图片不存在且 scoped 未导入 Sass 导致的编译错误
在产品2.0的 zhi2-web-admin 中，cardData.vue 引用了不存在的图片，且 buildingTable 的 scoped 样式未导入变量文件，导致编译或运行错误。

## 问题根因
- cardData.vue 引用了不存在的 down.png/up.png，导致运行时资源缺失
- buildingTable/index.vue 的 scoped 样式未导入 Element 的变量文件，导致 $--color-primary 未定义并编译失败

## 解决方案
- cardData.vue 改用 el-icon-top/el-icon-bottom 代替图片
- buildingTable/index.vue 将 $--color-primary 替换为 var(--primary-color)，编译成功

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：607e0008-39cd-4f41-ac93-f621b4844489
- 验证证据: src=产品2.0/046.md
- 涉及文件: zhi2-web-admin/src/views/indemnity/homePage/components/cardData.vue, src/utils/resolveServerAssetUrl.js, src/views/projectManagement/buildingTable/index.vue, vite.config.js
- 所属项目: 产品2.0; 会话: 607e0008-39cd-4f41-ac93-f621b4844489; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia produto 2.0",
  "name": "scoped_asset_build",
  "source_extraction_id": "794b625f596c43eeb4179370fbaced2a",
  "version": 1,
  "memory_type": "entities"
}
-->
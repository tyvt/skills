# 添加巡检图片默认图标缺失需组件配置
物业手持B端添加巡检记录页上传图片的默认图标未显示，需补全组件默认图标配置。

## 问题根因
- 添加巡检记录页上传图片的默认图标未显示

## 解决方案
- 在 `src/components/` 相关组件中补全默认图标配置以统一交互样式

## 验证与归属
- 验证证据：src=物业手持B端/001.md
- 涉及文件：src/components/ZsUploader/ZsUploader.vue、src/pages_facility/record/add.vue、src/pages_facility/issue/components/ReplyDialog.vue、src/pages_facility/repair/submit.vue、src/components/ImageUploader/ImageUploader.vue、src/pages_facility/record/index.vue、package.json、node_modules/@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.vue
- 来源会话ID：4a6e1eff-78f1-4ae7-854d-fad7a82f9dcb
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_add_icon",
  "source_extraction_id": "378a0d6c59af498ca69b4ef6193b77fc",
  "version": 1,
  "memory_type": "entities"
}
-->
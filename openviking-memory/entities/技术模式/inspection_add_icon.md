# 添加巡检图片默认图标缺失需组件配置
物业手持B端添加巡检记录页上传图片的默认图标未显示，需补全组件默认图标配置。

## 问题根因
- 添加巡检记录页上传图片的默认图标未显示，因 `ZsUploader` 未配置 `iconType="default"` 的默认图标

## 解决方案
- 在 `src/components/ZsUploader/ZsUploader.vue` 内置 `icon_add_img.png` 作为 `iconType="default"` 默认图标
- 用 `width:100%; height:100%` 填满上传格，避免与 `uni-file-picker` 百分比布局冲突，保留 `#icon` 插槽可自定义
- 移除 7 个页面重复的 `#icon` 插槽、`iconAddImg` 导入及 `.icon-wrap`/`.icon-add-img` 样式（add.vue、repair/submit.vue、ReplyDialog.vue、RejectDialog.vue、CompleteDialog.vue 等）

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/components/ZsUploader/ZsUploader.vue、src/pages_facility/record/add.vue、src/pages_facility/issue/components/ReplyDialog.vue、src/pages_facility/repair/submit.vue、src/components/ImageUploader/ImageUploader.vue、src/pages_facility/record/index.vue、package.json、node_modules/@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.vue
- 来源会话ID：4a6e1eff-78f1-4ae7-854d-fad7a82f9dcb
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_add_icon",
  "source_extraction_id": "039687108a0b4a3480f4534b33cc58de",
  "version": 2,
  "memory_type": "entities"
}
-->
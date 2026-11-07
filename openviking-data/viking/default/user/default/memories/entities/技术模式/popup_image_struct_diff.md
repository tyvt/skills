# 真机弹窗图片不显因代码结构差异非证书
泰兴小程序真机弹窗图片缺失源于项目内已验证代码与弹窗实现的结构性差异，非证书或域名白名单问题。
## 问题根因
- `www.ylzhwy.com:19002` 证书有效且 `<image>` 不受小程序域名白名单限制。
- 真机弹窗图片缺失源于项目内已验证代码与弹窗实现的结构性差异。
## 解决方案
- 排查弹窗实现与已验证代码的结构差异，对齐图片渲染逻辑。
## 验证与归属
- 验证证据：src=泰兴小程序/005.md
- 涉及文件：src/pages.json、src/staff/pages_facility/record/add.vue、src/components/ZsDialog/ZsDialog.vue、src/staff/components/ZsUploader/ZsUploader.vue、src/App.vue、node_modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue、node_modules/@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue、node_modules/@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.vue
- 来源会话ID：1f1cffd7-ca4f-4638-a390-b56e691f9e57
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "popup_image_struct_diff",
  "source_extraction_id": "05a8519eba4c4b9e8bf848e717c3609b",
  "version": 1,
  "memory_type": "entities"
}
-->
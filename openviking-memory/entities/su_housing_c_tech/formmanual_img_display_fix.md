# FormManual 图片上传组件显示问题修复
苏住房C 实名认证页 FormManual 修复 ZsUploader 布局异常、手持证件照文字重叠及自定义图标结构问题。

## 问题原因
- `ZsUploader` 的 `uni-file-picker` 默认用 `padding-top` 撑高度，`middle`/`large` 尺寸未重置（small 已设 `padding-top:0`），导致上传框高度异常、空白或文字错位
- 手持证件照卡片标题已是「上传手持证件照图片」，组件内 `tips` 重复同样文字，固定高度框内发生重叠
- 身份证正反面相机图标插槽在容器外，样式未正确生效

## 修改内容
- `ZsUploader.vue`：为 `middle`/`large` 的 `.file-picker__box` 添加 `padding-top:0`
- `ZsUploader.vue`：为 `.file-picker__box-content` 设置 `height:100%`
- `ZsUploader.vue`：将 icon 插槽放入 `photo-uploader-icon__container` 保证自定义图标显示
- `FormManual.vue`：手持证件照上传提示改为「点击上传」，避免与标题重复

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：8d858fb8-aeff-42fe-b53b-03cca8718495
- 代码基线：none
- 涉及文件：`src/pages_my/verification/FormManual.vue`、`src/components/ZsUploader/ZsUploader.vue`

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "formmanual_img_display_fix",
  "source_extraction_id": "d33c1384ff4a4ddeb16868b3c22e62c2",
  "version": 1,
  "memory_type": "entities"
}
-->
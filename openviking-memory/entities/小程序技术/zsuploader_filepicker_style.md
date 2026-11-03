# ZsUploader 基于 uni-file-picker 显示异常
苏住房C 小程序 FormManual 图片上传区域因封装 uni-file-picker 尺寸档位未复位导致高度错位。

## 问题现象
- pages_my/verification/FormManual 上传框高度忽高忽低、图标文字错位，手持证件照文字重叠
- 身份证正反面自定义相机图标插槽渲染在容器外，作用域样式命中不到，图标不居中不显示

## 根因
- uni-file-picker 靠 .file-picker__box 的 padding-top 撑方形高度，仅 small 写 padding-top:0，middle/large 未复位致框体撑高
- 卡片标题已描述对象，组件内 tips 又写同样长文案，固定高度框内必然重叠
- 自定义图标插槽在 photo-uploader-icon__container 之外，样式不生效

## 解决方案
- 给 middle/large 的 .file-picker__box 补 padding-top:0，.file-picker__box-content 设 height:100%
- 把 icon 插槽收进 photo-uploader-icon__container 内层保证渲染
- 业务调用时标题已描述上传对象，tips 只写「点击上传」极短提示不重复

## 验证与归属
- 所属项目：苏住房C
- 来源会话：8d858fb8-aeff-42fe-b53b-03cca8718495
- 代码基线：5f0f4dc
- 涉及文件：ZsUploader.vue、FormManual.vue

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zsuploader_filepicker_style",
  "source_extraction_id": "57a3eea8f908476fa5da61782238e5bf",
  "version": 1,
  "memory_type": "entities"
}
-->
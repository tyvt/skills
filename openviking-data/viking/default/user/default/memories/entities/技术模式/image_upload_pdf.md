# ImageUpload的PDF缩略图破图
苏住房G通用 ImageUpload 组件在 picture-card 模式把 PDF 地址当 img.src，导致上传 PDF 后缩略图破图、预览异常。

## 问题根因
- 字段用通用 ImageUpload，内部 el-upload 的 picture-card 直接把文件 URL 塞进 <img src>，PDF 非可渲染图片必破图
- 与「附件扩展名不能用后端 fileType 字典码推断」同源但落点不同：本条是上传组件内部缩略图/预览，那条是详情页附件区展示分组

## 解决方案
- 组件级修复（所有用 ImageUpload 传 PDF 场景受益）：抽 getFileExtension(url) 先去查询串再取扩展名
- isImageFile(url) 判断是否在 imageType 白名单；getThumbnail(url) 图片走 resolveServerAssetUrl，否则返回 /assets/images/file.png 文件图标
- 预览分流：PDF 用新窗口打开，不走 v-viewer/el-image 图片预览器；详情页查看态已区分无需改

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：064.md 会话 b316e20e「项目经理：劳动合同上传PDF时为破图」
- 涉及文件：components/ImageUpload/index.vue、company/staffManagement/components/detail.vue、institution/personnel/detail.vue
- 所属项目：苏住房G；来源会话ID：b316e20e-0ccc-42dd-a146-455063df0ac0；代码基线：b8ae114

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "image_upload_pdf",
  "source_extraction_id": "b3536856883b46aa95bcd23a6b8147f5",
  "version": 1,
  "memory_type": "entities"
}
-->
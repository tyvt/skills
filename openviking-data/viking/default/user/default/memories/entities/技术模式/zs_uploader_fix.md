# ZsUploader多选图片只显示一张修复
i淮安H5 的 ZsUploader 组件原只上传 tempFiles[0]，修复后遍历全部图片并行上传。

## 问题根因
- 选择图片后 handleUpload 只处理 tempFiles[0]，一次性多选时 uni-file-picker 将所有图片放 tempFiles 数组，原逻辑只上传第一张导致界面只显示 1 张且计数 1/9

## 修复方案
- 遍历本次选中全部图片并用 Promise.all 并行上传
- 按 limit 限制可上传数量（最多 9 张）
- 逐个校验单张大小（默认不超过 2MB）
- 全部成功后一次性更新列表和 form.photo

## 验证与归属
- 验证证据：extracted source=cursor project=i淮安H5
- 验证：在「我要报修」一次性选多张图片应显示多张并正确计数（如 3/9）
- 涉及文件：src/components/ZsUploader/ZsUploader.vue、src/pages_owner/repair/submit.vue、src/api/file.js、src/api/index.js、src/components/ImageUploader/ImageUploader.vue、src/pages/index/my.vue
- 所属项目：i淮安H5；来源会话：8ea610f8-3799-4753-8f73-41ed8bb06b46；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_uploader_fix",
  "source_extraction_id": "39b0dbebf07c42e1b9eae62b778a900a",
  "version": 1,
  "memory_type": "entities"
}
-->
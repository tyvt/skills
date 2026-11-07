# ZsUploader多选仅传首张致图片仅显一张
i淮安H5 的 `ZsUploader.vue` 的 `handleUpload` 仅处理 `tempFiles[0]`，导致多选图片仅上传并显示首张。

## 问题根因
- `ZsUploader.vue` 的 `handleUpload` 仅处理 `uni-file-picker` 的 `tempFiles[0]`
- 多选图片仅上传并显示首张

## 解决方案
- 遍历 `tempFiles` 全部图片
- 依 `limit` 限数、校验单张大小后通过 `Promise.all` 并行上传
- 成功后统一更新列表及 `form.photo`

## 验证与归属
- 验证证据：extracted source=cursor project=i淮安H5
- 验证证据：src=cursor session=8ea610f8-3799-4753-8f73-41ed8bb06b46
- 涉及文件：d:/repository/i淮安H5/src/pages_owner/repair/submit.vue、d:/repository/i淮安H5/src/components/ZsUploader/ZsUploader.vue、d:/repository/i淮安H5/src/api/file.js、d:/repository/i淮安H5/src/api/index.js、d:/repository/i淮安H5/src/components/ImageUploader/ImageUploader.vue、d:/repository/i淮安H5/src/pages/index/my.vue
- 所属项目：i淮安H5；来源会话：8ea610f8-3799-4753-8f73-41ed8bb06b46；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_uploader_first",
  "source_extraction_id": "e023549316364071812dce1a0061fc5f",
  "version": 1,
  "memory_type": "entities"
}
-->
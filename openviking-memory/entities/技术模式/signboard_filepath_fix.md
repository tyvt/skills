# signboard_filepath_fix
H5 端 SignBoard.vue 上传失败因把 File 对象塞进 uni.uploadFile 的 files 结构，改为直接传 filePath 修复。

## 问题根因
- src/api/file.ts 薄封装逻辑正确，仅把 /file/file/upload 转交 http.file
- SignBoard.vue 之前把 File 对象塞进 uni.uploadFile 的 files 结构，导致 Request Payload 为 file: [object Object]，后端收不到二进制从而 502

## 解决方案
- H5 上传参数改为直接传 filePath（canvasToTempFilePath 在 H5 返回 base64，直接给 filePath，避免塞 File 对象进 files）

## 涉及文件
- src/api/file.ts
- src/pages/components/SignBoard.vue

## 验证与归属
- 验证证据：extracted source=cursor project=H5
- 来源会话ID：c76f4349-6ce7-4c32-afeb-fa8a10bb8c00
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "signboard_filepath_fix",
  "source_extraction_id": "f465183229974b809c45bcccc793f620",
  "version": 1,
  "memory_type": "entities"
}
-->
# SignBoard塞File入files致上传失败
src/api/file.ts 薄封装逻辑正确，失败根因在 SignBoard.vue 将 File 对象塞入 uni.uploadFile 的 files 致后端收不到二进制返回 502。

## 问题根因
- src/api/file.ts 薄封装逻辑正确
- SignBoard.vue 将 File 对象塞入 uni.uploadFile 的 files 致后端收不到二进制返回 502

## 解决方案
- H5 端 canvasToTempFilePath 返回 base64，直接传 filePath 避免封装 File 对象

## 涉及文件
- src/api/file.ts
- SignBoard.vue

## 验证与归属
- 所属项目：H5
- 验证证据：extracted source=cursor project=H5
- 验证证据：src=H5/002.md
- 来源会话ID：c76f4349-6ce7-4c32-afeb-fa8a10bb8c00
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "SignBoard塞File入files致上传失败",
  "source_extraction_id": "d3a37d7a74404efd9cb7a275d22e9e8d",
  "version": 1,
  "memory_type": "entities"
}
-->
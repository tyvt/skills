---
audit_status: invalid
last_checked: 2026-11-27T14:12:37+08:00
verdict_note: 苏住房C ImageUploader.vue 仅有 uni.chooseFile(type=image,video)，记忆所称「images 用 uni.chooseImage、video 用 uni.chooseMedia」按平台分流逻辑均 MISS，描述与现状不符。
---
# uni.chooseFile unsupported in mini-program causes upload error
ImageUploader.vue called uni.chooseFile directly, unsupported in WeChat mini-program, causing a TypeError on the pages_owner/house/owner/register upload page.

## Problem
- ImageUploader.vue used uni.chooseFile, unsupported in WeChat mini-program
- TypeError occurred during upload on pages_owner/house/owner/register

## Solution
- Select API by platform: H5 uses uni.chooseFile; images use uni.chooseImage; video uses uni.chooseMedia
- Extracted uploadSelectedFile to handle temp paths without extensions

## Verification
- Verification: src=苏住房C/069.md
- Files: ImageUploader.vue, register.vue, file.js, api/index.js, utils/index.js, ZsUploader.vue
- Source session: f62dbdc4-5a71-4b38-86cc-ade4a540eb59

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：f62dbdc4-5a71-4b38-86cc-ade4a540eb59

<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "choosefile_mini_error",
  "source_extraction_id": "6a5f40753ef0432f99d9c80a416f56e7",
  "version": 1,
  "memory_type": "entities"
}
-->
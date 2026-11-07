# el-upload :limit=1 再选文件替换须走 on-exceed
上传组件设 :limit="1" 后再次选文件走 on-exceed 而非 on-change，替换逻辑必须挂在 on-exceed 上。

## 问题根因
- Element UI 在文件数已达 limit 时再选文件走 on-exceed 回调，根本不会进入 on-change
- 挂在 on-change 上的替换/去重逻辑永远收不到新文件，这是 limit 生效后的必然行为而非组件 bug

## 解决方案
- 新增 handleExceed(files)：取 files[0]，先做与 on-change 相同的 validateFile 校验
- 然后 this.$refs.upload.clearFiles() 清空组件内部列表并重置 fileList/localFiles
- 最后手动调用 this.$refs.upload.handleStart(file) 把新文件重新加入上传流程（handleStart 是 el-upload 实例方法，非公开 API 但稳定）
- 凡「限 1 个文件 + 重新选择即替换」需求都套此模式，不要试图在 on-change 里补救

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：会话 3b0f6cd2 结论明确「设 :limit=1 后再次选择走 on-exceed，不进入 on-change」，给出 handleExceed{ clearFiles + handleStart } 代码
- 涉及文件：zhi2-web-admin/src/components/FileUpload/index.vue、src/views/property/spFeeBill/components/import.vue、importUploadDialog.vue、src/components/ImageUpload/index.vue、src/components/zs-import/zs-import.vue、src/components/AnnexUpload/index.vue、src/views/benefit/components/AnnexUploadDialog/index.vue、src/views/property/allotNotice/detail.vue
- 所属项目：产品2.0
- 来源会话ID：3b0f6cd2-34d8-446f-830d-2c1d4d5eda2f
- 代码基线：94b86fa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "elupload_exceed_pattern",
  "source_extraction_id": "2618dad3089247029330eb677f274518",
  "version": 2,
  "memory_type": "entities"
}
-->
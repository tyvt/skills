# 单文件上传超限替换修复
产品2.0 项目修复设为只能传单个文件后，再次选择文件未替换旧文件的问题。

## 问题原因
- 设置 :limit="1" 后再次选择文件走 on-exceed 而非 on-change，原替换逻辑不执行

## 修复方式
- 新增 handleExceed：已有1个文件再上传时，先清空旧文件再用 handleStart 添加新文件完成替换
- import.vue 与 importUploadDialog.vue 同步修改

## 涉及文件与来源
- 文件：property/spFeeBill/components/import.vue、importUploadDialog.vue
- 所属项目：产品2.0；来源会话：3b0f6cd2-34d8-446f-830d-2c1d4d5eda2f

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "single_upload_fix",
  "source_extraction_id": "ffd3dd5456804c4ea536ebe90a7ba6e5",
  "version": 1,
  "memory_type": "entities"
}
-->

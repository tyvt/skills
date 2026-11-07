# 巡检步骤图片校验误拦修复
泰兴小程序新增巡检步骤时图片已上传却被校验「未上传成功」的误拦逻辑已移除，与工单完成弹窗等页面逻辑对齐。

## 之前逻辑
- 界面有图片（`stepFormImages` 不为空）但取不到服务端持久化地址（`rawUrl` / `fileID` 仍是 `wxfile://` 临时路径）时，提示「有图片未上传成功，请删除后重新上传」。
- 该判断过激进，上传状态同步稍有偏差即误拦。

## 现在逻辑
- 仅保留步骤名称必填、说明按必填规则校验。
- 图片仅在规则要求必填（`isPicture === '1'`）且完全没图时，提示「请上传巡检图片」。
- 保存时直接取 `stepFormImages.map(el => el.rawUrl || el.fileID || el.url).filter(Boolean).join(',')`，不再做临时路径拦截。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序。
- 涉及文件：`src/staff/pages_facility/record/add.vue`、`src/staff/components/ZsUploader/ZsUploader.vue`、`src/components/ZsDialog/ZsDialog.vue`。
- 来源会话ID：1cc3bd97-be24-4f8d-abe0-a7fa7f804986
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_image_validation_fix",
  "source_extraction_id": "d0b95a1ac762463e87faf215f6601357",
  "version": 1,
  "memory_type": "entities"
}
-->
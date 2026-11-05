# FormManual 身份证上传图标与 ZsUploader 尺寸修复
苏住房C 实名认证人工审核页修复身份证上传自定义图标缺失问题，并调整 ZsUploader 尺寸。

## 修复要点
- `src/pages_my/verification/FormManual.vue`：移除身份证上传自定义 `#icon` 插槽（原引用不存在的 `camera.png`），改用 `ZsUploader` 默认白色「+」图标；删除无用 `icon-uploader` 样式
- `src/components/ZsUploader/ZsUploader.vue`：`middle` 尺寸高度由 `110` 调整为 `120`，避免图标与文案被挤压

## 验证
- `npm run build` 通过，产物在 `../dist`
- 微信开发者工具导入 `dist`，进入 `FormManual?local=true`，身份证正反面上传框显示蓝圈+白色「+」+提示文字

## 涉及文件
- `src/pages_my/verification/FormManual.vue`
- `src/components/ZsUploader/ZsUploader.vue`
- `src/pages_my/verification/FormNonLocal.vue`
- `src/pages_my/verification/FormLocal.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：5e291751-65be-4f72-bf6c-bb3eed7c5ba8
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "formmanual_uploader",
  "source_extraction_id": "ac50ecf9f90845419e67ae4bb989c614",
  "version": 1,
  "memory_type": "entities"
}
-->
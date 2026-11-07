# 分包日期组件vendor路径修正
苏住房C小程序分包页面使用ZsDatePicker依赖uni-datetime-picker，构建后require指向不存在的分包vendor.js。

## 问题根因
- `pages_main/announcement/index.vue`使用`ZsDatePicker`→`uni-datetime-picker`
- 构建后组件复制到分包但require仍指向`pages_main/common/vendor.js`（不存在）
- 实际vendor.js在主包`dist/common/vendor.js`
- `relocate-datetime-picker.mjs`缺少vendor路径修正，`npm run dev`不执行后处理脚本

## 已做修复
- `scripts/relocate-datetime-picker.mjs`新增`patchVendorRequiresInDir`修正为主包`common/vendor.js`
- `scripts/relocate-z-paging.mjs`补充`dist/dev/mp-weixin`相关修正

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：283d2149-aad6-4b95-83d3-698be7a1f675

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "datetime_picker_vendor_fix",
  "source_extraction_id": "9b70ab6d8b214640a33a8865f462425d",
  "version": 1,
  "memory_type": "entities"
}
-->
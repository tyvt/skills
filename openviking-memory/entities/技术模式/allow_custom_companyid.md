# 手输无 companyId 被清空致表单校验失败
园区物管2.0 中 allow-custom 手输企业名时，因 watch 监听逻辑不当清空 companyId，导致 el-form required 校验恒失败。

## 问题根因
- watch 监听 selectedCompany 时，只要无 companyId 就清空 form.companyName 与 form.companyId。
- allow-custom 手输仅含 companyName（无 companyId），被误清空，致 el-form-item 校验的 form.companyName 恒为空。

## 解决方案
- 调整监听逻辑：空对象时清空双字段；有 companyId 时正常写入。
- allow-custom 手输仅含 companyName 时，写 form.companyName 且将 form.companyId 置 undefined，以满足 required 校验。

## 涉及信息
- 涉及文件：zhi2-web-admin/src/components/zs-select/zs-like-select.vue、src/views/maintenance/depositNotice/company/components/AddDialog.vue
- 所属项目：园区物管2.0；来源会话：3212c3b1-6f35-4233-95e1-8433cc34e122；代码基线：041.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "allow_custom_companyid",
  "source_extraction_id": "07a3250ce4124e9d9656ace09511a2c2",
  "version": 1,
  "memory_type": "entities"
}
-->
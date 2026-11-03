- 修复 Vue 模板重复问题时，采用栈解析为主、正则为辅的幂等修复，避免正则重复执行产生振荡（问题数 61→153）。
- 配套 scripts/scan-vue-template.mjs 扫描及 npm 脚本 scan/fix/verify:vue-template 进行校验。

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "Vue模板修复方式",
  "source_extraction_id": "44f7515355854140bc059576d630812f",
  "version": 1,
  "memory_type": "preferences"
}
-->
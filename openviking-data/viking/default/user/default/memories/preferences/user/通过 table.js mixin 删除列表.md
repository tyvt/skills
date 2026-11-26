- 列表页面中的删除逻辑应委托给 mixin table.js，以消除冗余的自定义请求。
- 在 versionManagement/index.vue 和 template/index.vue 中，保持 deleteType: 'v2'，移除 deleteParamKey 和 deleteRequest；mixin table.js 自动发送 POST /delete。
- 涉及文件: contractRequest.js, versionManagement/index.vue, template/index.vue, listMixins.js, table.js, versionManagement/detail.vue, template/detail.vue, contractMainInfo/index.vue. 验证证据: 苏州市房地产监测V3-rest/003.md.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 通过 table.js mixin 删除列表",
  "source_extraction_id": "772b51dcf2dd4e5b954bbf2076058ae6",
  "version": 1,
  "memory_type": "preferences"
}
-->

# getDetail 必需参数校验修复
苏州市房地产监测V3 修复 `[getDetail] 缺少接口必需参数，已跳过请求` 问题。

## 改动说明
- `zhi2-web-admin/src/mixins/form.js` 的 `validateDetailRequiredParams()` 不再强制合并 `primaryKey` 和 id，只校验页面声明的必需参数
- 普通详情页仍走默认 `getDetailRequiredParams()`（含 `primaryKey` 和 id），行为不变
- `platformConfig/detail.vue` 新增 `getDetailParams()` 请求体为空对象，与 getInfo 无需 id 约定一致

## 涉及文件
- `zhi2-web-admin/src/mixins/form.js`
- `zhi2-web-admin/src/views/system/platformConfig/detail.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话ID：a93895cc-33d7-4c71-899b-f31458cbb86c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_getdetail_param_fix",
  "source_extraction_id": "e053260580a2474bb0e49eda780f9845",
  "version": 1,
  "memory_type": "entities"
}
-->
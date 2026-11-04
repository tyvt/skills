# created 中的自动查询因空参数导致后端弹窗
`src/mixins/table.js` 的 `init()` 在 `created` 中无条件调用 `getList()`，发送了被后端拦截的空请求。

## 问题根因
- `table.js` 的 `init()` 无条件调用 `getList()`，产生空请求。
- 后端阻止并显示错误弹窗。

## 已应用的解决方案
- 添加标志 `autoLoadList`（默认 `true`）。
- `src/views/property/appOwnerAudit/index.vue` 定义 `false` 以跳过自动查询。
- 重写 `handleQuery()` 以进行前端校验：姓名/证件号/手机号在请求前至少填写两项。

## 涉及的文件
- `src/mixins/table.js`
- `src/mixins/listMixins.js`
- `src/mixins/ListTemplate.js`
- `src/views/property/appOwnerAudit/index.vue`
- `src/views/property/appUserAudit/index.vue`
- `src/views/property/ctUserIdentityApply/index.vue`

## 验证与归属
- 所属项目: 惠山二期G
- 验证证据: `src=惠山二期G/011.md`
- 来源会话: `333318b1-4f2d-4f92-b2b0-f97f02e88d67`
- 基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_autoload_switch",
  "source_extraction_id": "fdaa115ec96f49938b5955e11ae03585",
  "version": 1,
  "memory_type": "entities"
}
-->
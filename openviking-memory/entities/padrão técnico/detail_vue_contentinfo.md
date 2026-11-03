# detail.vue补齐contentInfo数据
`zhi2-web-admin/src/views/property/ctUserIdentityApply/detail.vue` 修正了 `contentInfo3` 错放审核信息且缺失证件展示的问题。

## 问题根因
- 原 `contentInfo3` 错放审核信息且缺失证件展示

## 解决方案
- 调整 `contentInfo3` 展示 `certificatePhoto`
- 新增 `contentInfo4` 展示 `identityPhoto`（`type: 'image'`）
- 新增 `contentInfo5` 承接审核信息
- 对齐模板 `:data` 绑定

## 验证与归属
- 验证证据：extracted source=cursor session=453ca103-a90b-469b-8674-257148a1b956
- 涉及文件：zhi2-web-admin/src/views/property/ctUserIdentityApply/detail.vue
- 来源会话ID：453ca103-a90b-469b-8674-257148a1b956
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "detail_vue_contentinfo",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 2,
  "memory_type": "entities"
}
-->
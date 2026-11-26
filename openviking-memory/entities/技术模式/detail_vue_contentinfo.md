---
audit_status: valid
last_checked: 2026-11-26T15:42:29+08:00
verdict_note: 产品2.0源码：ctUserIdentityApply/detail.vue中certificatePhoto(107-108)、identityPhoto(117-118)均在，contentInfo3存在；与补齐证件展示、新增contentInfo4/5描述一致。
---
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
  "category": "技术模式",
  "name": "detail_vue_contentinfo",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 2,
  "memory_type": "entities"
}
-->
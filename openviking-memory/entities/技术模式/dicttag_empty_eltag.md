# DictTag 空/非法 type 传入 ElTag 导致校验告警
产品2.0 中 DictTag 在 colorMap 模式或字典项无 listClass 时会把空字符串/非法值传给 Element Plus 的 ElTag，触发 prop 校验告警，已改为传 undefined。

## 问题根因
- DictTag 在 colorMap 模式下将空字符串 `""` 传给 Element Plus `ElTag` 的 `type` 属性
- ElTag 的 `type` 合法值仅限 primary/success/info/warning/danger 或不传；传空串会触发 Vue 的 prop 校验失败告警
- DictTag 将字典 listClass（如 "default" 或 "Default"）直接传给 ElTag 的 type，Element Plus 自定义校验拒绝该枚举
- DictDataTable 中原本存在将 primary 映射为 `""` 的逻辑（primary 本就是合法值），加剧该问题

## 解决方案
- 在 `zhi2-web-admin/src/components/dict-tag/dict-tag.vue`：colorMap 开启时改为不传 type（传 undefined）；字典项无 listClass 时返回 undefined 而非 `""`
- 在 getTagType() 中：default 及空值返回 undefined；其余对 listClass 调用 trim() 与 toLowerCase() 规范化后再判断类型
- 去除 `zhi2-web-admin/src/views/system/dict/components/DictDataTable.vue` 中把 primary 映射为 `""` 的逻辑（primary 本身是合法值）

## 验证与归属
- 验证证据：src=2-0/017.md、src=2-0/019.md；会话 d39becce-af94-4451-b0d2-6ffd7cf94261（colorMap 空串、DictDataTable primary 映射）；会话 19b58a9e-4df5-44f1-8286-0667d6776a04（maintenanceProject 页 DictTag 传 listClass=default 致 ElTag type 校验失败）
- 涉及文件：zhi2-web-admin/src/components/dict-tag/dict-tag.vue、zhi2-web-admin/src/views/system/dict/components/DictDataTable.vue
- 所属项目：2-0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dicttag_empty_eltag",
  "source_extraction_id": "818f80f7eff34a4caf91327fe1f5fd03",
  "version": 2,
  "memory_type": "entities"
}
-->
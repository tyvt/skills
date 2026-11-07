# zs-popup缺失show参数致弹窗无法打开
zs-popup 组件未实现 show 参数，仅支持默认 v-model，导致 decision/form.vue 中 v-model:show 赋值后弹窗未触发 open()。

## 问题根因
- zs-popup 组件仅支持默认 v-model（modelValue），未实现 show 参数
- src/pages_owner/decision/form.vue 中使用 v-model:show="showSzfPopup" 赋值后弹窗未触发 open()

## 解决方案
- 在 src/components/zs-popup/zs-popup.vue 新增 show prop
- 兼容 v-model（modelValue / update:modelValue）与 v-model:show（show / update:show）两种用法
- 修复后 src/pages_owner/decision/form.vue 中 decisionResponse(...).then(... => { showSzfPopup.value = true }) 将正确触发弹窗打开

## 验证与归属
- 验证证据：extracted source=cursor project=H5 session=d82bff24-0e41-424c-9a97-545984d9ac69
- 涉及文件：src/pages_owner/decision/form.vue、src/components/zs-popup/zs-popup.vue
- 来源会话：d82bff24-0e41-424c-9a97-545984d9ac69；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_popup_show",
  "source_extraction_id": "7146bf7d99e4433bb774d137ebb2fa4f",
  "version": 2,
  "memory_type": "entities"
}
-->
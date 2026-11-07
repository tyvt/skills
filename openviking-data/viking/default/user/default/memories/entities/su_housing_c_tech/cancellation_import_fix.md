# 注销原因列表不显示修复
苏住房C 小程序「我的→账号安全→注销」页因缺失 `getDict` 导入导致注销原因不显示，已修复。

## 问题原因
- `cancellationReason.vue` 在 `initDict()` 调用 `getDict('cancel_reason')` 但未导入
- 页面 `onShow` 抛出 `ReferenceError: getDict is not defined`
- `cancelReasonList` 为空数组，`ZsRadio` 无选项，只显示标题和提交按钮

## 修复内容
- 补充缺失导入：`import { getDict } from '@/api/common'`
- 重新进入「账户注销 → 请选择注销原因」页面后注销原因列表正常显示
- 若仍为空需检查后端字典类型 `cancel_reason` 是否配置数据

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_my/setting/cancellationReason.vue`、`pages_my/setting/cancellationForm.vue`、`api/security.js`、`api/common.js`、`components/ZsRadio/ZsRadio.vue`
- 来源会话ID：1a7c73a2-9bb1-429e-a2b6-09950e71add3
- 来源会话ID：8fea7fec-d5ff-49f3-8b5d-6fe42f3a7694
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "cancellation_import_fix",
  "source_extraction_id": "b51dc9b7992c496996bab1a49b609341",
  "version": 2,
  "memory_type": "entities"
}
-->
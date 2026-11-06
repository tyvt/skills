# ZsInput 入参 size 归一化修复
产品2.0 中 `zhi2-web-admin/src/components/zs-input/zs-input.vue` 对传给 Element Plus `ElInput` 的 `size` 做归一化，避免非法值触发 Vue prop 警告。

## 问题根因
- Element Plus 的 `ElInput` 的 `size` 仅允许 `large | default | small`（及空字符串）。
- 项目历史代码可能传入 `mini/medium` 等非法值，导致 `main.js:194 [Vue warn]: Invalid prop "size"`。

## 解决方案
- 在 `zs-input.vue` 统一归一化：`medium → default`、`mini → small`、其它非法值 → `default`。
- 保证全站使用 `ZsInput`（含登录页）传给 `ElInput` 的 `size` 永远合法。
- 后续可评估对 `input-number` 的 size 是否同样归一化（非本次必需）。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：`zhi2-web-admin/src/components/zs-input/zs-input.vue`、`main.js`
- 所属项目：2-0；来源会话ID：a5963bb7-204d-42a4-88ac-9fc16822e761；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_input_size_fix",
  "source_extraction_id": "0b32d9e61ff4450e8b51bba7f0ece5cc",
  "version": 1,
  "memory_type": "entities"
}
-->
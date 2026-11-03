- `e2e/fixtures/supervision-bank-helpers.js` 中 `clickSubTableAdd` 经「网点列表」折叠区块 `getByRole('button', { name: '新增' })` 定位
- `pickUnionBankInDialog` 增加 `clickAndMaybeWaitUnionBankList`（未触发 `/system/unionBank/page` 最多等 10s）
- 点 `.el-radio__label`（`force: true`），空表才搜索，等 loading 消失后断言弹窗关闭

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "银行弹窗E2E测试",
  "source_extraction_id": "cc2294dc61514faebe82642a30e5fb6e",
  "version": 1,
  "memory_type": "preferences"
}
-->
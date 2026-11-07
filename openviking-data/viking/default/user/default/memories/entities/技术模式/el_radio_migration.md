# Element Plus radio label 迁移为 value
zhi2-web-admin 已全量将 el-radio / el-radio-button 的选中值写法从 label 改为 value。

## 处理结果
- `zhi2-web-admin/src` 内所有 `<el-radio>` / `<el-radio-button>` 把 `label` 作为选中值改为 `value`
- 全项目搜索 `<el-radio...label` / `<el-radio-button...label` 结果为 0，Element Plus 弃用警告不再触发
- 刷新（必要时硬刷新）页面即可验证

## 备注
- 终端 `util._extend` 的 DeprecationWarning 属 Node 提示，与 radio 警告非同一类问题

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：error.ts、index.ts（Element Plus 源码参考）
- 所属项目：2-0；来源会话：f04aaad0-6d0c-450e-807c-fdf4dbf5a214；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_radio_migration",
  "source_extraction_id": "8a9af5502aec47c3be80b7a1a22b0f05",
  "version": 1,
  "memory_type": "entities"
}
-->
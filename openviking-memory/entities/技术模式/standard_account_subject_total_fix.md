# standard_account_subject_total_fix
产品2.0 修复标准账套详情页财务科目表格底部「共 XX 条记录」缺失的问题。

## 问题原因
- 表格调用 `treeList` 接口返回树形数据无 `total` 字段，`this.total = response.total || 0` 置为 0。
- `zs-pagination` 使用 `v-show="total > 0"`，导致分页区域整块隐藏，下间距消失。

## 修复方案
- `financialSubjectsTable.vue`：当接口未返回 `total` 时，递归统计树形数据节点数作为总数（`response.total ?? this.countTreeNodes(...)`）。

## 验证与归属
- 涉及文件：`financialSubjectsTable.vue`、`zs-pagination.vue`、`pubFinanceAccount/index.vue`
- 所属项目：产品2.0；来源会话：ef0140d8-d676-4240-a00f-31f065725288；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "standard_account_subject_total_fix",
  "source_extraction_id": "73aa35c0f24443eb98ea54b97a326597",
  "version": 1,
  "memory_type": "entities"
}
-->
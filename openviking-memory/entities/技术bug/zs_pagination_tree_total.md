
# zs-pagination 树形无 total 时统计条被隐藏
产品2.0 标准账套详情页财务科目表格接 treeList 树形接口（无 total 字段），导致 zs-pagination「共 XX 条记录」整块被隐藏。

## 问题现象
- treeList 返回 data 树但无 total，代码 `this.total = response.total || 0` 把总数写成 0
- zs-pagination 用 v-show="total > 0" 控制显隐，total 为 0 时整个底部（含统计文案和间距）被隐藏
- 看起来像「缺了共 XX 条记录」而非数据问题

## 根因
- 树形接口不返回 total，前端兜底写 0 触发分页组件隐藏逻辑

## 解决方案
- 接口未返回 total 时不要写 0，用递归统计树形节点数兜底：`this.total = response.total ?? this.countTreeNodes(this.list)`
- countTreeNodes 递归累加 children
- 以后树形数据接 zs-pagination 都要处理「无 total」形态，否则统计条被静默隐藏

## 涉及与来源
- 涉及文件：financialSubjectsTable.vue、zs-pagination.vue；所属项目：产品2.0
- 来源会话：ef0140d8；代码基线：49a7aa3


<!-- MEMORY_FIELDS
{
  "category": "技术Bug",
  "name": "zs_pagination_tree_total",
  "source_extraction_id": "b2ef880cfdd147c9bc8ecd0a19ff7f54",
  "version": 1,
  "memory_type": "entities"
}
-->
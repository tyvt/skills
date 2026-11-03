# 详情页查看态表格只读双判模式
苏住房G物业费申报详情页需去除showEdit=false，子表readOnly同时判formMode与bizState，仅编辑态+草稿可操作。

## 背景与动机
- 原detail.vue用:showEdit="false"关掉编辑入口，永远进不了编辑态
- 子表readOnly只判bizState，草稿查看态被判可编辑，露出操作列与导入按钮

## 解法要点
- 去掉:showEdit="false"，用operation-btn-group默认行为：查看模式且草稿态顶栏自动出现「编辑」
- 子表只读条件改为:readOnly="formMode == 'view' || form.bizState != 0"
- 验证以刷新后详情页为准，覆盖查看草稿、点编辑后、已提交三态

## 验证与归属
- 涉及文件：property/feeDeclare2/detail.vue、components/feeBindScopeTable.vue
- 所属项目：苏住房G；来源会话ID：2b6910b1-af76-49c6-87c1-e6cbab4a1b46；代码基线：e590ffa
- 与已知1077条差异：补showEdit=false杀入口根因与bizState==0才可编辑表达式

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_readonly_dual",
  "source_extraction_id": "6e75b43cde7c4ebca6d3d7d4b85aa3cc",
  "version": 1,
  "memory_type": "entities"
}
-->
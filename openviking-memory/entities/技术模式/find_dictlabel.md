# 计算属性 find 无果直取 dictLabel 报错
bizStateName 与 stateName 计算属性中 Array.prototype.find() 未匹配返回 undefined 后直取 .dictLabel 报错。

## 问题根因
- 计算属性中 Array.prototype.find() 未匹配返回 undefined 后直取 .dictLabel 报错
- 因 dictValue 与 form.bizState 类型不一致或字典项缺失导致 find 无果

## 解决方案
- 先赋值 find 结果到变量，再使用可选链 row?.dictLabel 安全取值
- 比较改用 == 宽松相等或保留空判断，避免类型不一致致匹配失败

## 验证与归属
- 验证证据：src=2-0/020.md
- 涉及文件：src/views/maintenance/depositNotice/company/components/detail.vue
- 所属项目：2-0；来源会话ID：4642db27-d773-418d-b3f6-c2109f85a0e4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "find_dictlabel",
  "source_extraction_id": "07d76519daf74721861ef48c23fa6ca0",
  "version": 1,
  "memory_type": "entities"
}
-->
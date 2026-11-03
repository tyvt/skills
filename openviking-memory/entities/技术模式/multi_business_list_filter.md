# 复用组件多业务类型默认筛选隔离
苏住房G 物业合同与前期物业合同列表共用组件靠 BUSINESS_TYPE 分流时，默认筛选与说明条仅允许作用在备案(ADD)分支。

## 规则
- 默认 bizState='2' 与警示说明条写成 `businessType === BUSINESS_TYPE.ADD` 分支，其余分支保持原列与原搜索项
- 重置搜索须在 reset 回调里重新赋 bizState='2'，否则 resetFields 清空后列表变成全状态被误认为 bug
- 布尔字段接字典筛选时提交前做 Boolean→'Y'/'N' 映射，否则 sys_yes_no 字典筛不出数据
- 接口未返回新字段时新列允许为空，显式说明联调缺口，不用「无」/『-』掩盖

## 与已知清单差异
- 不同于第930条 listMixins 搜索缓存残留（缓存层问题）
- 不同于第857/880条变更单切 busCode/changeBizState，本条聚焦组件复用分支隔离默认查询条件及 reset 恢复默认值

## 验证与归属
- 涉及文件：property/propertyContract/components/index.vue
- 所属项目：苏住房G；来源会话：1a769c30-389d-418a-9a0f-a1148109a5d9；代码基线：2a3ef8a
- 用户明确「不需要你改后端」，仅改一个文件实现分支隔离

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "multi_business_list_filter",
  "source_extraction_id": "8ff983f008154129a5b3d61fe0701d5b",
  "version": 1,
  "memory_type": "entities"
}
-->
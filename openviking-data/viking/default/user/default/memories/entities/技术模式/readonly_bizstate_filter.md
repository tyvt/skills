# 只读列表页业务状态筛选与查询分离
苏住房G只读/已备案视图列表页隐藏「业务状态」筛选项，但查询仍固定传bizState='2'。
## 现象与根因
- 广告位等列表打开时「业务状态」默认选中「审核中」，列表却是已备案数据
- 路由isShow标识只读视图，leaseContractMixins的getQueryParams()固定传bizState='2'（已备案）
- 搜索区下拉默认值来自另一套字典默认项，两者分开维护导致视觉矛盾
## 解法
- 在只读列表页按isShow条件把「业务状态」从搜索区formItems过滤掉，不改getQueryParams默认值
- 查询逻辑不变仍只出已备案数据，表格「业务状态」列保留
- 可编辑租赁合同备案管理页该筛选项不受影响
## 验证与归属
- 通用原则：筛选项默认值不代表真实查询条件时，隐藏控件比改查询更安全
- 涉及文件：advSpaceLeaseApply/index.vue、assetLeaseApply/index.vue、resourcesLeaseContractFiling/index.vue、leaseContractMixins.js
- 所属项目：苏住房G；来源会话：1eb3d199-859d-4273-97af-9e57746818af；代码基线：f78f7e7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "readonly_bizstate_filter",
  "source_extraction_id": "dcd170cd1ed947ccac43a5f904fd01c7",
  "version": 1,
  "memory_type": "entities"
}
-->
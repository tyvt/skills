# 同名列表双接口分页分流
苏住房G 公共信息—物业管理区域信息列表因统一切 pageNew 导致每页设 10 条却只显示 1 条，需按高级筛选条件分流。

## 问题根因
- 为支持高级筛选，所有列表请求改 POST /property/complex/pageNew。
- pageNew 对普通查询分页不可靠：响应 pageSize=10、total 正常但 list 只回 1 条，前端不报错难排查。

## 解决方案
- 未用高级筛选时走 GET /property/complex/page（常规分页），仅当 conditionGroups/高级筛选条件非空才走 pageNew。
- 判定条件显式写在取数方法里，不靠「接口有就都调」顺手全切。
- 排查「总数对、行数少」先确认是否同一列表挂了两套分页接口，而非怀疑 pageSize 或 zs-pagination。

## 验证与归属
- 验证：会话 8bdf9717（基线 f78f7e7）用户报每页 10 条只显示 1 条；改回按场景分流。
- 涉及文件：publicQuery/complex/index.vue、mixins/listMixins.js、property/complex/index.vue；所属项目：苏住房G。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_dual_api",
  "source_extraction_id": "0636d5a52f5e4109813cca86a9966dbb",
  "version": 1,
  "memory_type": "entities"
}
-->
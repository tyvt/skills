# 苏住房G 高级筛选返回暂无数据问题
公共查询列表页用高级筛选查询后点查看再返回，条件摘要正常但表格暂无数据。

## 问题现象
- 物业服务企业查询等页：搜索后点查看进详情，再点返回，条件条显示原条件，表格却「暂无数据」
- UI 条件摘要与请求结果对不上，易误判接口没数据或缓存坏

## 根因
- 返回时列表页重建并立刻 getList()，operator_type 等字典未加载完
- sanitizeConditionGroups 在字典为空时把所有字段当固定运算符字段，把 IN/LE/GE 统一改写 EQ，请求参数错致零结果
- 筛选摘要渲染用缓存原始条件，故 UI 与结果不符

## 解决方案
- advancedQueryCore.js 两处改：字典未加载时勿视字段为固定运算符，保留 condition.operator 原值
- 固定运算符字段取默认值时也以 condition.operator 兜底
- 原则：摘要与实际请求参数来自不同数据源时，字典未就绪须降级「保留原条件」而非「按默认值兜底改写」
- 排查先比对条件摘要与实际 payload 运算符，而非先查分页或接口

## 验证与归属
- 验证会话 6373eaaa：用户报物业服务企业查询搜索后查看返回条件保存但显示暂无数据
- 涉及文件：zhi2-web-admin/src/components/zs-advanced-query/zs-advanced-query.vue、zhi2-web-admin/src/views/publicQuery/propertyCompany/index.vue
- 所属项目：苏住房G；代码基线：864b409

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "suzhufang_adv_filter_eq",
  "source_extraction_id": "5476d06cd4c6428c960d083c3f249c32",
  "version": 1,
  "memory_type": "entities"
}
-->
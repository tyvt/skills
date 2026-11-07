# 高级查询操作符字典化
苏住房G 公共查询 zs-advanced-query 条件组的操作符须统一走 operator_type 字典取值，禁止页面本地定义。

## 背景与动机
- 用户明确要求「操作符字典 operator_type，只从字典取值，不要本地定义」
- 原页面本地定义 TEXT_OPERATORS / SELECT_OPERATORS / NUMBER_DATE_OPERATORS，与字典脱节

## 解决方案
- 筛选字段读 complex_field 字典，操作符读 operator_type 字典，删掉本地操作符常量，展示文案统一走字典 label
- zs-advanced-query 新增 operatorOptions 属性由页面传入，组件保持纯展示不自己拉字典
- 字段级可用操作符优先取 complex_field 的 remark 第 4 段，格式如 select:propertyType::EQ,LIKE
- 未配置时下拉类字段默认只有「等于」
- 对「一字段存多个类型组合值」的字段需允许 LIKE，并保留代码侧 EQ+LIKE 兜底，否则查不出组合值

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 落地前须确认后端 operator_type 字典已配置 EQ 与 LIKE，否则下拉空、查询失败无提示
- 验证证据：会话 7352b93f 用户明确操作符只从字典取值；改动 complexFieldConfig.js 与 zs-advanced-query.vue
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/index.vue、zhi2-web-admin/src/components/zs-advanced-query/complexFieldConfig.js
- 所属项目：苏住房G；来源会话ID：7352b93f-fe22-4f83-926d-29ade7bd05f8；代码基线：e590ffa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "advanced_query_operator",
  "source_extraction_id": "4c74f7a87e624832885083b5159980bf",
  "version": 1,
  "memory_type": "entities"
}
-->
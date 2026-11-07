# 高级筛选数值字段被getNumberDot四舍五入
zs-advanced-query 的 getNumberDot 整数字段白名单是唯一精度开关，误将计分字段列入会吞掉小数与区间取值。

## 问题根因
- 公共查询-物业服务企业查询高级筛选中「本年度信用计分」(creditScore) 输入 88.78 失焦变 89
- zs-advanced-query.vue 的 getNumberDot(field) 用整数字段白名单写死精度，名单内 dot=0 其余 dot=2
- creditScore 被错误放入整数名单，数值输入走 amount-input（zs-input + v-money）按 dot 四舍五入改写
- 该名单是组件级私有函数而非字段配置声明，易在 complexFieldConfig/companyReferFieldConfig 漏找

## 解决方案
- 将 creditScore 从整数名单移除，落回默认 dot=2：`['totalHouse','totalBuilding','managedComplexCount','managedEarlyComplexCount'].includes(field) ? 0 : 2`
- 修复只动这一处名单，不碰页面列配置与 advancedQueryCore/companyReferFieldConfig
- 新增计分/比率类筛选字段时先确认不在该名单内

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话 6a2e0220 定位 creditScore 在 getNumberDot 被设 dot=0，用户原话「这边不需要四舍五入」
- 涉及文件：zhi2-web-admin/src/components/zs-advanced-query/zs-advanced-query.vue、publicQuery/propertyCompany/index.vue、advancedQueryCore.js
- 所属项目：苏住房G；来源会话ID：6a2e0220-2bcf-4259-a427-8f31e71d3acc；代码基线：864b409

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "query_number_dot",
  "source_extraction_id": "d232d627a6c741e59b90b3a2003fb294",
  "version": 1,
  "memory_type": "entities"
}
-->
# 自动默认账户须沿协议账户依赖链串行查询
B端新增资金缴存时自动填充的缴存账户来自已终止协议对应账户，根因为查账户与查协议并行独立过滤各自状态。

## 问题根因
- fetchAccountAndAgreement将查账户和查协议设计成两个并行独立查询
- 账户只按bizState:'2'取第一条，完全不感知协议状态
- 协议虽过滤agreementState:'1'，但账户查询不引用协议结果，两边可能指向不同协议

## 解决方案
- 改为串行依赖：先查已生效协议，再按propertyProjectId、companyId反查账户，账户查询本身加agreementState:'1'过滤兜底
- B端无已生效协议或无可用账户时直接提示「当前物业管理区域暂无已生效的协议，无法新增缴存」并阻止打开弹窗
- G端选择账户弹窗同样补agreementState过滤；协议生效态等魔数值抽成常量（如EFFECTIVE_AGREEMENT_STATE='1'）放enums.js
- 通用套路：任何按主体自动默认关联对象逻辑须沿业务依赖链串行取数，并行独立过滤不够；后端分页不支持关联状态参数需推动后端支持

## 验证与归属
- 验证证据：会话9f380095 fetchAccountAndAgreement并行查询、账户bizState:'2'未关联协议状态，修复改components/index.vue串行+AddDialog.vue同步过滤
- 涉及文件：zhi2-web-admin/src/views/maintenance/guaranteeDeposit/components/index.vue、AddDialog.vue、enums.js
- 所属项目：产品2.0；来源会话：9f380095-1ae6-4b79-936e-82358c3999ad；代码基线：产品2.0 zhi2-web-admin

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_serial_dep",
  "source_extraction_id": "fb402dbbd77a4c29a09d2ea0a800eb3b",
  "version": 1,
  "memory_type": "entities"
}
-->
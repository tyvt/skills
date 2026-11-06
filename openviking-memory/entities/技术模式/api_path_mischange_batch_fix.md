# API四段路径误改批量修复
苏州市房地产监测V3 项目批量修复 V3 规范调整时误加的 /detail 或 /add 后缀。

## 修复规模
- 涉及 30 个 src/api 文件，共修复 57 处 API 四段路径误改
- 模块分布：presale 3文件13处、allocation/capital/jgyh 7文件14处、xmxx/lpgl 8文件13处、cyjg/exchange/flowable/benefit/property 9文件17处

## 统一规则
- 去掉非 CRUD 业务接口末尾误加的 /detail 或 /add
- 保留现有 module/entity 前缀与 body 参数不变

## 典型修复示例
- getVendeeListByContractNo/detail → getVendeeListByContractNo
- beProjectList/add → beProjectList（与 contractRequest.js 一致）
- queryBalanceAmount/detail → queryBalanceAmount（与 account.js 一致）
- openAccountRecord/detail → openAccountRecord

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：d2a25c11-5573-4bb1-8287-710071ae4f2f
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "api_path_mischange_batch_fix",
  "source_extraction_id": "1eb3332663a64041aab0610806717357",
  "version": 1,
  "memory_type": "entities"
}
-->
# API四段路径误改批量修复
苏州市房地产监测V3 修复 V3 规范批量调整时 57 处 API 四段路径末尾误加 /detail 或 /add 的问题。

## 修复范围
- 涉及 30 个 src/api 文件，共 57 处修复
- 模块分布：presale 3文件13处、allocation/capital/jgyh 7文件14处、xmxx/lpgl 8文件13处、cyjg/exchange/flowable/benefit/property 9文件17处

## 统一规则
- 去掉非 CRUD 业务接口末尾误加的 /detail 或 /add，保留现有 module/entity 前缀与 body 参数不变
- 典型示例：getVendeeListByContractNo/detail → getVendeeListByContractNo；beProjectList/add → beProjectList；queryBalanceAmount/detail → queryBalanceAmount；openAccountRecord/detail → openAccountRecord

## 涉及文件
- src/api/presale/contractMainInfo.js、src/api/finance/vendee.js、src/api/finance/account.js 等

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3
- 来源会话ID：d2a25c11-5573-4bb1-8287-710071ae4f2f
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "api_path_fix",
  "source_extraction_id": "a8b1c9ca411446d791592c528e1649bf",
  "version": 1,
  "memory_type": "entities"
}
-->
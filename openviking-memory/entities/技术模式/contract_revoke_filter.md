# 合同撤销列表合同编号筛选缺失
苏州市房地产监测V3 中合同撤销列表页原 `queryParams` 未含 `contractNo` 且无输入框，无法按合同编号过滤。

## 问题根因
- `contractRevoke/index.vue` 原 `queryParams` 未含 `contractNo` 字段
- `formItems` 无合同编号输入框，无法按合同编号过滤

## 修复方案
- 在 `queryParams` 增加 `contractNo: undefined`
- 在 `formItems` 首部添加 `model: 'contractNo'` 输入框
- 随 `POST /presale/contractRevoke/page` 提交，方式同 `contractMainInfo/index.vue`

## 涉及文件
- `src/views/commercialHousingSales/presale/contractRevoke/index.vue`
- `src/views/commercialHousingSales/presale/contractMainInfo/index.vue`

## 验证与归属
- 验证证据：source=cursor session=798aa1d4-5bc0-4714-9e92-a6a883f057a9
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_revoke_filter",
  "source_extraction_id": "4e404e041210485eb1873d1dfa867a1d",
  "version": 1,
  "memory_type": "entities"
}
-->
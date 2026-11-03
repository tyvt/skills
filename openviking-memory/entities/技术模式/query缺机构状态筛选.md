# query.vue缺机构信息与申请状态条件
`query.vue` 原先未提供机构信息与申请状态筛选，导致无法按机构与审批状态过滤数据。

## 问题根因
- `query.vue` 原先未提供机构信息（companyName）与申请状态（approvalFlag）筛选

## 修复方案
- `queryParams` 增加 `companyName` 与 `approvalFlag`
- `data` 声明 `approvalFlagOptions`
- `formItems` 在「项目名称」后插入输入框与下拉框
- `initDict()` 请求字典 `project_verification_approval_flag` 并赋值

## 备注
- 文件 L152/L156/L160/L213 的 lint 报错属历史遗留，非本次变更引入

## 关联信息
- 验证证据：src=G/002.md
- 涉及文件：query.vue
- 来源会话：9e5b2450-488c-48bb-8d72-b8bb3dc7367d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "query缺机构状态筛选",
  "source_extraction_id": "75f0358612c2410aac698945b39d18cb",
  "version": 1,
  "memory_type": "entities"
}
-->
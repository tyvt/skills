# 园区V0 acc模块代码检索结论
园区V0 仓库中检索 openAccBS 等字段无结果，并理清 acc 模块分页参数与相近业务实体。

## 检索结论
- openAccBS / openAccBs / open_acc_bs 在整个仓库不存在
- 「物业管理区域开户」未找到，最接近为「物业项目账户开户」/菜单「项目账户」
- acc 模块列表 API 分页参数统一为 pageNumber/countPerPage，不使用 pageNum/pageSize
- AccBankAccount 存在，对应承办银行专户（业务码 2501），非物业项目/区域开户

## 相近字段
- openAccountDeleteBS：业主开户切换项目时清子表，位于 AccOpeningApplyForm.java
- 涉及文件：acc_AccOpeningApplyAdd.js、UrlAndBtnRelationConfig2.js

## 归属
- 所属项目：园区V0；来源会话ID：161089c1-ddcd-4bb1-9706-c8f3b5f595d3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术笔记",
  "name": "acc_open_search",
  "source_extraction_id": "3b01b994d2274aec966ad5632121ebeb",
  "version": 1,
  "memory_type": "entities"
}
-->
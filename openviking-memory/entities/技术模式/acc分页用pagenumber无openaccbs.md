# acc分页用pageNumber无openAccBS
园区V0项目EstateManagement中acc模块的分页与开户处理技术事实。

## Description
- 仓库未检索到 `openAccBS` 及「物业管理区域开户」相关代码。
- acc模块使用 `openAccountDeleteBS`（位于 `AccOpeningApplyForm.java`）处理开户清子表。
- 列表API分页参数统一为 `pageNumber`/`countPerPage`。

## Relations
- `AccBankAccount` 对应承办银行专户（业务码2501）而非物业开户。
- 涉及文件包括 AccProjectAccountListController.java、AccBankAccountListController.java、acc_AccProjectAccountList.js 等（路径 d:/repository/园区V0/...）。

## Verification
- 来源会话ID：161089c1-ddcd-4bb1-9706-c8f3b5f595d3（cursor提取）。
- 代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "acc分页用pageNumber无openAccBS",
  "source_extraction_id": "11af91c3d7714d489fde0c63f7fb839f",
  "version": 1,
  "memory_type": "entities"
}
-->
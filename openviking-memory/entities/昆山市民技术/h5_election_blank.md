# H5选举页误调登录缺code致页面空白
昆山市民H5选举页因误调登录接口且内页跳转缺code导致页面空白的bug根因与修复记录。

## 问题根因
- `Participate.vue` 在 H5 环境调用 `loginWithWxCode()` 因无持久化 Token 且内页跳转无 `code` 失败
- 失败导致 `loadElectionDetail` 不执行、`showPage` 为 false，页面空白

## 修复方案
- H5 环境直接调用 `loadElectionDetail`，复用内存 Token，与 `votedetail.vue` 对齐
- 在 `wxLogin.js` 增加 URL 防御处理

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 验证证据：src=昆山市民/004.md
- 涉及文件：src/pages_election/election/options.vue、src/pages_election/election/Participate.vue、src/stores/election.js、src/api/modules/election.js、src/pages.json、src/utils/wxLogin.js、src/request/index.js、src/pages_vote/vote/votedetail.vue
- 所属项目：昆山市民；来源会话ID：efd7fd9b-1f86-49c6-8815-9bbd75f57fcb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "h5_election_blank",
  "source_extraction_id": "9755aff3db004e64a6a0cd48ad9d743b",
  "version": 1,
  "memory_type": "entities"
}
-->
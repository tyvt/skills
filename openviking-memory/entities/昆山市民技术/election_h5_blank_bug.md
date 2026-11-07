# 业委会选举 H5 参与页空白 Bug
昆山市民业委会选举在 H5 中点击参与决策、阅读选举须知后下一页空白，根因为 H5 误走登录逻辑。

## 问题根因
- `Participate.vue` 在 H5 中也调用 `loginWithWxCode()`，但 H5 不持久化 Token 且内页跳转 URL 不带 `code`
- `loginWithWxCode()` 因缺 code 失败，`loadElectionDetail` 不执行，`showPage` 一直为 `false`，页面只剩背景图
- `votedetail.vue` 在 H5 上直接加载数据不走登录，选举页此前未对齐该逻辑

## 修复内容
- `Participate.vue`：H5 与小程序分开处理，H5 直接 `loadElectionDetail`，小程序先 `loginWithWxCode().then(...)`
- `wxLogin.js`：H5 防御性修复，URL 缺失 code 时不强制走登录

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 所属项目：昆山市民；代码基线：none
- 来源会话ID：efd7fd9b-1f86-49c6-8815-9bbd75f57fcb
- 涉及文件：src/pages_election/election/Participate.vue、src/pages_vote/vote/votedetail.vue、src/utils/wxLogin.js

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "election_h5_blank_bug",
  "source_extraction_id": "e7ff9dee35c247329e04ae4c0c42cda8",
  "version": 1,
  "memory_type": "entities"
}
-->
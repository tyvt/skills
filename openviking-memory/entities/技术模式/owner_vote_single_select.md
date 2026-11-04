# 使用多选表格进行单选时遗留旧 ID
在项目 EstateManagement-Park (园区物管V0) 中，当使用多选表格进行单选时，旧 ID 会残留在 chooseList 中。

## 问题
- ownerVote/components/dialog.js 在 max===1 时使用了多选表格；切换选项会取消新选项，并将旧 ID 留在 chooseList 中，发送给 idStrArr。

## 解决方案
- 在 handleChooseVote 中，对于 max===1，在标记当前项之前调用 clearSelection()。
- 在 close 中，重置 chooseList 以避免残留。

## 文件和来源
- 涉及文件: ownerVote_Detail.shtml, components/dialog.js, MtplOwnerVoteOptionComServiceImpl.java, ownerVote_Detail.js, committePer_CommittePerCommittePerVoteDetail.js, committePer_CommittePerCommittePerVoteDetail.shtml.
- 来源会话: ac2d34d3-11af-46a8-91d6-aec8e65207bb.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "owner_vote_single_select",
  "source_extraction_id": "946821cb168e4998b6ec501f63eecd13",
  "version": 1,
  "memory_type": "entities"
}
-->
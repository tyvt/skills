# VotingItemsDialog 中对象数组的 join 错误
在 VotingItemsDialog.vue 的查看模式下，contentInfo 对 ownerFileList（对象数组）应用了 join(',')，生成了 [object Object] 和异常的附件。

## 问题根因
- VotingItemsDialog.vue 中的 contentInfo 对 ownerFileList（一个对象数组）使用了 join(',')，产生了字符串 "[object Object]"。

## 解决方案
- 改为直接传递对象数组，让 DetailTemplate 的 getAttachmentFiles 解析并展示。

## 涉及的文件
- autonomy/option/components/VotingItemsDialog.vue
- autonomy/candidateCollect/components/CandidateDialog.vue
- components/detail-template/detail-template.vue
- company/staffManagement/components/certificatesDialog.vue

## 验证与归属
- 所属项目：惠山二期G
- 验证证据：extracted source=cursor project=惠山二期G
- 来源会话：462b8a83-d68c-46cb-bae9-7553f60772a3
- 验证证据: cursor 会话 462b8a83-d68c-46cb-bae9-7553f60772a3
- 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "voting_object_join",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 1,
  "memory_type": "entities"
}
-->
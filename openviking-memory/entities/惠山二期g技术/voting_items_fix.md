# 选项表决附件显示修复
惠山二期G 后台选项表决详情查看表决项时附件显示不正确的修复，已合并三个分支。

## 问题根因
- VotingItemsDialog.vue 查看模式中 detailCallback 将 ownerFileList 转成对象数组（含 url、name 等字段），但 contentInfo 里用 this.form.ownerFileList.join(',') 对对象数组执行 join 得到 [object Object]，导致附件显示异常。

## 修复方案
- 将 value 直接传对象数组，由 DetailTemplate 的 getAttachmentFiles 正确解析并展示（label: '其他材料', value: this.form.ownerFileList）。

## 分支合并情况
- develop/v2.6.1 提交 13adf4dab
- develop/v2.6.2 提交 c151152cc（cherry-pick）
- 另有一分支已合并（来源会话未列全提交号）

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/autonomy/option/components/VotingItemsDialog.vue
- 所属项目：惠山二期G；来源会话：462b8a83-d68c-46cb-bae9-7553f60772a3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "voting_items_fix",
  "source_extraction_id": "d00549ef770e4e9a930b1734bf53a230",
  "version": 1,
  "memory_type": "entities"
}
-->
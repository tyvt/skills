# 禅道Bug 6084 开户网点弹窗分页
选择开户网点弹窗（zs-select-dialog 紧凑模式）分页条被挤到滚动区下方的缺陷任务。

## 根因
- body scrollHeight 741 > clientHeight 591，分页位于可视区下方 102px

## 修复方案
- 启用组件已有 table-scroll 模式（表格内滚动、分页固定底部）
- 新增 BranchOneDialog tableScroll 属性（默认 false 透传 zs-select-dialog）
- unionBankBranch.js openUnionBankBranchSelect 支持 tableScroll 选项
- agreement/account/detail.vue 与 account/regulatoryAccountNew/detail.vue 传 tableScroll:true
- 默认关闭不影响其余 7 处调用方

## 验证与交付
- 实测 Before/After 度量确认 pagInView false→true 与期望截图 21251 一致
- 改动 4 文件 ESLint 0 error
- 提交 eab41abd7+合并 58f225ac6
- 禅道 resolvedBy=tiany/assignedTo=lichandan

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6084",
  "source_extraction_id": "38eac9a37d954bfca6e3c6b80c3dec62",
  "version": 1,
  "memory_type": "entities"
}
-->
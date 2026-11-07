
# 企业变更详情页变更记录弹窗修复
淮安物管企业变更详情页接入 change-record-dialog 时的具体修复实例（会话 95b62123）。

## 修复项
- 弹窗尺寸：zs-dialog 默认 medium 约1300px 致表格列宽仅约660px 右侧空白；改 zs-size="common"（900px），表格列去固定 min-width 三列均分撑满，内容区与表格 width:100%。
- 顶部三审计字段无值：详情接口 createTime/createUser 等在 response.data 顶层，detailCallback 只合并 companyRecordChange 未进 form；调整为先合并顶层字段再合并 companyRecordChange。
- 新增 resolveChangeMeta 兼容多字段名：时间（changeDate/updateTime/createTime/recordTime…）、人员（updateUser/createUser/createUserName…）、说明（changeReason/changeDescription/remark…）。

## 验证与归属
- 所属项目：淮安物管
- 验证证据：extracted source=cursor project=淮安物管
- 涉及文件：companyManagement/change/detail.vue、credit/companyDeclaration/components/checkDialog.vue、companyManagement/components/detail.vue；需刷新页面重新打开变更记录。
- 来源会话：95b62123-9914-4e98-aca3-4d7acff520aa；代码基线：22a1d9d。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_dialog_fix",
  "source_extraction_id": "829524b31da8427facda7c3ea75fe26b",
  "version": 1,
  "memory_type": "entities"
}
-->
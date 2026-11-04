# 淮安物管变更详情变更记录弹窗接入
多个业务域变更详情页需增加「变更记录」按钮，弹窗展示页面 contentInfo 白名单内且实际变化的字段前后值。

## 背景与原因
- 各变更单详情实现分散（企业/从业人员/物业区域/合同/业主自治/公共收益/楼盘表等），每页手写对比表格会导致字段口径不一致。
- 后端返回的变更对象字段名与详情 form 嵌套结构不统一，需公共能力收口。

## 解决方案
- 抽公共组件 change-record-dialog + 工具 contentInfoChange.js：以详情页 contentInfo（及 contentInfo2/3…）为字段白名单，用 originalObj 与当前 form diff，仅输出有差异且在白名单内的行。
- 弹窗顶部按需展示变更时间、变更人、变更说明（无值则隐藏说明区）。
- 各变更 detail 或共用 detail 组件接入按钮与弹窗，按需求清单逐模块挂接（行业管理/物业管理/业主自治/公共收益/项目楼盘表等）。
- 与「变更前/后单表合并」(#816) 互补：本条是「从详情展示 schema 反推可比字段」的接入套路。

## 验证与归属
- 验证：会话 e54a78dd（2026-07-06，基线 3e560be）与 95b62123（2026-07-01，基线 22a1d9d）用户给出跨模块变更记录需求清单；实现组件并多页接入。
- 范围：淮安物管会话一次性接入约 11+ 个变更详情页，合并分支 feature/company-change-record → develop/v2.6.1-huaian。
- 涉及文件：change-record-dialog.vue、contentInfoChange.js、companyManagement/components/detail.vue、companyManagement/change/detail.vue 等；所属项目：淮安物管；来源会话：e54a78dd-db5f-4130-8a53-38052902a30c, 95b62123-9914-4e98-aca3-4d7acff520aa；代码基线：22a1d9d。

## 企业变更详情页修复实例（会话95b62123）
- 弹窗尺寸问题：根因 zs-dialog 默认 medium 约1300px，表格列宽仅约660px导致右侧空白；处理改为 zs-size="common"（900px），表格列去固定 min-width 三列均分撑满，内容区与表格设 width:100%。
- 顶部三个审计字段无值：根因详情接口 createTime、createUser 等在 response.data 顶层，而 detailCallback 只合并 companyRecordChange 未进 form；处理调整 detailCallback 先合并顶层字段再合并 companyRecordChange。
- 新增 resolveChangeMeta 兼容多字段名：时间（changeDate/updateTime/createTime/recordTime…）、人员（updateUser/createUser/createUserName…）、说明（changeReason/changeDescription/remark…）。
- 涉及文件补充：companyManagement/change/detail.vue、credit/companyDeclaration/components/checkDialog.vue、companyManagement/components/detail.vue；需刷新页面重新打开变更记录。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_record_dialog",
  "source_extraction_id": "497161ffec374c01b7ea3b1bbc9a358c",
  "version": 2,
  "memory_type": "entities"
}
-->
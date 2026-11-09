# 禅道Bug 6363 变更提交时附件丢失
Bug 6363：开发企业→企业基本信息→变更提交时附件丢失；zhunan 提交、tiany 处理，2026-11-09 修复并补全回写。

## 基本信息与现象
- 提交人 zhunan；处理人 tiany；状态 2026-11-09 补全回写后 status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=zhunan
- 附件 gif 22061、png 22062；复现账号 9112010765063219X9 / ZS0001Aa!
- 路径：开发企业管理→企业基本信息→变更流程；附件在保存/备案后显示，提交审核后丢失，截图显示营业执照/法人身份证/资质附件区为空

## 根因定位
- 页面 zhi2-web-admin/src/views/toB/companyRecord/detail.vue 与 DeveloperBasicInfoDetail.vue；工具 resolveLicenseAppendixBusId
- 常量：DEVELOPER_REGISTER_APPENDIX_BUS_CODE 记录码040100系列，DEVELOPER_CHANGE_APPENDIX_BUS_CODE='qybgxq'，LICENSE_BUS_CODE='8'
- 根因：变更审核中(bizState==='1'+changeId)时 displayAppendixBusId 切为 changeId，但 displayAppendixBusCode 仍停记录码040100；变更维度附件存 qybgxq（禅道5445成对码），基本信息页拉不到
- AppendixPackageSection 以 v-if="appendixBusId" 渲染，提交后 DeveloperBasicInfoDetail 展示页空槽位

## 修复与提交
- 文件 zhi2-web-admin/src/views/company/companyManagement/components/DeveloperBasicInfoDetail.vue
- 新增 displayAppendixAtChangeDimension（复用 isCompanyRecordChangeUnderAdminReview）；displayAppendixBusCode() 分支：入网页→ENTRY_NETWORK_APPENDIX_BUS_CODE；变更审核中→qybgxq；否则→备案码040100
- 提交 2001247828766ff771bc6eb561adafcbb9ebbc9c「fix(company): 变更审核中企业基本信息附件按变更维度码 qybgxq 查询（禅道6363）」推 develop/v3.0.0；父仓 gitlink 99f511e
- 分支 fix/bug-6363-attachment-lost（子模块）、fix/bug-6363-attachment-lost-parent（父仓）；lint 零新增、build exit 0

## 回写与关联
- 初次回写不完整（无 zt_action，resolvedDate 错误时钟）；2026-11-09 19:23 补全：DBX 事务修正 resolvedDate=2026-11-09 19:23:11，INSERT zt_action 89698（actor=tiany，备注根因→修复→提交→验证），双校验持久化
- 用户曾反馈未修复疑为客测环境未从 develop/v3.0.0 重建；客测 URL http://58.210.252.230:9002/ 待核 version.json 比对 commit 200124782
- 关联：同页缺陷禅道6353；成对码禅道5445；相似必填禅道6145

<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6363",
  "source_extraction_id": "3fd9f2051c44490a936ab0afff199155",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 6,
  "memory_type": "entities"
}
-->
# 禅道Bug 6306 现售备案营业执照带出校验失败
房产管理系统zhi2-web-admin中现售备案申请页营业执照已自动带出但保存仍提示必填。2026-11-09 深度分析确认根因在后端保存链路，不在前端带出逻辑。

## 基本信息
- 标题：现售备案-现售备案申请，营业执照已自动带出但保存仍提示营业执照必填；zhunan提交、指派tiany
- 状态演变：11-06 两次前端修复后标resolved；11-09 复测激活两次，最新19:17「还是不行」，至今未真正解决
- 历史修复：首次修复提交92250ea56（父仓32341a3）按handleConfig旧值修改未彻底解决；二次修复合并d9c2be7aa（子模块c74a2893f+merge，父仓497ec55）改AnnexUpload/getList签名竞态与AppendixPackageSection/validateRequired幂等prefill

## 前端修复（11-06，已证实未根治）
- 修改 zhi2-web-admin/src/components/AnnexUpload/index.vue 的 getList()：签名不一致时 appendixFetchPendingSignature = signature 且 return this.appendixFetchPromise.finally(() => this.getList())（约629–642行）
- 修改 zhi2-web-admin/src/components/AppendixPackageSection/index.vue 的 validateRequired()：有 prefillContext 时先幂等调用 applyPrefillToUpload()（约470–478行）
- Worktree：D:\repository\苏州市房地产监测V3-wt-bug-6306，分支 fix/bug-6306-appendix-prefill-race；构建成功；禅道回写resolved（zt_action 88656，resolvedDate=2026-11-06 18:05:33，assignedTo=zhunan）
- 前端修复仅使营业执照在界面可见，未解决保存校验

## 后端根因（2026-11-09 深度分析确认）
- 后端仓库：苏州市房地产检测V3后端仓库（zhi3-presale模块），SaleRecordServiceImpl.java 的 saveCashsale
- L519：checkMaterials(applyBusCodesCashsale(), [applyGroupId, cashsaleRecordId]) 必填预校验，未排除自动挂载项营业执照/资质证书
- L559-567：mountCompanyRegisterAppendix 从 companyRecordId(busCode=040100) 挂载营业执照/资质证书，在预校验之后
- 挂载后无全量复校
- checkMaterials 按 bus_id∈{applyGroupId,cashsaleRecordId} 且 bus_code=xsbasq 计数；自动挂载证件存于 bus_code=040100,bus_id=companyRecordId（不同对），计数=0→报缺失→抛「带*为必填项…营业执照、资质证书」
- 对照预售 savePresale 正确模式：L347 预校验排除CONFIG_NAME_BUSINESS_LICENSE、L391挂载、L394挂载后全量复核；现售漏此两步
- 结论：现售保存门禁用错键+顺序错，属同类问题漏改；前端带出再好也会被L519拦截

## 数据侧验证
- 目标槽营业执照(ysxksq必填)匹配来源营业执照正本原件(040100)，别名配置正确；后端PresaleProjectVo/project接口正确返回companyRecordId，非数据缺失
- 后端 project/info、project/list 正确返回 companyRecordId；listAppendixPackage 精确匹配查询逻辑正确（营业执照能带出链路通）
- dev库（房地产监测V3 dameng，非客测）核查：公司2102310156454526977零040100附件；但dev库非客测环境，数据结论不直接适用客测
- 已知相似问题：注册附件busId联调（listAppendixPackage busCode=040100,busId=companyRecordId 返回空，因busId未挂接）

## 交付与待办
- 分析文档：docs/前端/bug6306-现售备案营业执照必填-后端根因分析.md
- 修复需改后端仓库（独立仓库，涉及业务校验逻辑），2026-11-09 待用户决定是否直接动手
- 未验证：客测环境部署develop/v3.0.0后复验；真实浏览器端到端复测

<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6306",
  "source_extraction_id": "05865e41e0844073965e0f11325c0a33",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 4,
  "memory_type": "entities"
}
-->
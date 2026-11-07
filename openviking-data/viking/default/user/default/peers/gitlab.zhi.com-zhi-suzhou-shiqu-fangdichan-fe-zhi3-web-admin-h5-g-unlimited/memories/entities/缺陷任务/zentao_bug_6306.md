# 禅道Bug 6306 现售备案营业执照带出校验失败
房产管理系统zhi2-web-admin中现售备案申请页营业执照已自动带出但保存仍提示必填，根因为AnnexUpload.getList()在请求签名不一致时返回旧的进行中Promise，导致prefill在fileList更新前执行，二次修复后解决。

## 基本信息
- 标题：现售备案-现售备案申请，营业执照已自动带出但保存仍提示营业执照必填；zhunan提交、指派tiany
- 状态演变：曾标resolved，提交人17:45激活反馈「更新后依然不行」，2026-11-06二次修复后经DBX事务回写resolved并插入action备注
- 历史修复：首次修复（提交92250ea56、父仓32341a3）按handleConfig旧值根因修改，未彻底解决被激活

## 根因与定位
- 现象：现售备案申请选企业后营业执照看似已带出，但保存校验仍报「营业执照」等必填
- 根因：AnnexUpload.getList()在已有进行中的拉取且本次签名与进行中的不一致（例如busId/上下文刚变）时，原先直接return旧的appendixFetchPromise；AppendixPackageSection.reload()里getList().then(()=>applyPrefillToUpload())会在旧请求结束就执行prefill，而新签名对应的列表尚未拉完，fileList仍是旧状态，导致带出未写入校验用的列表
- 数据侧核对：目标槽营业执照(ysxksq必填)匹配来源营业执照正本原件(040100)，别名配置正确；后端PresaleProjectVo返回companyRecordId，非数据缺失

## 修复方案
- 修改 zhi2-web-admin/src/components/AnnexUpload/index.vue 的 getList()：签名不一致时 appendixFetchPendingSignature = signature 且 return this.appendixFetchPromise.finally(() => this.getList())，保证最终等到当前签名的拉取完成（约629–642行）
- 修改 zhi2-web-admin/src/components/AppendixPackageSection/index.vue 的 validateRequired()：有 prefillContext 时先幂等调用 applyPrefillToUpload()（约470–478行），避免保存瞬间列表仍在刷新的假阴性
- applyPrefillToUpload() 为幂等方法，仅当 prefillContext 存在时生效，对预售许可等复用组件无回归

## 验证与交付
- Worktree：D:\repository\苏州市房地产监测V3-wt-bug-6306，分支 fix/bug-6306-appendix-prefill-race（跟踪 origin/develop/v3.0.0）
- 子模块 zhi2-web-admin：合并 fix/bug-6306-appendix-prefill-race 到 develop/v3.0.0 已 push（提交 c74a2893f + merge；远端 HEAD 约 d9c2be7aa）
- 父仓库 苏州市房地产监测V3：develop/v3.0.0 子模块指针更新 497ec55 已 push
- 构建：worktree 内 npm run build 成功；对2个改动文件单独跑 eslint 无报错（未跑全量 lint，全仓为存量基线）
- 本地仍有未提交 env/.env 与若干 ?? .tmp-*.png（未纳入本次提交）
- 禅道回写：首次 DBX 事务仅 close_session 未 commit，INSERT zt_action 因主键冲突失败且 zt_bug 仍为 active 被回滚；新开会话以 begin→update/insert→commit→close 重写，最终落库：zt_bug status=resolved、resolution=fixed、resolvedBy=tiany、resolvedDate=2026-11-06 18:05:33、assignedTo=zhunan；zt_action id=88656、action=resolved，含根因/修复/提交号备注

## 未验证项
- 客测环境部署 develop/v3.0.0 后，需复验「现售备案申请→选企业带出营业执照→保存无必填误报」
- 未做真实浏览器登录态端到端复测（项目不启 dev server）

<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6306",
  "source_extraction_id": "342432de5f534760a18ca39a507a161b",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->
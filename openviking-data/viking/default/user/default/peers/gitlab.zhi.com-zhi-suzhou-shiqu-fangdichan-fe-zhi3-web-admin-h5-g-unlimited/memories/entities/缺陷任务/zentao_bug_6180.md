# 禅道Bug 6180 预售许可申请编辑页按钮与刷新异常
房产管理系统zhi2-web-admin中预售许可申请编辑页（presale/permit/components/detail.vue）按钮显隐/刷新异常，且预售资金银行监管各模块业务状态显示数字，lichandan提交、指派tiany，用户确认两类都修。

## 现象与根因
### 业务状态显示数字（预售资金银行监管各模块）
- 实测字典接口 POST /api/v3.0/system/dictData/listByType 对 biz_state 返回正常（待提交0/审核中1/已备案2/作废3），业务表 biz_state 值∈{0,1,2,3}均在字典内→前端渲染兜底缺陷
- zs-table-column.vue 的 bizStateColumnOptions 兜底原依赖 this.bizStateOptions（来自全局 mixin 的 data 快照，非响应式）；字典晚于组件就绪时快照永久为空→dict-tag 收不到 options 显原始码值
- dict.js getDicts 将空结果写入模块级缓存，首次空响应会把整个会话 biz_state 字典钉死成空数组

### 预售许可申请编辑页按钮与刷新
- 现象1 保存后保存按钮还在：editCallback 保存后未切查看态（6885d79be 将切 view 改为 refreshDetailSnapshot）
- 现象2 编辑态出现提交/电子签按钮：showSubmitButton/showSignButton 用 formMode!=='add' 放行了'edit'，编辑态也显示
- 现象3 提交后页面未刷新：查看态提交时路由/query 不变、formMode watch 不触发，bizState 不更新

## 修复方案
- zs-table-column.vue：bizStateColumnOptions 兜底改读响应式全局字典 getGlobalBizStateOptions()（store.state.common.bizStateOptions），不再依赖非响应式 mixin 快照
- dict.js：getDicts 空结果（res?.data?.length 为 0）不再写入缓存；对 res 做空安全处理
- presale/permit/components/detail.vue（三处）：
  - showSignButton/showSubmitButton 条件 formMode!=='add' 收敛为 formMode==='view'（电子签/提交属查看态流程动作，编辑态只做保存）
  - editCallback 保存成功后 refreshDetailSnapshot() 再 changeFormState('view', id)
  - handleSubmit 成功后 await refreshDetailSnapshot() 再 changeFormState('view', id)，确保 bizState 与按钮更新

## 验证与交付
- npx eslint 目标三文件 0 error；npm run build 通过（gitHash de6ee70bb）
- 子模块提交 de6ee70bb 推 origin/develop/v3.0.0；父仓库 gitlink ee64811 推送
- 禅道回写（DBX事务化已提交）：status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=lichandan（原提交人），action id 87217 含根因/修复/验证

## 未验证与并行任务
- 未验证：本机无客测登录态（测试服 58.210.252.230:9002 验证码拦截），未在真实客测页面目视确认
- 排查中发现并行任务 bug6147（电子签下线，分支 fix/bug6147-permit-return-no-esign）在同一仓库有未提交改动/台账 E-036；按用户指示「保持撤销、由其所属任务处理」，未纳入本次提交，子模块工作区后续由其任务收尾


<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6180",
  "source_extraction_id": "57e1d01816cf4560985a36edad69a3a7",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->
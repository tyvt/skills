# 禅道Bug 6059 价格备案流程记录样式不一致
房产管理系统价格备案申请详情页「流程记录」组件样式与系统统一组件不一致。

## 根因
- 价格备案使用独立实现的 showApproval.vue + showApprovalCard.vue，未使用系统统一 components/ApprovalProcess 组件
- 旧 statusShow 把 0 当通过、1 当退回，取值用 item.optionResult；统一组件用 item.comment.type
- 无状态颜色、缺操作人员行、el-collapse 边框未清除、状态列 min-width:50px 偏窄、光晕颜色不一致

## 修复方案
- statusMap + colorMap 改为统一映射（1通过、2退回、3驳回、4委派、5转办、6终止、9驳回至起点），新增 green/yellow/red/black 样式类
- showApprovalCard 新增 deptName/taskName props 和操作人员行
- 清除 el-collapse 边框、header 样式外提、状态列 min-width 改 80px、光晕改用 --primary-color-light-6
- 只改两个页面级组件，不动公共组件

## 验证与交付
- eslint 两文件 0 error，npm run build 成功（gitHash 282f1ce99）
- 子模块 f4bbef456→合并 282f1ce99 推送 develop/v3.0.0；父仓库 gitlink a416eec 推送 develop/v3.0.0
- nginx 8098 部署，HTTP 200，新标记在 2 个 bundle
- 禅道回写 resolved/fixed/resolvedBuild=trunk，指派回 zhunan，action id 85589，事务内已复核提交
- worktree szfc-v3-wt-bug6059 已删除，预售资金 worktree 未触碰
- 真实数据联调：后端 FlowComment 枚举确认映射；真实库 ACT_HI_COMMENT type 取值 1/3/9/event/NULL；价格备案(jgzcba) 196条type=1、9条type=3

## 未验证项
- 账号 zsbase 无 /presale 权限返回 403，common-flowable 未运行，未做接口级联调，仅数据级验证
- 建议测试环境复测单据 JGBA20260017

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6059",
  "source_extraction_id": "131bb93c840d4fd089e05563e5a69c57",
  "version": 1,
  "memory_type": "entities"
}
-->
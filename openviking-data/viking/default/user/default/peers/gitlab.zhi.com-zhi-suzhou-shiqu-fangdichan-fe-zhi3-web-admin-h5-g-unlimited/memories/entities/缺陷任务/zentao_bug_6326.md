# 禅道Bug 6326 合同范本维护必填星号缺失
房产管理系统zhi2-web-admin中合同范本维护详情页必填项无红色*，根因为detail.vue的rules为空未配置required规则，补充校验规则后解决。

## 基本信息
- 标题：合同范本维护页必填项无红色*；zhunan提交、指派tiany
- 状态：resolved/fixed/resolvedBuild=trunk/resolvedBy=tiany/assignedTo=zhunan；zt_action 88661备注含根因分支提交
- 根因：template/detail.vue的rules为空，el-form-item虽有prop但无required规则，Element UI不显示必填星号

## 修复方案
- Worktree：D:\repository\苏州市房地产监测V3-wt-bug-6326，分支fix/bug-6326-contract-template-required；提交00d915c798708d17ccd1b6e903a7fa8dc2b097bf（fix(presale): 合同范本维护必填项校验与星号显示 禅道#6326，已push到origin）
- 补充required规则：templateNo、templateName用blur；contractVersion、projectName用blur/change（弹窗选完改值）；isEnable、contractType用change（单选组）
- 备注无prop/非业务必填未加规则；参照同模块预售页contractRevoke/detail、versionManagement/detail一致写法

## 验证与交付
- worktree父目录npm install --ignore-scripts后在子模块npx eslint detail.vue通过；未跑npm run build、未客测实机
- 父仓库develop/v3.0.0仍本地env/.env与.tmp-*.png未提交；子模块指针仍a5dd2aa…未更新
- 合并提示：子模块develop/v3.0.0 merge该分支→push→父仓库更新gitlink指向00d915c79
- 并行6324、6322等*-wt-bug-* worktree未改动

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6326",
  "source_extraction_id": "91c6bf9654cb49f0a83533580f5fb8d5",
  "version": 1,
  "memory_type": "entities"
}
-->
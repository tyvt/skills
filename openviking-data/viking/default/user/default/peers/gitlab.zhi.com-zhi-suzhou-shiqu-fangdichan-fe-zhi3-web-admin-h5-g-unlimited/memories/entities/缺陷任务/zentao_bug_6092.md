# 禅道Bug 6092 价格征求意见页备案记录校验提示词错误
房产管理系统价格征求意见页「发改意见/资规意见/城调意见」三个按钮弹出的备案记录对话框，意见说明必填校验提示词未随按钮变化。

## 根因
- showApprovalProcessDialog.vue 的 opinionLabel 仅按当前状态 status（三按钮时均为 userTask5）判断，一律回落到"区县领导小组意见"，未区分目标审批节点 state（userTask6/7/8）
- detail.vue 的 approval() 在无显式节点时未重置 state，可能沿用上次点击的小组导致标签串味

## 修复方案
- opinionLabel 改为优先按目标节点 state 映射：userTask6→发改小组意见、userTask7→资规小组意见、userTask8→城调小组意见；市级节点(userTask3/4/9)仍为市级领导小组意见，其余保持区县领导小组意见
- detail.vue 的 approval() 增加 default 分支清空残留 state，避免市级办理等无显式节点场景沿用旧值

## 验证与交付
- eslint 改动文件 0 error（仅存量 el-form-item 警告），npm run build 成功（gitHash ad2319ce4，production）
- 子模块 zhi2-web-admin 提交 8f27b58b9 推送 origin/develop/v3.0.0；父仓库 gitlink 提交 6607498 推送 develop/v3.0.0
- nginx 8098 站点 root 即 dist，构建产物已含"发改小组意见"字样，部署完成
- 禅道回写：DBX 事务内 status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=zhunan（回指派提交人），新增 action resolved(id 86091)，附根因+修复+验证说明
- 仅暂存自身两个文件，未夹带他人未提交的 InstitutionRegister*/version.json 改动

## 未验证项
- 未在浏览器实际点开三按钮目视核对（按项目约定不启本地 dev server；已通过构建产物字符串与 lint/build 佐证）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6092",
  "source_extraction_id": "1cda7ba8070249509824a063a21c10ce",
  "version": 1,
  "memory_type": "entities"
}
-->
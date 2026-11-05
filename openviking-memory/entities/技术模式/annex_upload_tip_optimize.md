# 附件上传提示语二次优化
惠山物管V1（zhi1-web-admin）维修资金使用附件汇总页提示语文案二次优化的改动与验证记录。

## 需求与改动
- 禅道任务 2308【惠山维修资金】附件上传提示语二次优化，系任务 2189 之后的二次优化
- 改动文件：zhi1-web-admin/src/views/repairFunds/usage/fundUsageKs/components/AnnexContainer/components/TableBody.vue 的 .annex-upload-tip
- 旧文案：`请勿上传pdf，注意控制图片大小！`（任务 2189 首次添加，红色 #dc143c）
- 新文案：`请勿上传pdf，注意控制图片大小，问题照片、公示照片等直接上传照片，勿扫描或拍照上传`
- 需求原文「公示照片登直接上传」中「登」为「等」笔误，已与用户确认修正为「等」
- 红色字体样式（color:#dc143c）沿用不变，全仓仅 1 处匹配

## 流程与验证
- 在独立 worktree（zhi1-web-admin-wt-task2308 / 分支 wuxi-huishan-wuguan-task2308）内修改
- npm run build 通过（exit 0），已合并回 wuxi-huishan-wuguan-main-v1.26 并清理 worktree
- 本地 nginx 站点 惠山物管V1（端口 8100）root 指向 D:/repository/惠山物管V1/dist，reload 后验证新文案已生效

## 提交与回写
- 子模块 zhi1-web-admin 推送：b365ded0a..87637b164；父仓库推送：f15bf71..77f8c82（gitlink 更新）
- 禅道任务 2308 回写为已完成（status=done，finishedBy=tiany，指派回原提交人 hongshun），新增 finished 操作记录

## 验证与归属
- 验证证据：extracted source=agent session project=惠山物管V1
- 涉及文件：repairFunds/usage/fundUsageKs/components/AnnexContainer/components/TableBody.vue
- 所属项目：惠山物管V1（zhi1-web-admin）；来源会话：2026-11-05；代码基线：wuxi-huishan-wuguan-main-v1.26

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "annex_upload_tip_optimize",
  "source_extraction_id": "27ff957e739a4ec18fb65eee40cd92d3",
  "version": 1,
  "memory_type": "entities"
}
-->
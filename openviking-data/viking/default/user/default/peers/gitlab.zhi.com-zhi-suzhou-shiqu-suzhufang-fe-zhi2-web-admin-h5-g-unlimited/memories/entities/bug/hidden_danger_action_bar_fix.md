# 禅道bug6902隐患处置详情页操作栏改造
修复苏住房前端 zhi2-web-admin 隐患处置详情页操作按钮的展示位置与吸底布局问题。

## 改动内容
- 详情页（formMode=view）顶部返回/编辑行移除「反馈进度」「处置完成」按钮
- 两个操作按钮改为底部吸底操作栏：position:fixed、bottom:0、left:230px、right:0、justify-content:center
- 「反馈进度」为 el-button--primary 蓝色 rgb(22,119,255)；「处置完成」为 el-button--success 绿色 rgb(82,196,26)
- 权限 v-if（canFeedback / canFinish）独立保留：待处理记录两按钮齐显，已完成记录无按钮
- 涉及文件 detail.vue

## 验证结果
- 2026-11-24 在本地 8101 环境实机验证记录 YHCZ20261118180005（待处理状态，formMode=view）
- DOM 断言 rectBottom=628 等于视口高、按钮居中；顶部区域无这两个按钮
- 反馈进度弹窗 wrapper z-index 2001 高于底栏 20，弹窗完整显示不被遮挡
- 用户确认验证通过并要求提交并推送

## 后续与归属
- 所属项目：zhi2-web-admin（苏住房前端）；禅道 bug 6902
- 待办：子模块 zhi2-web-admin 仅提交 detail.vue 并推送；回写禅道 6902（comment 附图，resolved/fixed，指派人 tiany→lichandan）
- 验证截图暂存 C:\Users\Administrator\AppData\Local\Temp\zentao-6902\，留图后清理；原始证据保留于 D:\禅道附件\bug\6902\

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "bug",
  "name": "hidden_danger_action_bar_fix",
  "source_extraction_id": "168898cbfd1d4ee8865cea19c9690834",
  "version": 1,
  "memory_type": "entities"
}
-->
# 苏住房防汛模块
苏住房前端(zhi2-web-admin)防汛/应急预案前端模块；代码位于 worktree `bug5897`（分支 `develop/v2.6.2-suzhufang-li`）与 `bug6369`（分支 `fix/bug6369-flood-plan-download`），主 checkout 不含。

## 代码与文件
- 页面：src/views/flood/ 下应急预案详情页 detail.vue、积水原因复盘 cause/index.vue
- 下载：src/components/detail-template/detail-template.vue（466-485行）；上传：zs-file-upload.vue（url=res.data.fileSite 存 planFileUrl）
- 下载链：detail.vue 用 DetailTemplate(type:'image',download:true)→getAttachmentFullUrl→resolvePublicAssetUrl→resolveServerAssetUrl（依 pathname 重建URL，viteBase="./"）

## 数据存储
- 业务库：苏住房测试(达梦 Dameng)，schema `SERVICE_EXPAND`，表 `T_FLOOD_PLAN`
- `PLAN_FILE_URL` 存同源根相对路径，如 `/zhi2-dev/2026/9/e/2/<uuid>.docx`

## 工作约束
- 修改前必读 flood skill + flood docs，修改后更新 `common-errors.md`
- 重度构建/lint 走 `orchestrate`，主模型只读摘要

## 关联缺陷
- Bug 6369：应急预案上传后打不开，已 resolved/fixed（详见缺陷卡片）。
- Bug 6401：防台防汛页单据编号/提交时间列被省略号截断，已 resolved/fixed。
- Bug 6402：积水原因复盘必填校验缺失，已 resolved/fixed。
- Bug 6435：汛前检查统计汇总详情页优化，禅道事务会话待开启。


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "suzhufang_flood_module",
  "source_extraction_id": "4d9639be9c314282bb13e95c830f71d4",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 10,
  "memory_type": "entities"
}
-->
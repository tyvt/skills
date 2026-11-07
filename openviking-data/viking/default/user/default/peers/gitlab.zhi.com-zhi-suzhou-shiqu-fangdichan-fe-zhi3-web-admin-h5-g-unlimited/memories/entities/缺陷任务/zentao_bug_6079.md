# 禅道Bug 6079 价格备案详情顶部信息截断
房产管理系统价格备案申请详情页（市级）与变更详情页「基本信息」长文本字段被单行省略号截断。

## 根因
- 顶部「基本信息」由 buildBaseContentInfo() 生成，长文本字段（项目名称/备案申请单位/项目坐落）默认 type:'text'
- DetailTemplate 对 text 类型走单行省略号（.detail-text 全局 nowrap + ellipsis），故被截断
- 流程记录「全部待审批」是 statusMap[item.comment?.type] 拿不到有效 type 的业务数据问题 → 归后端，前端未动

## 修复方案
- recordPriceMngContentInfo.js 将 3 个长文本字段由 type:'text' 改为 type:'textarea', keepSpan:true
- textarea 是项目既有的「完整换行、不截断」展示类型（备注同款），keepSpan:true 保持三列栅格布局
- 改动同时惠及详情页(detail.vue)与变更详情页(changeDetail.vue)

## 验证与交付
- eslint 该文件 0 error（项目 8.57.1），vite-build.mjs build 成功（产物含 type:"textarea",keepSpan:!0）
- 子模块 zhi2-web-admin 3cdcc58a7 推送 develop/v3.0.0；父仓库 4d7a9e3 推送 develop/v3.0.0
- nginx 8098 部署，HTTP 200，新 chunk recordPriceMngContentInfo-BQmjXcC0.js
- 禅道回写仅备注（action 85980，commented，actor=tiany），bug 状态保持 active 未改
- worktree zhi2-wt-bug6079 创建、合并应用、清理删除；未触碰并行任务残留的 src/styles/index.scss 等他人改动

## 未验证项
- 真实浏览器登录后视觉确认未做（环境无测试账号/验证码 OCR 依赖）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6079",
  "source_extraction_id": "aa87868449d2453eb4fcaf50d2964981",
  "version": 1,
  "memory_type": "entities"
}
-->
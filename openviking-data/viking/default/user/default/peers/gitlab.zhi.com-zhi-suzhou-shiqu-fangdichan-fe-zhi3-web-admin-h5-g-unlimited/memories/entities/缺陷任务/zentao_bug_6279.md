# 禅道Bug 6279 项目备案申请奇安信浏览器滚动条缺陷
房产管理系统项目管理-项目备案申请编辑态在奇安信可信浏览器上滚动条仅控制了基本信息区域，基本信息末行被宗地信息块截断。
## 现象
- 页面 URL 为 /projectmanage/customerProject/...（项目管理-项目备案申请，编辑态）
- 截图 fileID=21785 显示「基本信息」区域右侧独立滚动条，最后一行字段被「宗地信息」区块截断
- 期望整页滚动、基本信息字段默认全展示
## 根因
- 整页滚动架构依赖 `:has()` 选择器（需 Chromium 105+）
- 奇安信可信浏览器内核旧（Chromium <105）不支持 `:has()`，规则整体失效
- 回退为「表单区内滚」导致滚动条仅控制基本信息
- 样式位于 styles/index.scss 453–515、536–572 行，无 `@supports` 兜底
## 页面结构
- 路由 projectManagement/customerProject/detail.vue（formMode=edit）
- `.detail-container` 下含 `.detail-from-container`（基本信息表单）与兄弟块「宗地信息」「证书管理」collapse-container
- `.detail-container` 禁滚，内层承载滚动，`#app-main:has(> .detail-container)` 触发整页滚动
## 修复约定
- 主工作区子模块正处 fix/zentao-6275-permit-plan-restore 分支处理 bug 6275，不可触碰
- 须按规则建独立 worktree 落地修复

## 修复进展（2026-11-06）
- 已建 worktree：父 `szfc-v3-wt-bug6279` @ `bugfix/zentao-6279-has-fallback`，子模块内嵌 wt @ `fix/zentao-6279-has-fallback`，基线 `fdb331230`，node_modules 已 junction
- 主工作区（c3d746631）与 worktree 基线（fdb331230）在 main.js、index.scss 两文件上无差异，规则文本已确认
- 另存他人任务 worktree `zhi2-web-admin-wt-6285`（bug 6285），不触碰
- 定稿兜底方案：main.js 顶部 `CSS.supports('selector(:has(*))')` 探测，不支持（或异常）给 `<html>` 打 `no-has-support`（一次性、零观察器）；index.scss 紧跟 `:has()` 组后新增 `html.no-has-support` 回退块，整页「表单+底部块」滚动，镜像 zs-tabs 收缩规则（471–501 行）与楼盘表两条，仅翻 `.detail-container` 的 overflow 并覆盖直接子级内滚，不动 `#app-main`
- 截至 2026-11-06 仍在 worktree 内实施，未提交修复

<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6279",
  "source_extraction_id": "c4d09957104944e88a0a9548e9772d88",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->
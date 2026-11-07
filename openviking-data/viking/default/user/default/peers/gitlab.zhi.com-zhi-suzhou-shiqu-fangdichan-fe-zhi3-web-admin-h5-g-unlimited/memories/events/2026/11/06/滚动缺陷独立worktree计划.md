# Summary
2026-11-06 助手确认主工作区子模块正被 bug 6275 任务占用（分支 fix/zentao-6275-permit-plan-restore），决定按强制规则为 bug 6279 建立独立 worktree 以免触碰主工作区。
# 2026-11-06 (Friday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6279
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 记忆确认了滚动架构：`detail-container` 禁滚（`overflow:hidden`），内层 `detail-from-container` 承载滚动，且 `#app-main:has(> .detail-container)` 依赖 `:has()` 选择器——奇安信可信浏览器内核老，很可能不支持 `:has()`（需 Chromium 105+）。

注意：主工作区子模块正在 `fix/zentao-6275-permit-plan-restore` 分支上跑另一个任务（bug 6275），我不能碰，稍后按规则建独立 worktree。先定位页面代码：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 路由确认：`projectManagement/customerProject/detail.vue`（`formMode=edit` 即申请/编辑页）。现在看页面结构与滚动容器实现：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 记忆与全局样式吻合：整页滚动架构大量依赖 `:has()` 选择器（需 Chromium 105+，奇安信可信浏览器内核旧不支持）。现在精读关键样式段和页面结构：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 再确认 `.detail-from-container` 基础样式与 `app-main` 基础滚动，以及该页面里「宗地信息/证书管理」的容器结构：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 页面结构已清楚：`.detail-container` 下第一个 `.detail-from-container`（基本信息表单）+ 兄弟底部块（宗地信息/证书管理组件）→ 属于「整页滚动」形态，其规则全靠 `:has()`。查底部块组件的根元素和 AppMain/detailLayout 的配合机制：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 截图与代码对上了：页面是 `.detail-container`（基本信息 `el-row.detail-from-container` + 兄弟块「宗地信息/证书管理」），整页滚动完全靠 `:has()` 条件选择器（`index.scss` 453–515、536–572 行）。奇安信可信浏览器内核旧（Chromium <105），`:has()` 规则整体失效 → 回退成「表单区内滚」→ 正是「滚动条仅控制了基本信息」。

先查既有工作流约定和落地位置，再动手：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 截图与代码已对上根因链路。现在确认修复方案的配套细节（全局样式中 `app-main` 是否还有其他滚动规则、是否已有 `@supports` 兜底、`Headline` 根类、构建脚本路径假设）和工作流约定（提交规范记忆）：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 无任何 `@supports` 兜底。快速确认 `Headline` 与 `OperationBtnGroup` 根类名后动手：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 结构确认完毕。编辑态页面：`.detail-container` 内是基本信息表单行 + 「宗地信息」「证书管理」两个 `collapse-container` 兄弟块，整页滚动完全依赖 `:has()`。按强制规则建独立 worktree（主工作区子模块正被 bug 6275 任务占用，不能碰）。先枚举子模块 worktree 并确认 vite 构建的路径解析方式：

<!-- MEMORY_FIELDS
{
  "event_name": "滚动缺陷独立worktree计划",
  "goal": "制定隔离修复方案",
  "summary": "2026-11-06 助手确认主工作区子模块正被 bug 6275 任务占用（分支 fix/zentao-6275-permit-plan-restore），决定按强制规则为 bug 6279 建立独立 worktree 以免触碰主工作区。",
  "ranges": "0,23-62",
  "source_extraction_id": "45eaa06661c34974b483ca3995849319",
  "version": 1,
  "memory_type": "events"
}
-->
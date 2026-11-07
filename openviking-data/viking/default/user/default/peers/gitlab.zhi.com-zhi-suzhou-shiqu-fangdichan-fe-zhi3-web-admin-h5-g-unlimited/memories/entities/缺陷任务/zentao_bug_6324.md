# 禅道Bug 6324 预售转现售申请页楼幢列表列头硬编码为预售
房产管理系统zhi2-web-admin中，预售转现售申请详情页「现售楼幢列表」页签下两列仍显示「预售套数」「预售总面积(㎡)」，与现售场景不符。

## 根因与定位
- 页面：预售转现售申请详情页（presale/cashsale/components/CashsaleDetail.vue）页签名已改为「现售楼幢列表」，但楼幢表列头未同步
- 现售详情复用 PresaleBuildingTable.vue 时，列 label 写死为「预售套数」「预售总面积(㎡)」
- CashsaleDetail.vue 只改了页签名，未覆盖列标题

## 修复方案
- PresaleBuildingTable.vue 增加可选 props `houseCountColumnLabel`、`houseAreaColumnLabel`（默认仍为预售文案，预售许可页行为不变）
- PresaleBuildingSection.vue 向子表透传这两个 props
- CashsaleDetail.vue 传入「现售套数」「现售总面积(㎡)」
- 改动仅列头文案透传，最小且正确

## 验证与交付
- 独立 worktree `fix/bug-6324-building-column-labels`（路径 `D:\repository\苏州市房地产监测V3-wt-bug-6324`，自 develop/v3.0.0）开发
- 子模块 zhi2-web-admin 分支 develop/v3.0.0 已 merge `fix/bug-6324-building-column-labels` 并推送；HEAD `a5dd2aa46`（merge 提交，内含修复 `6b48d79d2`）
- 父仓库 develop/v3.0.0 已推送；子模块 gitlink 指 `a5dd2aa46`；最新父提交 `05ba68b`（chore(submodule): develop 含 #6324 合并提交 a5dd2aa）
- 合并说明文档在之前 `5cf20da`
- 台账 docs/frontend/common-errors.md 已加 E-042
- 禅道回写：#6324 status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=zhunan、resolvedBuild=trunk，操作记录 id 88658（根因+修复+提交号）

## 未验证项
- worktree 内 `npm run lint` 失败（未安装 node_modules，eslint 不可用），未执行 `npm run build`
- 未在浏览器/客测复测，属「已实施待联调」，合并进主工作区 npm install 后需补跑 lint/build 与页面确认
- worktree `D:\repository\苏州市房地产监测V3-wt-bug-6324` 仍存在，合并已完成；不需要时可 git worktree remove
- 主仓库仍有 env/.env 修改与根目录 .tmp-bug-*.png 未提交，属本地环境/临时文件，未纳入本次提交

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6324",
  "source_extraction_id": "c80f96cc0c3e4d7fb7307f072e59bfb6",
  "version": 1,
  "memory_type": "entities"
}
-->
# 苏住房G
苏住房G（苏州住房G端/管理端H5）前端项目，使用 zhi2-web-admin 子模块，本机工作区 D:/repository/苏住房G。

## 项目描述
- 涵盖房地产合同、企业登记、月度报告、评估、资产/资金全景监管等模块，积累多调试/重构/bug修复工作流

## 仓库结构与工作流
- 主工作区分支 develop/v2.6.2-suzhufang，子模块同分支
- worktree 在苏住房G/worktrees/：bug5897（分支 li，HEAD cfe7f9930）、task2192（分支 evaluation，HEAD 4e2cf39b3），截至2026-11-04未合并已推origin
- 父仓库特性分支建同名父分支固定 gitlink；.gitmodules 设 branch 后提交推送；截至2026-11-04父分支 li（44274f8）已推，evaluation（3940898）推送被拒
- 2026-11-04 禅道2295直接在 develop/v2.6.2-suzhufang 改 detail.vue 推送，子模块提交8992db265，父提交8fb06ce更新gitlink
- 本地 nginx 站点端口8101，root D:/repository/苏住房G/dist，已 reload
- 2026-11-05 完成 develop/v2.6.2 到 develop/v2.6.2-suzhufang 合并：子模块提交 cc496589e 无冲突，父仓库更新指针 0fb43ab，工作区干净本地超前远程1提交
- 2026-11-05 cherry-pick 回单明细按钮修复到 develop/v2.6.2（子模块 1b3c7f6c5），原分支提交 1df2da437，两分支各领先远程1提交未推送（会话 765750a0）

## 代码逻辑与修复
- B 端用户分两类：企业管理员登录不弹区域选择框且不显示区域名；从业人员关联多区域时弹且可切换（terminalUser.js 的 isBTerminalPractitioner/isGTerminalLike）（会话 cbfb89e8）
- 密码过期强制改密可设 passwordReset.js 中 FORCE_RESET_PASSWORD_ENABLED=false 临时关闭，store/modules/user.js 同步忽略置 true 请求，恢复时改回 true（会话 526fcf75）
- saveLoading 变量在 OperationBtnGroup/index.vue 定义，并在 regionBankAuth/detail.vue 等多处定义或手动管理（会话 f2c4d1f7）
- 已增梯维护选择小区弹窗原用无区县限制的 /property/complex/page，已修复为按当前区县过滤（census/detail.vue handleOpenProjectDialog）（会话 5380defe）
- 首页统计地图下钻先清空标记，接口失败回退上一级避免旧区名残留（statisticsMap/index.vue、map.vue）（会话 7c8a2586）
- RepairPanel 合计为0时环图不渲染，改为等分占位扇区并显示「合计 0」（会话 924b8810）
- companyProjectStats 搜索按钮 handleQuery 为空不调接口，改为调用 getDetails()（会话 5fd50fdd）
- 首页关键数据与检查数据导航拆分独立 regionCode，默认全市（会话 c67476bc）

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 来源会话：765750a0-13d8-4789-8d78-9bb82bdf1e1f

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房G",
  "source_extraction_id": "966a84f83da74b8aba4a2409457e3cb5",
  "version": 24,
  "memory_type": "entities"
}
-->
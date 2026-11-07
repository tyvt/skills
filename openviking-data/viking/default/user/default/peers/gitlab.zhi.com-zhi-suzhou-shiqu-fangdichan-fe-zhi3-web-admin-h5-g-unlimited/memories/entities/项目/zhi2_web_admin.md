# zhi2-web-admin 房产管理H5后台
苏州房产管理系统前端后台（git 父仓库+子模块），属「苏州市房地产检测V3」体系；技术栈 Vue；后端见 szfc_v3_backend 实体。

## 基本信息
- 子模块最新 HEAD：b8cd24a67（含 bug6190 fix f3c67f86b；前序 99cf5f75f 含 bug6147 合并；cfe2fb985 含 bug6179；8510f1e96 含 bug6160；ec1a252c5 含 bug6155；6d60eb581 含 bug6143；a7cb8056c 含 bug6112；1141777b6 含 bug6138；46d1d0cb5 含 bug6128/6129；de6ee70bb 含 bug6180）
- 构建：npm run build（=vite-build.mjs）；子模块 node_modules 含 vite 8.3.5，根目录 vite 5.4.11（worktree 重建可用 bun install 规避版本冲突）；nginx 8098 提供 dist
- worktree 构建时 vite rootDir=../ 指向主仓库根，outDir 落主根 dist（nginx 8098 站点目录）、env 读主根 env/；dist 为共享产物目录，多任务构建需防竞态（曾因并行会话写同一 dist/ 致 version.json 陈旧，后被最新构建收敛）

## Worktree 依赖与事故
- 勿用 junction 指向主工作区 node_modules（git worktree remove --force 会穿透 junction 删主工作区依赖，bug6129 事故 E-032）
- 实际事故：bug6129 会话删 worktree 穿透 junction，主工作区 node_modules 删剩 5 项；npm install 恢复 125 包。后续 worktree 依赖应独立安装
- 收尾删 junction 用 `cmd /c rmdir`（只删链接本身），勿用 `git worktree remove --force`
- 安全用法：worktree 建 junction 指向子模块自身 node_modules（非主工作区），bug6155/bug6147 均用此法构建通过，无穿透事故；但 worktree 若为子模块同级兄弟目录（如 D:\repository\szfc-v3-wt-bug6190），Node 向上解析不到父仓库 hoist 的 @wangeditor 等包，需从主子模块目录复制改动构建验证

## 历史分支与worktree
- szfc-v3-wt-prefund-new：预售资金 worktree，合 develop/v3.0.0（588f0c434）后删；分支 feature/prefund-account-agreement-1413-1415 保留
- zhi2-web-admin-wt-navbar-home、wt-bug6084、bug#6092/6093/6099/6116/6138/6159/6163/6179/6147 等各自 worktree 合后删；并行任务未动
- bug#6012：双 worktree（fix/bug6012-detail-gap、fix/bug6012-revert-3col）合 develop/v3.0.0（e4515310b）后删；旧分支 fix/bug6012-parcel-dialog-3col 保留
- bug#6076/6057/6079 各自 worktree 合后删；bug#6084 worktree wt-bug6084 合 eab41abd7→58f225ac6 后删；并行 wt-bug6085 未碰
- bug#6092/6093 worktree 合后删；bug#6099 worktree 删并 prune；bug#6116 worktree 合 73942b370 后删；并行 wt-bug6105 未动
- bug#6138 worktree fix/bug6138-priceparams-bizstate 合 1141777b6 后删；并行任务未动
- bug#6190 worktree szfc-v3-wt-bug6190 合 b8cd24a67 后删；未动并行任务

## 各 Bug 修复索引（详情见同名 entities）
- #6112 监管账户开户详情页（supervision/agreement/account/detail.vue 服务开户070401/销户070402）只传 :show-approval 未传 :show-audit 致开户单显「流程查看」；新增 :show-audit="opensalesType != 'ACCOUNT_OPEN'" 同口径隐藏；子模块 a7cb8056c、父仓库 7334b7a；禅道 resolved 指派 zhunan
- #6128 changeDetail.vue 缺「楼幢类型」字段（菜单 projectManagement/buildingChange/detail.vue 薄封装）；插入 zs-select（building_type 字典、必填、v-tooltip 新旧值）；子模块 46d1d0cb5
- #6143 监管标准管理详情/编辑页「控制百分比」保留2位小数（v-money:2、toFixedRation2）；子模块 6d60eb581
- #6147 预售许可申请退回后移除「电子签」按钮+提交去签章门控；子模块 99cf5f75f、父仓库 d8ad5b0（本任务）
- #6155 土地使用权证号 placeholder 文案修正（permit/plan + cashsale/plan）；子模块 ec1a252c5、父仓库 bad38a5
- #6159 形象进度弹窗附件行 CSS 对齐；子模块 886b9e437、父仓库 82fb987
- #6160 预售许可受理详情页关通用「审核」按钮（:show-approval=false）；子模块 8510f1e96、父仓库 fdcfcf6
- #6163 提交后切查看态隐藏保存按钮（changeFormState('view')）；子模块 bf1dde633、父仓库 a7840ef
- #6179 现售备案隐藏「电子签」按钮；子模块 cfe2fb985、父仓库 85d5d75
- #6180 业务状态数字转中文+预售许可按钮显隐与提交后刷新；子模块 de6ee70bb、父仓库 ee64811
- #6190 价格备案申请「编辑房屋备案价格」弹窗备案总价(recordAmountNew)无长度限制致超长输入后端溢出500；PriceTableDialog.vue 增@input截断整数10位+校验规则；子模块 f3c67f86b(合 b8cd24a67)、父仓库 3d14e92

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_web_admin",
  "source_extraction_id": "42d9385a2a88453a8fdeede2c112aedb",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "source_extraction_ids": [
    "16c965ff80f34791a3ac678de02939c9",
    "7910f4f9dc52422dbe653635d19ce652"
  ],
  "version": 35,
  "memory_type": "entities"
}
-->
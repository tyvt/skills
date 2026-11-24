# zhi2-web-admin 房产管理H5后台
苏州房产管理系统前端后台，git 父仓库加子模块结构，属「苏州市房地产监测V3」体系，技术栈 Vue，后端见 szfc_v3_backend 实体。

## 基本信息
- 子模块最新 HEAD 9a324be7f（bug6476 fix，2026-11-24 推送）；前序 b8cd24a67 含 bug6190 fix f3c67f86b，99cf5f75f 含 bug6147，cfe2fb985 含 bug6179，8510f1e96 含 bug6160，ec1a252c5 含 bug6155，6d60eb581 含 bug6143，a7cb8056c 含 bug6112，1141777b6 含 bug6138，46d1d0cb5 含 bug6128/6129，de6ee70bb 含 bug6180
- 构建 npm run build（=vite-build.mjs）；子模块 node_modules 含 vite 8.3.5、根目录 vite 5.4.11（worktree 重建可用 bun install 规避版本冲突）；nginx 8098 提供 dist
- worktree 构建 vite rootDir=../ 指向主仓库根，outDir 落主根 dist（nginx 8098 站点目录）、env 读主根 env/；dist 为共享产物目录，多任务构建需防竞态（曾因并行会话写同一 dist/ 致 version.json 陈旧，后被最新构建收敛）
- 产物一致性：rebuild 后 dist/version.json 的 gitHash 必须等于子模块 HEAD（2026-11-24 核对 9a324be7f 一致）
- 各次 bug 修复的改动点、commit 与禅道状态见 zhi2_web_admin_bugfix 实体。

## Worktree 依赖与事故
- 勿用 junction 指向主工作区 node_modules（git worktree remove --force 会穿透删主工作区依赖，bug6129 事故 E-032；实际删剩 5 项，npm install 恢复 125 包；收尾用 `cmd /c rmdir` 只删链接本身）
- 安全用法：worktree 建 junction 指向子模块自身 node_modules（bug6155/bug6147 均通过）；但 worktree 若为子模块同级兄弟目录（如 D:\repository\szfc-v3-wt-bug6190），Node 向上解析不到父仓库 hoist 的 @wangeditor 等包，需从主子模块目录复制改动构建验证
- 合后删：szfc-v3-wt-prefund-new（预售资金，合 develop/v3.0.0 588f0c434；分支 feature/prefund-account-agreement-1413-1415 保留）、zhi2-web-admin-wt-navbar-home、wt-bug6084（eab41abd7→58f225ac6）、wt-bug6190（b8cd24a67）、bug#6092/6093/6099/6116/6138/6147/6159/6163/6179 各自 worktree
- bug#6012 双 worktree（fix/bug6012-detail-gap、fix/bug6012-revert-3col）合 develop/v3.0.0（e4515310b）后删，旧分支 fix/bug6012-parcel-dialog-3col 保留；bug#6076/6057/6079 各自 worktree 合后删
- 并行任务未动：wt-bug6085、wt-bug6105，以及 2026-11-24 bug6476 任务期间的 deploy/nginx.conf


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_web_admin",
  "source_extraction_id": "0b0b9d460a884399bd77607e85481cf4",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "source_extraction_ids": [
    "16c965ff80f34791a3ac678de02939c9",
    "7910f4f9dc52422dbe653635d19ce652"
  ],
  "version": 40,
  "memory_type": "entities"
}
-->
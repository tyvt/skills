# zhi2-web-admin Git 子模块工作流
zhi2-web-admin 是父仓库的子模块，拥有独立 git 仓库，改动须走子模块内 worktree。

## 工作流
- 在子模块内建独立 worktree 开发（如 feature/booth-map-page 分支）
- 提交后 fast-forward 合并回 develop/v3.0.0 并推送子模块
- 例外：用户明确指示'做在主线分支'时，可直接在主线分支（如 develop/v2.6.2-suzhufang）开发并推送，不建 worktree（task 2295 月报表暂存导出即如此）
- 再于父仓库提交 gitlink 变更（M zhi2-web-admin）并推送父仓库
- worktree 与临时分支用完即删，保持主工作区干净

## 验证注意
- worktree 不随检出的 node_modules，整包 npm run build 难跑；可借主工作区 node_modules 做 SFC 编译校验
- 纯 Vue2 Options API + 标准资源导入页面，与既有同类页一致即可认为编译安全
- 禁止用 PowerShell 的 Get-Content/Set-Content 读写含中文的 Vue 文件，会破坏 UTF-8 编码并加 BOM 导致乱码；字符串替换请用 read/edit 工具
- worktree 自 HEAD 切出，不含主工作区未提交改动；若用户看到的文件含未提交改动，需先把主工作区版本作为基线带入 worktree，或直接在主工作区修改
- 构建验证可放回主工作区进行（worktree 路径下 vite 因 node_modules 解析/版本检查更严格可能构建失败）
- 另注：榆林子模块各 worktree 的 vite rootDir 同为父目录 D:/repository/榆林G，build 会写同一 dist 互相覆盖；需用 --outDir 隔离（详见园区物管2.0 部署约定）。
- 榆林变更落 develop/v2.6.2-yulin 分支（非 develop/v3.0.0），父仓库无对应 262-yulin 分支，仅子模块推进。

## 远程推进与清理
- 远程 develop/v3.0.0 被并行任务推进（不可 fast-forward）时禁止强推：先在子模块把 fix 分支合并入 develop/v3.0.0 并推送（fix 文件与远程改动零交集则无冲突），再在父仓库合并远程 develop 并解决 gitlink 冲突指向新子模块头
- worktree 清理安全：其内若含指向主仓库 node_modules 的 junction，须先 cmd /c rmdir 摘除 junction 本体再删 worktree，否则递归删除会穿透 junction 清空主仓库依赖

## 父仓库本地配置
- 父仓库 env/.env 记录本地代理地址切换（两条 proxy 间切换），属本地联调配置，非任务改动，按规范不纳入提交与推送

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_admin_git",
  "source_extraction_id": "ac9a1eaec61d4fad91225e9cf85ff1b7",
  "version": 6,
  "memory_type": "entities"
}
-->
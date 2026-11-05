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

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_admin_git",
  "source_extraction_id": "f79d689679644dadba4c25a84f0b231f",
  "version": 4,
  "memory_type": "entities"
}
-->
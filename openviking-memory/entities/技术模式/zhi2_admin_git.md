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

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_admin_git",
  "source_extraction_id": "31ab600c7e9c4295b07e25f5a3e0cbf9",
  "version": 2,
  "memory_type": "entities"
}
-->
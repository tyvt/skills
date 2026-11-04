# 苏住房G前端仓库
苏住房G（苏州住房G端/管理端H5）前端仓库，使用 zhi2-web-admin 作为子模块，当前位于本机工作区。

## 仓库结构
- 主工作区分支为 develop/v2.6.2-suzhufang，位于 苏住房G 目录
- worktree 嵌套在 苏住房G/worktrees/ 内部（不在 D:epository 根目录），且属于 zhi2-web-admin 子模块而非父仓库直接管理
- 子模块 worktree 列表需进入子模块目录查看，父仓库的 git worktree list 不显示子模块 worktree

## 嵌套worktree
- bug5897：目录名 bug5897，注册名 bug5874（名称不一致），分支 develop/v2.6.2-suzhufang-li，HEAD cfe7f9930
- task2192：目录名 task2192，分支 develop/v2.6.2-suzhufang-evaluation，HEAD 4e2cf39b3
- 两分支均基于 develop/v2.6.2-suzhufang，截至 2026-11-04 均未合并入基分支，但均已推送到 origin

## 子模块关联方式
- 父仓库为特性分支功能时，创建同名父分支，固定 gitlink 指向子模块提交，并在 .gitmodules 设置 branch，再提交推送
- 截至 2026-11-04：父分支 develop/v2.6.2-suzhufang-li（提交 44274f8）已推送；develop/v2.6.2-suzhufang-evaluation（提交 3940898）推送被拒（非快进），需 fetch 后整合

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "su_housing_g",
  "source_extraction_id": "fee65eda25f44e8e921b90d944ddcd4f",
  "version": 1,
  "memory_type": "entities"
}
-->
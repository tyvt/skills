# 子模块交付前四方一致性校验
子模块与父仓推送完成后，须证明别人 clone 主仓并 submodule update 能拿到正确代码，做四方一致性校验。

## 适用场景
- 子模块与父仓都推送完成，需验证主仓本地=远端=gitlink记录=子模块实际 HEAD
- 本次校验：主仓本地=远端 `c27a390`；submodule 指针 `ecf0afcf5`；实际 HEAD `ecf0afcf5`

## 核心做法
- 交付前核对四值：主仓本地 HEAD、主仓远端 HEAD（`git ls-remote`）、主仓 tree 子模块指针（`git ls-tree`）、子模块实际 HEAD（`git rev-parse HEAD`）
- 四值须落同一提交；远端 tree 查远端分支 tree 而非本地 HEAD tree
- 推送出现仓库重定向提示（如带 `.git` 后缀）属正常，以 ref 更新为准；校验表随交付给出

## 验证证据
- 来源会话 session-85f8a862-df80-4607-8c2d-5efd15506dc4（基线 5d68a74）
- 推送结果 submodule `6a5960bab..ecf0afcf5`、主仓库 `4826471..c27a390`；涉及 zhi2-web-admin、.gitmodules

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "submodule_four_way_check",
  "source_extraction_id": "1131dd29a19c47a4b66189023f0620ab",
  "version": 1,
  "memory_type": "entities"
}
-->
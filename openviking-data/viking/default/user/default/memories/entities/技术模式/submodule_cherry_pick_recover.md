# 子模块 cherry-pick 冲突态切回分支恢复
zhi2-web-admin 子模块卡在 cherry-pick 冲突中间态导致无法 checkout 其他分支，需先 abort 再切回。

## 问题与根因
- 子模块停留在 feature/qrcode-json-main-v2.1 且处于 cherry-pick afe3b82aa 冲突中间态，Git 禁止 checkout
- 「切不回去」非分支不存在或权限问题

## 解决方案
- 子模块内 git status 确认中间态，执行 git cherry-pick --abort 回干净态，再 git checkout develop/v2.6.2-suzhufang
- 确认工作区干净、提交完整（本例 506b24b94）
- 主仓库 git status 显示子模块 modified 正常：主仓记录热修指针 afe3b82aa（生产 tag 202608261758）与本地不同，日常可忽略，部署以 tag 为准
- 若需主仓 develop 指针也回退，单独提交子模块指针更新，绝不移动已打生产 tag

## 验证与归属
- 验证证据：会话 87c47f0c，用户反馈子模块切不回去，定位冲突中并执行 abort 切回，解释主仓 submodule modified
- 涉及文件：.gitmodules
- 所属项目：苏住房G；来源会话ID：87c47f0c-7076-4b87-ac18-7c474fc995b3；代码基线：805ea8c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_cherry_pick_recover",
  "source_extraction_id": "abebe2c56425424f94ff991329e745aa",
  "version": 1,
  "memory_type": "entities"
}
-->
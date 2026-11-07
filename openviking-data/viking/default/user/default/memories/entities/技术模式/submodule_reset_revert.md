# 子模块误合并回退流程
苏住房G 同源父仓库与 zhi2-web-admin 子模块拓扑下，专属分支被误合入通用线提交时用 reset+force-with-lease 回退，区分「撤销分支包含」与「删除提交」。

## 背景与原因
- 专属分支 develop/v2.6.2-suzhufang 被误合入「首页改版」提交（fa906a9、719d565 等），用户要求子模块不需要最新首页改版。
- 同源复制的专属分支只承载定制改动，合入上游通用功能会污染分支并让父仓指针指向含未验收改动的 SHA。
- 已知「合并冲突只在子模块指针上选较新 SHA」不适用远端分支已含不该要的提交场景，此时必须回退。

## 回退步骤
- 子模块目录执行 git fetch origin → git reset --hard ee0d915（误合并前 tip）→ git push --force-with-lease 到子模块远程。
- 父仓库完成标志：git submodule status 输出无 +/- 前缀，工作区除本地 env/.env 外干净。
- force 推送前必须先比对父仓库指针已指向目标 SHA（本例父仓提交 1e5b44d 指针已是 ee0d915），避免父仓指针悬空。

## 注意事项与告知
- 撤销的是「分支是否包含」而非物理删除提交，上游提交仍保留在原线可随时再合。
- 验收后主动告知同事：若已拉过被撤销 SHA，需在子模块里 git fetch + git reset --hard origin/<branch> 自愈。
- 涉及文件：d:/repository/苏住房G/.gitmodules；所属项目苏住房G；来源会话 eadd8db6；代码基线 1e5b44d。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_reset_revert",
  "source_extraction_id": "7d100a0bc1f64c549abc1801c01d6406",
  "version": 1,
  "memory_type": "entities"
}
-->
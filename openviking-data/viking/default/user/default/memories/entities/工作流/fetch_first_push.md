# 推送被拒(fetch first)标准处理流程
远端返回 fetch first 拒绝推送时，用 stash→rebase→push→stash pop 四步处理，并同步更新禅道备注里的提交号。

## 适用场景
- 准备推送时远端已有他人新提交，直接 push 被拒（fetch first）
- 工作区留有与本次任务无关的未提交改动，不能带进本次提交

## 标准步骤
- 先 git stash 暂存与本次无关的未提交改动
- git rebase origin/<branch> 变基到远端最新，无文件重叠时不冲突，提交号会被重写
- 推送成功后再 git stash pop 恢复被暂存的改动
- 变基后提交号变化，必须同步把禅道备注或交付说明里的旧提交号更新为新值

## 禁忌与核对
- 禁止直接 git pull --rebase 把未提交改动卷进提交，禁止 --force 改写他人历史
- 事后核对本次提交文件清单是否只有预期文件、本地未提交改动是否原样还在
- 分支含大量子模块指针提交时禁 rebase 改 merge

## 验证与归属
- 来源会话 session-7bb9e4cf-3051-4312-9646-5446cebb8f9e（基线 89e5947），禅道 Bug 5756
- 提交号由 036e3ba85 变为 0fd25ef15；涉及 router/index.js、utils/ruoyi.js、Navbar.vue

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "fetch_first_push",
  "source_extraction_id": "34b9df83b44044cdbe3cd35475c05a76",
  "version": 1,
  "memory_type": "entities"
}
-->
# 禅道 Bug 闭环回写规范
修完代码提交推送后须将禅道 bug/任务状态改掉并写备注，否则测试看到未解决且单子挂看板。

## 状态与指派
- bug 置 resolved（已解决）+ 解决方案 fixed + 解决版本 trunk（主干）
- 任务置 done，登记消耗工时、剩余工时归零
- 指派回提单人让其验证，不要自己留着

## 备注六段式
- 根因 → 修复 → 验证 → 改动文件 → 待办（环境侧/后端侧未完成事项写明，如“测试环境需重新构建发布后再验证”）
- 操作历史核对：确认 zt_action 新增记录存在且 action=resolved、extra=fixed 与备注一致

## 提交号与复查
- 若 rebase 导致提交号变化，禅道备注提交号同步更新（如从 036e3ba85 更新为 0fd25ef15）
- 写回后复查禅道页面状态与指派人再回复用户
- 无关文件（public/version.json、report.html、临时脚本、.tmp-evidence/）不夹带进提交，未验证项显式列为待办

## 验证与归属
- 来源会话 session-eeaa919a（bug 5798 回写）、session-975f5f14（任务 2131 置 done 指派回戴志超）、session-c850280a（Bug 5971 指回 zhunan）
- 示例：bug 5798 解决人 tiany / 2026-10-30 11:06:11，zt_action #83849

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "zentao_bug_writeback",
  "source_extraction_id": "e30ec998055842cf9bca08f4e7758748",
  "version": 1,
  "memory_type": "entities"
}
-->
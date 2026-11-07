# Summary
2026-11-06，同机另一任务启动的 `npm run dev`（PID 11056）持续将共享 dist 覆盖为 remote/生产模式，冲掉测试产物。用户授权后，助手终止 PID 11056 及子进程 vite（PID 23708），随后从干净 HEAD worktree 重新打包 -m test 并稳定部署至 8095。
# 2026-11-06 (Friday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: You authorized stopping PID 11056 (the dev server). Let me kill it and its child vite, then deploy the clean test build.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Both killed, no `run dev`/vite processes remain. Now confirm `dist` stops changing (no more rebuild), then do the clean test build + deploy.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: `dist` stable (mtime stuck at 15:56:24, no more rebuild). Now the working tree still has the other task's `theme.css` WIP (date-icon). I'll build from committed `dev` HEAD to exclude their WIP. Use a clean worktree again (from HEAD), test-build, then copy into `dist`. This keeps their WIP untouched.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Clean test build → main `dist` (REF8443=true, demo, no prod domain), mtime 15:58:22. Verify it stays stable, reload nginx, and confirm live 8095.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Now the deployed test build is **stable and correct**:
- `dist` stable (mtime 15:58:22, no more rebuilds after killing dev server)
- Single native header "防汛检查" ✓
- ref8443 render (bodyLen 406, field-block-label present) ✓
- Fonts 14px (field-block-label, ref-input, toggle-btn) ✓

Let me view the final screenshot to confirm.

<!-- MEMORY_FIELDS
{
  "event_name": "终止占用构建目录的dev服务",
  "goal": "解决dist被覆盖冲突",
  "summary": "2026-11-06，同机另一任务启动的 `npm run dev`（PID 11056）持续将共享 dist 覆盖为 remote/生产模式，冲掉测试产物。用户授权后，助手终止 PID 11056 及子进程 vite（PID 23708），随后从干净 HEAD worktree 重新打包 -m test 并稳定部署至 8095。",
  "ranges": "169-179",
  "source_extraction_id": "7d3112d2bffc4f64990d7634bde142f5",
  "version": 1,
  "memory_type": "events"
}
-->
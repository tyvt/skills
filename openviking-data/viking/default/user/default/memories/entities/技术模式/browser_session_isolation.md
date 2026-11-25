# agent-browser 实机会话隔离
agent-browser 实机验证中浏览器标签页、自动化任务抢占和 CLI 进程的会话隔离要点。

## 会话失效
- 标签页被替换为浏览器新标签页（如 MSN）后，会话与 refs 全失效、token 丢失，需重新导航站点页再登录。

## 任务抢占
- 2026-11-24 浏览器易被其他自动化任务抢占：先后出现无锡市惠山住建局维修基金管理系统（zhaiwu.vip）与 ST苏住房智慧物业管理平台 PC 端登录页；localhost token 按 origin 存储不丢失，导航回求援工单页即可；反复被抢占时用独立命名 session 隔离验证环境。

## CLI 进程
- 2026-11-25 agent-browser 坑：CLI daemon 占管道导致空输出和挂起；单 shell 进程内用 native exe + timeout 保活；session 状态不跨 timeout 包裹调用；job_kill 会杀浏览器进程树；nohup 无法启动 shim。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "browser_session_isolation",
  "source_extraction_id": "518c31b423ab4ec3b0236eabbead369d",
  "version": 1,
  "memory_type": "entities"
}
-->
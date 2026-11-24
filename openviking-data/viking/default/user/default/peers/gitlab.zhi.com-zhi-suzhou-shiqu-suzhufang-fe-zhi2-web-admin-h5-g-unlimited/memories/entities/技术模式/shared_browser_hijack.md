# 共享浏览器被其他进程导走故障
用 agent-browser 共享浏览器做自动化验证时，页面会被并发进程导航到别的系统，导致 DOM 消失、截图作废。

## 现象
- 页面内容突变为「无锡市惠山住建局维修基金管理系统」，URL 仍是网关登录页（redirect=/index），只是皮肤变了
- 一次任务中两次发生；网关 token 可被其他进程驱动登录（管理员% 会话）后复用
- 登录页无典型滑块，只有一个 clickable 元素；点击被按钮内 SPAN 覆盖属无害，可用 JS 直接触发 click
- 网关会弹「修改密码」密码过期对话框，取消即可继续

## 应对
- 重新打开目标页并重走登录（截验证码），8101 端口有独立登录页
- 关键证据要在页面被导走前尽快截图；元素截图与 DOM 滚动状态矛盾时以 DOM 实测为准
- 截图常被视口高度截断（视口只到 581，卡片在 448-672），需缩放使目标完整入镜

## 归属
- 涉及环境：苏住房G 大屏（8101）、网关登录页；工具：agent-browser MCP
- 记录时间：2026-11-24，禅道任务 6899 验证过程

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "shared_browser_hijack",
  "source_extraction_id": "c48961d284834f84883e133aeb508277",
  "version": 1,
  "memory_type": "entities"
}
-->
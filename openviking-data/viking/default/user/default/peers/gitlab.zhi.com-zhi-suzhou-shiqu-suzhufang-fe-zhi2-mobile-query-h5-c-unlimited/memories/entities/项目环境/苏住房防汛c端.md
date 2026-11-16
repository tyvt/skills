# 苏住房防汛C端
苏州住房防汛物业管理 C 端 uni-app(Vue3) H5 项目，含数智数据看板等页面。

## Description
- 技术栈为 uni-app Vue3 H5；2026-11-16 构建命令确认为 npm run build:h5，e2e 为 npm run test:e2e:shuzhi
- 2026-11-16 在 dev 分支主工作区直接实施改动（工作区干净，仅 .task-state/ 未跟踪）；历史 worktree 有 -wt-login-align（fix/login-design-align）与 -wt-shuzhi

## Environment
- 唯一可写 worktree：D:\repository\苏住房防汛C端-wt-login-align，分支 fix/login-design-align
- 参考站 http://localhost:8443/（Figma Make React），进数智页：登录→选「物业手持端」→底部「数智」
- 本地部署 http://127.0.0.1:8095/（nginx 指向 worktree dist）
- Chromium 路径 C:\Users\Administrator\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe

## Team
- Lead：任务协调与复核
- tab-aligner：并行改工作台并 build（dist 共用）
- 本 agent：数智数据看板专职实现成员

<!-- MEMORY_FIELDS
{
  "category": "项目环境",
  "name": "苏住房防汛C端",
  "source_extraction_id": "6138828c21f343448d40413458bbf858",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->
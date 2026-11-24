# Lead
- 负责门户H5 项目（从苏住房防汛C端迁移登录与子系统选择页）的任务分配与构建协调（as of 2026-11-06）
- 负责苏住房防汛C端移动查询H5项目（数智页面、首页接口失败隔离、动态页面骨架屏改造、数智页面像素级还原与 e2e 视觉验收等）的任务分配与构建协调（as of 2026-11-16）
- 负责该 H5 项目的真实构建执行（op:"full" 触发 bun run build:h5）、产物校验与部署确认（nginx 直读 dist）以及 E2E 验收（as of 2026-11-16）
- 负责该 H5 项目基于 chain 的链式执行与硬交接编排（P0 硬交接、hop 排程续接、交接文档与遗留项跟进）（as of 2026-11-24）
- 负责该 H5 项目的实机验证（agent-browser 截图）、用户确认后按选择提交两个 vue 文件并做产物清零（as of 2026-11-24）
- 负责 nginx UI（127.0.0.1:9000）站点自查、验证地址确认与 8095 实机验证（as of 2026-11-24）
- 负责禅道 bug 6931 评价等级透传修复的全链路（hop3 定位根因，hop4 本地打包部署与 curl 验证，hop5 PC/移动端 UI 验证、提交推送两仓库及禅道回写，hop6 收尾清理（nginx 配置从 bak 字节级还原并 reload、停止 java PID 6508 释放 9608 端口、临时产物与前端 .task-state 清零、链路终止），as of 2026-11-24）
- 负责禅道 bug 6938 管理APP现场巡检缺少整改通知书的根因定位、门控修改、构建与 hop 硬交接续接，以及实机验证、证据上传与禅道回写为已解决/已修复（as of 2026-11-24）

<!-- MEMORY_FIELDS
{
  "source_extraction_id": "c0c302b4e3f6432db396cdac8d0cbecc",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "source_extraction_ids": [
    "12e87ead32254fbcb539e4c7458b8805",
    "cc2cabee31a04543999aef0c83603367"
  ],
  "version": 21,
  "memory_type": "profile"
}
-->
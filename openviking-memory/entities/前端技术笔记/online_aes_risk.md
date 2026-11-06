# 线上包module-main-CI4DD367.js安全分析
园区公共收益项目线上前端主包module-main-CI4DD367.js被安全扫描告警，经排查多为误报，但关联分包硬编码AES密钥为真实风险。

## 排查结论
- module-main-CI4DD367.js本身不是敏感文件泄露，而是线上正在使用的前端主包（Vite打包产物）
- 安全扫描告警多数是SPA可访问静态资源+历史路由回退导致的误报
- 同次部署中关联的密码加密分包确实硬编码了AES密钥，是需要处理的真实风险

## 与本地dist关系
- 线上index.html仍引用module-main-CI4DD367.js，是当前线上包，但非本机dist（本机构建更早）
- 线上构建时间2026/7/22 09:58、gitHash f6ed457、version 2.6.1/production
- 本地dist主包为module-main-XbOf4OJl.js、构建时间2026/7/9 10:00、gitHash ec27fb6c6

## 验证与归属
- 所属项目：园区公共收益
- 来源会话ID：2e8f6bb0-314e-403c-9222-a11180a770ba
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "online_aes_risk",
  "source_extraction_id": "c62e01cbe3b346e0bca6472ceec35b7b",
  "version": 1,
  "memory_type": "entities"
}
-->
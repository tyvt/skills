# E2E 脚本站点预检
在 zhi2-web-admin（苏住房前端）E2E 脚本中新增站点预检：读取站点根 `/version.json`，仅当当前部署为本 feature branch 的 production 构建时执行用例。

## 目的与预检逻辑
- 避免在非本次分支构建或错误基线上执行 E2E，减少无效红测；生产构建的 `version.json` 保留在产物中用于站点校验，提交时排除源目录生成的文件。
- 脚本语法检查通过；未改业务源码，避免在红测前改变被测基线。

## 部署与基线
- 候选构建 `b48629cd4` 就绪时旧 nginx root 仍指向 `0e14875de`；部署脚本未检测到有效 token（不可用时会明确报错），暂不能上线候选基线跑红测，用户选择先登录 UI，最终候选部署与复测仍需 UI 登录。
- 站点 `version.json` 已验证为 production；为避免认证问题扩展成源码阻塞，改用已部署的 `0e14875de` 作为改源码前的视觉基线。
- staging 目录与生产构建的 `index.html`、`version.json` 哈希一致；经 nginx UI 启用候选站点、reload 并指向 staging 后 E2E 可执行，但 `version.json` 仍返回旧分支哈希，判断为缓存或 nginx root 未切换，先核对受管配置与带缓存绕过参数的响应。
- 刷新后 `8101` 返回候选构建的分支哈希，确认实际切换成功。

## E2E 执行
- 预写 E2E 已开始运行：记录实际 build hash，先校验菜单数量与初始激活项，再报告失败点。
- 切换成功后按计划扫描候选产物，确认测试专用标记与 mock token 未进入构建，再运行现有定制 Playwright E2E（Node 脚本，不使用 `playwright test` CLI）；新扫描未发现测试标记，但 `8101` 当前仍是原站，随后需经 UI 切到更新后候选构建、核实服务版本，再执行带自动还原的 E2E。
- 前一次封装脚本在启动 E2E 前退出；站点已确认恢复到基线，改为手动部署候选、直接运行 runner，再显式恢复基线，以获取完整错误或相似度结果。
- 2026-11-15 部署后即使视觉断言失败也执行交互测试。

## 归属与时间
- 所属项目：zhi2-web-admin（苏住房前端）
- 记录日期：2026-11-14

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "e2e_site_precheck",
  "source_extraction_id": "f354e9f68ad245d68522ec7207266c34",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 17,
  "memory_type": "entities"
}
-->
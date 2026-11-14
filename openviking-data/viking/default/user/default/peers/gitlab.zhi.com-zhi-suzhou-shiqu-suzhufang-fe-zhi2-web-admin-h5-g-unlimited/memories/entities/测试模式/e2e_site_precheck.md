# E2E 脚本站点预检
在 zhi2-web-admin 的 E2E 脚本中新增站点预检，通过读取 `/version.json` 判断当前部署是否为本次 feature branch 的 production 构建，只有匹配时才继续执行用例。

## 预检逻辑
- 脚本先读取站点根路径下的 `/version.json` 获取当前部署信息
- 仅当 nginx 当前服务的是本次 feature branch 的 production 构建时才继续跑用例
- 目的是避免在非本次分支构建或错误基线上执行 E2E，减少无效红测

## 当前状态
- 脚本语法检查已通过
- 业务源码未做改动，避免在红测之前改变被测基线
- 候选构建 b48629cd4 已就绪，旧 nginx root 仍指向 0e14875de
- 部署脚本尚未检测到有效 token，暂不能把候选基线放到站点上跑红测
- 用户选择先登录 UI，登录后回复“已登录”即可继续
- 2026-11-14 站点 `version.json` 已验证为 production；为避免认证问题扩展成源码阻塞，改用已部署的 `0e14875de` 作为“改源码前”视觉基线
- 预写 E2E 已开始运行：会记录实际 build hash，先校验菜单数量与初始激活项，再报告失败点；最终候选部署与复测仍需 UI 登录

## 归属与时间
- 所属项目：zhi2-web-admin（苏住房前端）
- 记录日期：2026-11-14

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "e2e_site_precheck",
  "source_extraction_id": "ea0e3e2f2fff4c87b27201f4797f7c93",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->
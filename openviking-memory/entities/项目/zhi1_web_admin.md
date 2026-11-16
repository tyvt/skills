# zhi1-web-admin（太仓物管前端）
太仓物管（苏州太仓武港）房地产/物管平台的前端子模块。

## 项目信息
- GitLab 项目 `gitlab.zhi.com-zhi-suzhou-taicang-wuguan-fe-zhi1-web-admin-h5-g-unlimited`，本地路径 `D:epository\太仓G\zhi1-web-admin`。
- 仓库 `package.json` 的依赖安装脚本被改为仓库安装脚本，属用户未提交改动，保持原样。

## 仓库状态
- 2026-11-15 处理前子模块与父仓各落后各自 origin 1 个提交；子模块内已有本任务代码、测试、预存 `package.json` 改动与本地生成物，处理顺序为先保留这些状态、同步上游，再只提交任务源文件与相关手工检查脚本。
- 2026-11-15 任务提交在隔离分支完成并推送：子模块 `a82cf35d`（`feat(register): align registration and login with prototype`）推到 `fix/task-2334-registration-ui` 与 `suzhou-taicang-wuguan-main-v1.26`；父仓 `90373376`（`chore(submodule): update zhi1-web-admin for task 2334`）gitlink 指向 `a82cf35d` 并推送同分支，远端 SHA 与本地一致；暂存仅 11 个前端源文件与 8 个无敏感值手工检查脚本，机器专用 `visual-baseline.mjs`、`package.json` 与运行产物未纳入；提交前构建与真实 API E2E 通过，临时工作树已移除。
- 2026-11-16 登录页视觉回退已提交并推送：子模块 `2b1ea2ac7`（`revert(login): 回退登录页视觉改为旧版，保留临时账号登录续填功能`，3 文件 +61/-875）推到 `suzhou-taicang-wuguan-main-v1.26`；父仓 `6c49ae2`（`chore(submodule): update zhi1-web-admin 回退登录页视觉`）gitlink 指向 `2b1ea2ac7` 并推送，远端 SHA 与本地 HEAD 一致。
- 2026-11-16 回退范围与验证：`src/views/login.vue` 回到 `a82cf35d` 之前的旧版外观，仅保留 `created()` 临时账号凭证预填与 `handleLogin()` 中 `userType === '01'` 跳 `/register/add`；删除 `tests/manual/2334/login-page-ui-contract.test.mjs`，并从 `ui-contract.test.mjs` 删掉 7 条登录视觉断言；未纳入会话前既有的 `package.json` 改动与未跟踪的 `.eslintcache/.task-state/_review.json/visual-baseline.mjs`；7 个手测全过、ESLint 与 build 均 exit 0。

## 任务与关联
- 任务 2334（企业注册流程优化）的需求要点与逐轮进展见「zhi1_任务2334」。
- 细则见「zhi1 登录注册验证码默认隐藏」「zhi1 企业注册登录契约」；联调与 E2E 见「zhi1 注册流程联调与 E2E 验证」；实施计划第 14 版复审见「zhi1 企业注册流程实施计划复审」；后端仓库分支、接口模块与 Nacos 配置见「太仓物管后端」。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi1_web_admin",
  "source_extraction_id": "957581bc204b4bb58a80535daef7f819",
  "source_extraction_ids": [
    "8954da6527344278aeedb1f4d5669418",
    "9e3298fc242a4bf8b98296349c80c7cc"
  ],
  "version": 44,
  "memory_type": "entities"
}
-->
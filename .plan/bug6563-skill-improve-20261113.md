---
status: approved
human_confirmed: true
risk: low
review_override: false
session: bug6563-skill-improve-20261113
title: Bug6563 复盘改进（skip 业务细节 ③）+ 验证
---

# Bug6563 复盘改进方案

> 用户人工确认（2026-11-13）：**「业务细节的不需要做」**——问题 ③（CASES.md 的 organType/companyType 字段业务对照）属业务细节，**不做**。其余 5 条流程/工具纪律改进（A/1 取图、B/2 菜单定位、4 ESLint、5 workdir、6 plan_review）全部实施。提交方式：提交并推送。

## 一、前因后果

Bug 6563 只改 5 行却耗 117 步/等效 65k，浪费集中在「取图绕路」与「定位绕圈」两段，根因是 skill 入口的执行顺序与工具纪律缺失。本方案把复盘第六节的 6 条可执行改进全部落到 `zentao-analyzer`、`dsh-token-policy`、`dsh/AGENTS.md` 三个文件，改完对每条给出可核对证据。

## 二、现状与证据

> 硬门：每条给「文件:行」证据。全部为 Markdown 文本改动，无应用代码 / 无 package.json 构建。

- **E1（问题 A/1，取图最短路径）** `zentao-analyzer/SKILL.md:12` 第 3 条只写「看图 → references/attach.md」，未点破最短路径。`zentao-analyzer/zentao_file.py:5-6` 用法确认为 `python zentao_file.py <fileID> [output_path]`——**第二参是位置参数，不是 `--out`**（复盘中 `--out` 错参导致下 4 次）。`references/attach.md:3-9` 已写 Token 下二进制，但入口未指向现成脚本。
- **E2（问题 B/2，菜单定位）** `zentao-analyzer/SKILL.md:29-34` 定位三步曲第 1 步仅「查菜单/路由表…拿 path」，未写死真实映射 `SYS_MENU(menuFilePath)→src/views/<path>`，也未列反例「经济机构管理≠institution，实为 `company/companyManagement`」；`SKILL.md:13` 第 4 条同样只泛说「反查路由」。
- **E3（问题 C/3，字段对照）** `zentao-analyzer/CASES.md` 全文 grep `organType|companyType|机构类型|机构类别` **零命中**——机构域 `organType`(机构类别 agency/develop/lease) 与 `companyType`(机构类型 有限责任公司，字典 `company_type`) 高频混用无对照。
- **E4（问题 4，ESLint）** `zentao-analyzer/SKILL.md:49-54` lint 模板为 `npx eslint --ext .js,.vue src`（**全量**），与 `SKILL.md:17` 第 8 条「只跑 `npx eslint <file>`，不要全量 lint 回灌」矛盾，且无 `Select-String` 过滤 + `exit=` 固化，复盘中输出被 token-guard 截断丢证据。
- **E5（问题 5，execution.workdir）** `dsh-token-policy/SKILL.md:22`「重活走编排器」节及 `:12` 选型均未写「`execution.workdir` 必须是含 `package.json` 的前端子模块目录（如 `zhi2-web-admin/`），不是父仓根」，复盘中 `INVALID_EXECUTION` 白跑一次。
- **E6（问题 6，plan_review 只发变更段）** `dsh/AGENTS.md:36` 现为「首轮送审整篇 ≤4k chars；被打回后只发变更段+新增证据」——首轮仍发整篇；复盘第 6 条要求「首轮即只发变更段+证据」。`dsh/AGENTS.md:35`「只在含 edit/write 才送审」已到位，不动。

## 三、实施方案（分步，改哪里不写实现代码）

改动合并为 3 个文件、按文件各一次 `edit`（同类多段合并，遵守合并 edit 规则）：

1. **`zentao-analyzer/SKILL.md`**（一次 edit，改 3 段）
   - 第 3 条（:12）：追加一句最短路径——「要取图直接 `python zentao-analyzer\zentao_file.py <fileID> <repo>\.tmp-bug<id>\<name>.png`（**在仓库根 cwd 执行；第二参是位置参数，非 `--out`**）；账号在 `credentials.py`，**不问用户、不裸 `Invoke-WebRequest`、不用 vision 读内部 URL**」。
   - 定位三步曲第 1 步（:31）：改为写死查法——「菜单名 → 查 DB `SYS_MENU` 的 `path/component`，或先 `openviking search "<菜单名>"` 拿 `menuFilePath`，映射 `src/views/<path>`；**禁止按标题字面量猜目录**（反例：经济机构管理≠`institution`，实为 `company/companyManagement`）」。
   - 第 4 条（:13，与三步曲一致的入口点）：在「按截图菜单名/按钮文案反查路由」后补「（查 `SYS_MENU.menuFilePath` 或 openviking search，见定位三步曲第 1 步）」，避免入口两处只说"反查路由"而无具体查法。
   - lint 命令模板（:49-54）：删除全量模板 `npx eslint --ext .js,.vue src`，改为单文件 + 过滤 + exit 固化——`npx eslint <file> | Select-String "<file>"; echo exit=$LASTEXITCODE`，并注明「禁止全量 `--ext .js,.vue src`」。
2. **`zentao-analyzer/CASES.md`**（一次 edit，末尾追加一条案例）
   - 新增「机构域 `organType` vs `companyType`」条目：`organType`=机构类别（取值 agency=经纪/develop=开发/lease=租赁）；`companyType`=机构类型（有限责任公司等，字典 `company_type`）；查看态走 `contentInfo`、编辑态 `section-form` 手写，**两处字段需同时核对**。标注「本条目为案例经验，字段语义以 `company_type` 字典与源码 `agencyBasicInfoContent.js` 为准」。
3. **`dsh-token-policy/SKILL.md`**（一次 edit，改「重活走编排器」节）
   - :22 后新增一条 bullet：「`execution:{program,args}` 的 `workdir` 必须是**含 `package.json` 的前端子模块目录**（如 `zhi2-web-admin/`），**不是父仓根**；否则 `INVALID_EXECUTION`」。
4. **`dsh/AGENTS.md`**（一次 edit，改 1 行）
   - :36 改为「**首轮即只发「变更段 + 证据」**（含改动行 + 对应验证命令），不发整篇；被打回后同样只发变更段增量」。

变更受 git 管理，git revert 即可回滚。

## 四、验证计划（每条逐文件精确核对 + 反向确认旧句已删）

- **V1 SKILL.md 取图**：`Select-String -Path zentao-analyzer\SKILL.md -Pattern '位置参数','不问用户','credentials.py'` 全命中。
- **V2 SKILL.md 定位**：`Select-String -Path zentao-analyzer\SKILL.md -Pattern 'menuFilePath','companyManagement','禁止按标题字面量猜目录'` 全命中；`Select-String :13` 含 `menuFilePath`。
- **V4 SKILL.md lint**：`Select-String -Path zentao-analyzer\SKILL.md -Pattern 'LASTEXITCODE','Select-String'` 命中；**反向** `Select-String -Pattern 'eslint --ext .js,.vue src'` **应为 0 命中**（旧全量模板已删）。
- **V3 CASES.md 字段**：`Select-String -Path zentao-analyzer\CASES.md -Pattern 'organType','companyType','company_type'` 全命中。
- **V5 token-policy workdir**：`Select-String -Path dsh-token-policy\SKILL.md -Pattern 'package.json','INVALID_EXECUTION','workdir'` 全命中。
- **V6 AGENTS.md plan_review**：`Select-String -Path dsh\AGENTS.md -Pattern '首轮即只发'` 命中；**反向** `Select-String -Pattern '首轮送审整篇'` **应为 0 命中**（旧句已删）。
- **反向统一**：全仓 `Select-String -Pattern 'npx eslint --ext','首轮送审整篇','--out'`（限这 4 文件）均应为 0 命中（`--out` 仅允许出现在"非 --out"说明中）。
- **范围**：`git diff --stat` 只含上述 4 个 .md，无代码文件夹带。
- **未执行构建**：纯 Markdown 规则文本改动，仓库为 skills 文档仓、非可构建前端工程，`npm run build` 不适用（未执行，原因：无应用代码/package.json）。

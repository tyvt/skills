---
name: zentao-analyzer
description: 禅道 Bug/任务分析与回写。给定禅道链接时拉取详情、定位前端根因、修复并验证，回写为已解决。也用于批量查询禅道 bug/任务、生成周报。细节在 references/，进入对应子场景才读。
---

# 禅道分析与回写

只读本文件。下面每一行的细节文件，进入该子场景才 read 一份。

1. **环境**：只操作新禅道 `http://zentao-biz.zhi.com`。查询/回写走 MCP `dbx`（连接名「新禅道」）。老禅道库禁止写（ID 空间重叠）。
2. **先读备注**：开工第一步读 `zt_action` 的 comment。后端接口变更在备注里，只看 steps 会整轮作废。查询与回写→ `references/dbx.md`。
3. **看图/取图** → 附件**统一落 D 盘 `D:\禅道附件\<类型>\<id>\`（不落项目目录）**，本地优先复用。下载走缓存模式：先 DBX 查 `zt_file` 拿 `id,title`，再 `python zentao-analyzer/zentao_file.py --object-type <bug|task|story|requirement> --object-id <id> --titles "id:title,..." <fileID...>`（批量用 `--sync-object id1,id2`；**在仓库根 cwd 执行**）。stdout `OK/CACHE_HIT <绝对路径>` 直接喂 `analyze_image`，命中不发 HTTP。账号密码在 `credentials.py`，**不问用户、不裸 `Invoke-WebRequest`、不用 vision 读内部 URL**。看图默认用 `mcp__magpie-vision__analyze_image` 文字描述，不要 `read_image`。列宽/显隐/单字段不读截图。细节见 `references/attach.md`。
4. **先看截图提取页面标识，再定位**：截图里若有「编号 / 菜单名 / 页签」等标识（如 `BASQ202611110001`），先 `analyze_image` 提取出来，直接 grep 该编号/菜单名定位到具体 record，别先绕 `institutionRegister` 之类的接口名走 10+ 步（事故见 `CASES.md` bug6401 同类）。**定位页面**：按截图菜单名/按钮文案反查路由（查 DB `SYS_MENU.menuFilePath` 或 `openviking search "<菜单名>"`，映射 `src/views/<path>`，见下方定位三步曲第 1 步），禁止按方法名猜；改完在目标模块内 grep 旧接口路径，禁止全 `src` grep。grep 命中超过 20 条只取文件列表，不回灌全文。
5. **先取数再读代码（阻塞）**：字段名、枚举、接口返回不确定时，先查一条真实数据（表结构或一行样本，见 `references/dbx.md`），没拿到结果之前不读业务代码、不推演字段长什么样。**`getTrueInfo` 的 fieldName 是后端映射名，不是页面字段名**（`idNumber→legalPersonIdNumber`、`phone→contactPhone`）；未知映射时不要猜，改调 `getCompanyRecordDetail(companyRecordId)` 拿整条记录，但**先确认 `companyRecordId` 真在 detail 接口返回里**（`grep companyRecordId` 或在返回对象上打印），否则修复是 no-op。
6. **信息不足**：查父任务（`parent`）与 `zt_storyspec.spec`；跨项目用 `git log --grep`。
7. **开工** → `references/worktree.md`。用户指定落点是硬约束。临时文件落 `<repo>\.tmp-bug<id>\`，不提交。凭据只在脚本内读，不进会话。
8. **修复**：先判项目（监测V3 = `zhi3-web-admin-...`，门户 = `zhi2-web-admin-...`，用 `.env` / `VITE_APP_PROXY_ADDRESS` 确认）。改源码后只跑 `npx eslint <file>`，不要全量 lint 回灌。本地站点：监测V3 8098 / 门户 8099。未跑构建必须写「未执行」。
9. **提交** → `references/commit.md`。要构建哈希就放在 commit 之后，否则 hash 指向旧 HEAD。
10. **回写**：`node D:\repository\skills\zentao-analyzer\zentao-resolve.mjs <bugId> <commentHTML>`，脚本只打印序列，照抄执行。细节与禁忌在 `references/dbx.md`。
11. **收尾**：构建、部署、回写证据齐才收尾。再看 token-optimizer 的等效成本与未命中 TOP。

| 脚本 | 作用 |
| --- | --- |
| `zentao-resolve.mjs` | 打印回写事务序列（不执行） |
| `yapi_fetch.py` | 从 YApi 拉接口定义 |
| `zentao_html.py` | 抓取的 HTML 转纯文本 |

## 定位三步曲（硬顺序，禁止跳步；bug6520 复盘 O1）

1. **查菜单 → 拿 path（写死查法）**：菜单名 → 查 DB `SYS_MENU` 的 `path`/`component`（或先 `openviking search "<菜单名>"` 拿 `menuFilePath`），映射到 `src/views/<path>`。**禁止按标题字面量猜目录**（反例：「经济机构管理」≠ `institution`，实为 `company/companyManagement`）。
2. 进 `src/views/<path>/`，只在该目录内 read/grep。
3. 仅当 1、2 都无命中，才允许扩大到模块级检索。
禁止：按 bug 标题字面量在源码里 grep 猜页面（标题≠路由名，例：「用款通知书」实际路由是「划拨通知书」`unblock/notice`，绕了 10 步）。

## 截图/标题冲突熔断（bug6520 复盘 O2）

vision（analyze_image）结论与 bug 标题/描述矛盾时，**立即停止按标题推演**，二选一：
- 查 `zt_file` 条数与文件名，确认是否传错附件；
- `ask_user_question` 直接问报告人。
禁止「maybe vision misread / screenshot shows related page」式假设后继续推演。

## 定位顺序（P0 硬约束，先于动手）

1. **DBX 报错/接口返回**：先看禅道 Bug 的报错截图/复现步骤，查一条真实数据（SQL 或接口），不脑内演算。
2. **前端定位**：路由 → 页面文件 → 组件/字段；报错栈有行号直接按行号读，不整读。
3. **复现最小用例**：能用一条命令/一个请求复现的，先复现再改。

## lint 命令模板（单文件 + 过滤 + exit 固化）

```bash
npx eslint <file> | Select-String "<file>"; echo exit=$LASTEXITCODE
```
只跑**本次改动文件**，输出经 `Select-String` 过滤避免被截断丢证据，末尾打印 `exit=` 判定。**禁止全量 `npx eslint --ext .js,.vue src` 回灌**。存量基线错误不要清零。

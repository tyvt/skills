---
name: zentao-analyzer
description: 禅道 Bug/任务分析与回写。给定一条禅道链接（如 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=5988），拉取详情、定位前端代码根因、修复并验证，最后可回写状态为已解决。也可用于批量查询禅道 bug/任务、生成周报。
---

# 禅道分析与回写（zentao-analyzer）

> 本文件为按历史使用记录重建版本（原 SKILL.md 随 `D:\repository\skills` 被误删，Windows 卷影副本未覆盖 D 盘）。

## 环境

- 只操作**新禅道**：`http://zentao-biz.zhi.com`（老禅道库禁止写，ID 空间与新版重叠）。
- 登录账号默认 `tiany`；密码通过环境变量 `ZENTAO_PASSWORD` 传入，或在命令行 `--password` 显式给出，**不要写死进仓库**。
- DB 只读查询优先走 MCP `dbx`（禅道与业务库），不要直连老库。

## 常用脚本

| 脚本 | 作用 |
| --- | --- |
| `zentao_fetch.py` | 拉取单个 bug/任务/需求详情（HTML 或 JSON），支持 `--json` |
| `zentao_resolve.py` | 回写 bug 为解决/激活等状态；`--dry-run` 先看表单字段与可选值 |
| `yapi_fetch.py` | 从 YApi 拉取接口定义辅助核对字段 |
| `zentao_html.py` | 把抓取的禅道页面 HTML 转成纯文本便于阅读 |

### 用法示例

```powershell
# 看 bug 详情
python zentao_fetch.py 5988
python zentao_fetch.py 5988 --json

# 回写解决（先 dry-run 确认字段）
python zentao_resolve.py 5988 --dry-run
python zentao_resolve.py 5988 --resolution fixed --build trunk --assign-to lichandan --comment-file note.html
```

`zentao_resolve.py` 会：
1. 用 `account/password` 登录（含 `verifyRand` 校验位）；
2. GET `/index.php?m=bug&f=resolve&bugID=<id>` 拿 `uid` 与可选 `resolution` / `build`；
3. POST 回写 `resolution`、`resolvedBuild`、`assignedTo`、`comment`（HTML）。

## 标准流程（修 bug 闭环）

1. **取详情**：`zt_bug` 或 `zentao_fetch.py <id>` 确认标题、复现步骤、负责人、状态。
2. **定位根因**：在 `zhi2-web-admin/src/` 中按业务域查找相关组件；结合 MCP `dbx` 看真实数据形态（字段名/是否有值）。
3. **修复 + 验证**：改源码 → `npm run build` → 本地 nginx 站点（8098）部署 → E2E 或手工验证。
4. **提交推送**：子模块提交推送 → 父仓库 gitlink 提交推送（自底向上）。
5. **回写禅道**：`zentao_resolve.py` 置为 `fixed`，`resolvedBuild=trunk`，指派回原负责人，并附根因与修复说明。

## 注意

- `zt_bug` 表：`id,title,status,severity,openedBy,openedDate,resolvedBy,resolvedDate,resolution,assignedTo,product,build`。
- 状态：`active`（激活）→ `resolved`（已解决）→ `closed`（关闭）。
- resolution 可选值：`bydesign, duplicate, external, fixed, notrepro, postponed, willnotfix, productized`。
- 回写后核对 `resolvedBy/resolvedDate/resolution` 是否落库，再在最终回复里给出证据。

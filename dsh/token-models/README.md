# dsh-token-models

在 DSH Web GUI 的会话视图新增「**Models**」标签页：按 provider/model 逐项列出每个实际参与模型的
**输入、未命中、缓存读、缓存写、输出、缓存命中率**，末行合计。

## 为什么有这个插件

原有 `dsh-context` 的 Token Stats 卡只渲染**整会话聚合 donut**，模型字段只取 `lastUsed` 单值，
算不出「每个模型到底用了多少」。而 dsh-context 内部其实已经算好了每模型分桶
（`contextTimeline.cost = { provider: { model: { peak?, off? } } }`，bucket 含
`uncached / cacheRead / cacheWrite / output`）。本插件**不重算任何数据**，只把这份已存在的每模型分桶
渲染成一张清单表。因此：

- 会话内**主 agent + teammate** 的每模型用量都覆盖（数据来自每步 assistant/message 的 usage 归集）。
- **orchestrate 子模型**（网关进程里跑的多模型）不写入会话事件日志，故不在本表内——那部分只在网关
  `/v1/magpie/usage/requests` 侧。要全量含子模型的离线清单，用
  `token-frugal` 技能的 `audit-models.mjs`。

## 形态

- 纯本地插件（`file:` 链接），**不被 `dsh plugin update` / pnpm 升级覆盖**。
- client 半是**手写 ESM factory**（`window.__ModuleLoader__.load({id, factory})`），
  即 tsdown 产物形态，**无需构建步骤**：host 启动时自动扫描 Loader 条目并经 `/plugins` 提供。
- server 半（`lib/index.js`）仅提供挂载点。

## 结构

```
package.json        # file: 插件声明 + dsh.client{platform:web}
cordis.patch.yml    # bundle 自身 insert 挂载（id: token-models）
lib/index.js        # server 半（最小 apply）
lib/client.js       # client 半：conversation.view 新增「Models」标签页
```

## 部署（本机约定）

运行时插件源在 `~/.dsh/<plugin>`，profile 的 `package.json` 用 `file:../../<plugin>` 指向它，
`node_modules/dsh-token-models` 是它的 junction。仓库源 `D:\repository\skills\dsh\token-models`
是 source-of-truth，部署 = 复制到 `~/.dsh/token-models`。

```powershell
# 1) 同步仓库源 -> ~/.dsh 部署
Copy-Item "D:\repository\skills\dsh\token-models\*" "$env:USERPROFILE\.dsh\token-models\" -Recurse -Force

# 2) 确认 profile 已注册（dependencies + dsh.profile.bundles 各有一行）
#    ~/.dsh/profiles/web/package.json:
#      "dsh-token-models": "file:../../token-models"        （dependencies）
#      "dsh-token-models",                                  （dsh.profile.bundles，放在 dsh-context 之后）

# 3) 验证已入组合树（不需要重启即可看）
cd "$env:USERPROFILE\.dsh\profiles\web"; dsh --profile web --dump-config | Select-String token-models
```

## 生效

**重启 web 服务**后，打开会话 → 会话视图里出现「Models」标签页（排在 Context / Fleet 之后）。

- 重启方式：停掉现有 `dsh web` 进程后重新 `dsh web`（或用你的启动方式）。
- 无需 `pnpm build`：client bundle 是手写成品。

## 已知事项

- `dsh plugin --profile web install` 全量安装在本机曾因**预存问题**失败
  （拷贝 `orchestrator-gate/cordis.patch.yml` 报「拒绝访问 os error 5」，与本插件无关）。
  若遇此情况，手动把插件目录放进 `node_modules/dsh-token-models` 即可（junction）。
- 面板依赖 dsh-context 的 `contextTimeline` 投影；若上游重命名该键，面板会显示空态而非报错。
- 数据口径：输入 = 未命中 + 缓存读 + 缓存写；命中率 = 缓存读 / 输入。

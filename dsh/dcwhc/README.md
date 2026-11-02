# dsh-channel-wechat-companion

把 **浏览器 GUI 里发起的会话** 的完成/出错，以及同步审批卡、提问卡推送到微信。

`dsh-channel-wechat` 本身做不到这件事：它的 `sessionToPeer` 映射只在「微信
发来一条消息」之后才建立，所以 GUI 会话在它眼里没有主人，既不会推回答，也
不会转卡片。本插件补的就是这一段。

## 飞书双向入口

在通知配置中设置 `inbound: true`、`cwd`，使用官方 Node SDK 长连接接收事件。
只接受已配置 `open_id` 的私聊消息；群消息和其他账号的消息不进入 DSH。
无需公网回调地址或手动保活。

支持：

- 直接文字对话、富文本、图片、文件、位置和分享联系人/群聊信息。
- 在提问卡上点击单选按钮；多选、多题、自由文字也可按提示直接回复。
- 审批卡点击“放行一次”或“拒绝”，或发送完整卡片编号和选项。不会扩大持久权限。
- 飞书与网页共同等待同一交互，先完成的一方生效；重复、失效及取消后的回答不执行。
- 引用飞书通知回复时继续其对应 DSH 会话；长回答分段发送，完整保留内容。
- `present` 声明的交付文件自动上传飞书，手机端可以直接下载，单文件上限 50MB。
- 输入音频/视频以文件形式交给 DSH，能否理解内容取决于模型及可用工具，并不自动承诺转写。
- 未实现的消息类型（例如合并转发中的嵌套资源）明确反馈，不能宣称所有飞书系统消息均可解析。

命令：`/help`、`/sessions`、`/use 会话ID或唯一尾缀`、`/new`、`/stop`、`/pending`。
若并行会话存在多个待答问题，请使用卡片编号，避免把答案送到其他会话。

飞书后台一次性设置：

1. 事件与回调 → 事件配置 → 使用长连接接收事件，添加 `im.message.receive_v1`。
2. 回调配置 → 使用长连接接收回调，订阅 `card.action.trigger`。
3. 开通读取单聊消息 `im:message.p2p_msg:readonly`、发送消息 `im:message:send_as_bot`、
   上传/下载消息资源 `im:resource` 权限；新增配置后发布版本。

离线测试：`node test/feishu-bridge-selftest.mjs`，覆盖身份限制、去重、会话路由、
图片文件、问答审批、网页与飞书竞态、取消、文件交付和生命周期清理。
真实验收已完成：长连接握手、消息事件入站、`/new` 创建会话、文字提交给模型、
`turn:completed` 回复回飞书、原生卡片点击回调与答案采用，均有运行日志证据。
消息资源权限开通后，使用说明文件也已通过真实上传和私聊投递验证。
创建/恢复会话的 setup 回调不得返回预设 mount 的卸载句柄；此项已修复并加入回归。
图片、各类附件、审批、取消、去重和跨会话隔离另有离线回归覆盖，未宣称已逐种实发。

## 飞书应用机器人私聊（无需建群）

企业自建应用开启机器人能力、授予 `im:message:send_as_bot` 权限，把接收用户加入
应用可用范围并发布后，可以直接向用户私聊推送。无需公网回调或聊天保活。

在 `~/.dsh/notifications/feishu.json` 配置：

```json
{
  "enabled": true,
  "mode": "app",
  "appId": "cli_你的应用ID",
  "appSecret": "你的应用密钥",
  "receiveId": "ou_你的用户open_id",
  "receiveIdType": "open_id"
}
```

`receiveIdType` 还支持 `user_id`、`union_id`、`email`、`chat_id`，标识必须与
类型匹配。应用模式优先于 Webhook；缺少必要字段会明确失败，不会退回微信。
也可用 `DSH_FEISHU_APP_ID`、`DSH_FEISHU_APP_SECRET`、`DSH_FEISHU_RECEIVE_ID`
环境变量配置，环境变量方式的接收类型默认 `open_id`。

应用 access token 自动获取、缓存并在到期前刷新，服务端报告失效时再刷新重试
一次，整个过程无需用户发消息。密钥及 token 不输出到错误日志。

测试：`node test/feishu-app-selftest.mjs`。

本机已验证：应用鉴权成功，通过授权手机号解析唯一接收人，真实私聊测试获得
飞书发送成功响应；配置已启用。运行中的 DSH 日志出现
`已推送 card:question → feishu`，确认实际提问事件已经走飞书通道。
完成、出错、提问和审批的事件触发逻辑均通过离线回归。首次运行无需重启，
现有服务已加载实现。接收人和应用凭据只保存在通知配置文件中，不在此处记录。

## 飞书主动通知（无需微信保活）

支持飞书/Lark 群自定义机器人 Webhook。配置好后完成、出错、提问和审批通知
统一发送到飞书，不读取微信账号凭据，也不继承微信的十分钟发送窗口。
不需要公网回调服务，不需要向机器人发消息维持会话。

在 `~/.dsh/notifications/feishu.json` 保存（此文件包含推送凭据，请勿提交）：

```json
{
  "enabled": true,
  "webhook": "https://open.feishu.cn/open-apis/bot/v2/hook/你的机器人ID",
  "secret": "开启签名校验时填写，否则留空"
}
```

也可设置 `DSH_FEISHU_WEBHOOK` / `DSH_FEISHU_SECRET` 环境变量。
机器人的关键词校验可设为 `DSH`，每条消息均带此关键词。
支持飞书签名校验（HMAC-SHA256）；网络请求超时为 15 秒。
通知只负责提醒，提问与审批答案仍在 DSH 网页里填写。

首次安装代码需要重新加载插件或重启 DSH；之后配置文件每次发送时读取。
未配置飞书时保留原微信路径，`enabled: false` 可关闭飞书选择。

离线验证：`node test/feishu-selftest.mjs`；真实投递必须在提供有效 Webhook 后验证。

## 会话上下文与主动推送限制（2026-10-27 修复）

此前完成通知和确认卡片没有携带 `context_token`，且把 `ret=-2 prepare failed`
一律归类为限流，反复重试后冷却，无法解决请求缺少上下文的问题。

现在上游在命令、聊天和卡片路由之前观察入站消息，按机器人账号和收件人保存
最新上下文到 `~/.dsh/channel-wechat-companion/contexts.json`；通知自动读取，重启
后仍可使用。缓存不会跨机器人账号复用，观察过程不会吞消息或阻塞 GUI 卡片。
`-2` 可能是请求参数、上下文或服务端限制问题，不能直接等同于限流；相同请求
被拒绝后不再盲目重试。

这修复了本地丢失上下文的问题，但不代表能替微信服务端续期。登录 token 与
会话 context_token 是不同凭据；持续 getupdates 不会自行生成新的用户上下文。
当前通道没有经过验证的、无需任何用户交互即可永久续期的接口。若要求长期
无需微信发消息保活，应配置独立的主动通知服务，再验证其投递能力。

修改后需重新加载上游和 companion 插件（或重启 DSH）才会作用于运行进程。
离线验证：`node test/selftest.mjs`，共 36 项通过。

## 它做什么

| 场景 | 行为 |
|---|---|
| GUI 会话一轮**完成** | 推一条 `【已完成】会话名` + 最后一段回答 |
| GUI 会话一轮**出错** | 推一条 `【出错】会话名` + 错误原因 |
| 一轮被中止 | 默认不推（可配置） |
| GUI 会话弹出**审批卡** | **抄送**一条通知到微信；答案仍在网页里点，微信回 `P1 1` 只会收到指路提示 |
| GUI 会话弹出**提问卡** | **抄送**一条通知到微信；答案仍在网页里选，微信回 `P2 1` 只会收到指路提示 |
| 微信里发起的会话 | 不推，上游插件自己会处理，避免重复 |

> **卡片永远是"抄送"，不是"代答"。** 宿主把审批/提问交给第一个认领它的应答方，
> 谁认领谁独占这张卡——GUI 那边就再也弹不出来了。2026-10-26 的事故就是这里：
> 旧实现先 `await` 发微信、再等回执（上限 30 分钟），叠加 `-2` 限流时每条 93 秒
> 的重试队列，网页提问弹窗几十分钟不出现，两轮对话直接卡死。现在一律先
> `next()` 把请求交给 GUI，抄送在后台发，失败只记日志。

一轮只推一条，不是每个事件都推：一轮里模型会攒几十上百个事件，逐个推等于刷屏，
而用户真正想知道的是「做完了没有、有没有出错」。

## 安装位置（为什么不放在 node_modules）

```
~/.dsh/dcwhc/                      ← 实现都在这里，升级不会动
~/.dsh/profiles/web/node_modules/
    dsh-channel-wechat-companion   ← 指向上面的目录连接（junction）
```

`dsh plugin update` / `pnpm` 重装只会动 `node_modules` 里**真实存在**的目录，
连接本身（以及它指向的 `~/.dsh/dcwhc`）不受影响。

## 三个容易踩的加载约束

这些是实测踩出来的，改配置前先看：

1. **新增插件必须用 `insert`**。cordis 的非 insert patch 只会**覆盖已存在的条目**，
   条目不存在时输出 `entry not found` 并跳过。所以本 bundle 的
   `cordis.patch.yml` 用 `- insert:` 插入。profile 级的覆盖可以继续用 `id:`。
2. **bundle 必须在 profile 的 `package.json` 里注册**。只写 patch 行不够，还要在
   `dsh.profile.bundles` 里加包名，否则整个 bundle 不会被读。
3. **`Config` 走 Standard Schema 协议**。cordis 读 `Config['~standard'].validate()`，
   不是 schemastery 的 `.describe()`。本插件零依赖地实现了这个协议
   （不能 import schemastery：本插件在 profile 之外，拿不到那个包）。
4. **路径要用 `DSH_HOME`**，不能用 `os.homedir()`。否则用独立 HOME 跑验证或
   多 profile 并行时会串写日志。

## 唯一接触上游的地方

微信的 `sendmessage` 必须带那条入站消息的 `context_token`，而它只存在于
上游的轮询循环里。为了不复制一份轮询（两个消费者共用一个服务端游标会互相
抢消息），上游插件里加了一个**可选扩展点**，共三处小改动：

1. `lib/index.js` 顶部：`import { pathToFileURL } from "node:url"`
2. `loadExternalSeam()`：存在 `~/.dsh/dcwhc/lib/upstream-hook.mjs` 才加载
3. `Channel.serialize`：在处理完自己的卡片回复后，问一句外部插件要不要接管

**`dsh-channel-wechat` 升级后这三处会被覆盖**。覆盖后的表现是完全可用的降级：
完成/出错推送照常，卡片仍会推到微信，但回复不会生效（上游会把它当普通聊天
交给模型）。

### 升级后一键恢复

```bash
node ~/.dsh/dcwhc/tools/patch-upstream.mjs --check   # 先看状态，缺失退出码 2
node ~/.dsh/dcwhc/tools/patch-upstream.mjs           # 打补丁，然后重启 DSH
```

脚本特性：**幂等**（已打过就跳过）、**原子**（临时文件 + 改名）、**可回滚**
（首次改动前备份为 `*.bak-companion`）、**锚点校验**（上游结构变化时宁可不打，
也不插错位置）。恢复能力本身有测试：

```bash
node ~/.dsh/dcwhc/tools/verify-patch-recovery.mjs
```

它会造一份"刚升级完的纯净上游"、打补丁、逐条核对 8 个特征、验证幂等与语法。

`loadExternalSeam` 的容错：文件不存在 → 跳过；语法错误 → catch 住并记一行
日志；导出不是函数 → 跳过。任何情况下上游通道都能正常启动。

## 配置

在 profile 的 `cordis.patch.yml` 里：

```yaml
- id: channel-wechat-companion
  config:
    peers: ''              # 留空 = 推给扫码登录的账号
    notify: completed,error # 可加 aborted
    maxChars: 1200
    cards: true
    minIntervalMs: 1500
```

| 字段 | 默认 | 说明 |
|---|---|---|
| `peers` | `''` | 推到哪些微信 id，逗号分隔；留空用登录账号的 userId |
| `notify` | `completed,error` | 哪些轮次结局要推：`completed` / `error` / `aborted` / `blocked` / `max-tokens` |
| `maxChars` | `1200` | 正文上限，0 表示不截断 |
| `cards` | `true` | 是否把审批卡/提问卡**抄送**到微信（仅通知，不代答） |
| `minIntervalMs` | `1500` | 同一目标两次推送的最小间隔 |

### 限流与熔断

微信侧对同一 bot 的突发发送很敏感：实测连续发 6 条后所有 `sendmessage` 都返回
`-2 prepare failed`，持续数分钟。所以：

- 单目标最小间隔 + 10 分钟滑动窗口（最多 20 条）；
- 遇到 `-2` 一次即熔断，其它错误连续 3 次熔断；冷却 10 分钟内**直接丢弃**新消息，
  不再排队（旧通知延迟几十分钟送达比不送达更糟）；
- 队列上限 25 条，超出丢弃新的，避免旧消息把新卡片压在后面。

熔断状态在 `/api/channel-wechat-companion/status` 的 `coolingDown` / `queued` 里。

## 诊断

浏览器打开：

```
http://127.0.0.1:3080/api/channel-wechat-companion/status   # JSON 状态
http://127.0.0.1:3080/channel-wechat-companion/console     # 诊断页，带"发测试消息"
```

日志：`~/.dsh/channel-wechat-companion/log/companion-YYYY-MM-DD.log`（保留 3 天）

## 自测

```bash
cd ~/.dsh/dcwhc
node test/selftest.mjs
```

32 项断言，覆盖回执解析、卡片渲染、轮次推送、出错推送、中止不推、**卡片不扣住
GUI**、普通聊天不被吞、限流熔断、没登录时明确失败、限速不破坏顺序。不联网、
不依赖 DSH。

## 排障

| 现象 | 查什么 |
|---|---|
| 完全没推送 | `status` 里 `login.loggedIn` 是否为 true；不是就去 channel-wechat 插件页重新扫码 |
| 推送了但收不到 | `stats.failed` / `lastError`；微信 `ret=-2` 是限流，会熔断并冷却 10 分钟（`coolingDown: true`） |
| 网页里的提问/审批弹窗不出来 | 本插件是否把请求扣住了：`cards` 只抄送、不代答；确认 `lib/index.js` 的 `user-questions/request` 处理器直接 `next()` |
| 卡片收到但回复没反应 | 这是设计：卡片只通知，答案必须在网页里点；`P1 1` 只会收到指路提示 |
| 微信里的正常聊天没回答 | 检查是否被误判成回执：回执只认 `P<数字> <选项>` 这一种格式 |
| 启动日志看不到本插件 | 启动参数带 `--no-open` 时会打印 `N entry did not activate`；按提示的异常逐条排 |

## 已验证范围

- 32 项离线断言全通过（`node test/selftest.mjs`）
- 在**独立 `DSH_HOME` + 独立端口**的临时实例上验证过：bundle 能被解析、
  patch 层正确、`apply` 会执行、上游成功加载 hook、日志落在正确 HOME
- 推送正文用真实事件形状（`session/title` / `assistant/message` / `turn/end`）验证过

**未验证**：真实扫码登录后的实发消息与真实微信端的回执往返——这一步需要登录，
而且推送会真的发到你手机上，所以留给你重启后自行确认。

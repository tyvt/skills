# Cursor「native call arrived after its batch was sealed」补丁

## 现象

用 Cursor 通道（`cursor/deepseek-v41-flash-1017` 等）时，整轮突然失败，客户端只看到：

```
turn/end  reason: { kind: "error",
  error: { message: "native call arrived after its batch was sealed",
           code: "PI_AI_ERROR" } }
```

典型痕迹：这一轮的前一步（例如并行两个工具调用）已经正常完成，本步只发了**一个**工具调用，
紧接着就报错结束，模型输出几乎为空。

## 根因

报错来自插件 `@magpie-community/opencode-cursor-auth` 的 `native-session.mjs`，
`NativeSession.acceptCall()` 里的封批守卫：

```js
if (this.terminal || this.state === "awaiting-results")
  invalid("native call arrived after its batch was sealed", 502)
```

触发链路：

1. 步的**工具调用数 == 声明数**（尤其只发一个调用时），`acceptCall()` 末尾调 `sealBatch()`，
   第一条调用一进来就满足 `made == expected`，状态立刻变成 `state = "awaiting-results"`，
   批次封口、等调用方回传结果。
2. 此时 Cursor 的连接**尚未收尾**，它可能重传一帧同 `ExecServerMessage.id` 的 exec
   （request_context / MCP 参数封套）。
3. `acceptCall()` 的去重靠 `this.execs.get(call.requestID)`，但这帧第一次进时可能已被丢弃没有登记，
   于是 `prior` 为空，代码继续往下走到封批守卫，命中 `state === "awaiting-results"`，抛 502。

守卫上方自己的注释已经写明设计意图：

```
// A retransmission of the final exec can arrive after it sealed its batch.
// Validate that identity first; only a new exec violates the sealed phase.
```

**代码没实现这句注释的承诺**——它没有先比对身份，直接把重传也判成“新调用”。
所以根因是插件的守卫条件比设计意图宽：重传被误判为违反封批阶段，代价是整轮报废。

## 修复

`patch-batch-sealed.mjs` 把该守卫拆成两段，让注释成真：

```js
if (this.terminal) invalid("native call arrived after its batch was sealed", 502)
if (this.state === "awaiting-results") {
  const sealed = this.batches?.find((b) =>
    b.calls.some((c) => c.requestID === call.requestID && c.digest === digest))
  if (sealed) return          // 已在封批里的调用被重传：丢弃，不结束本轮
  invalid("native call arrived after its batch was sealed", 502)  // 真正的新调用：照旧拒绝
}
```

- **terminal 仍然致命**：Run 已经结束就是结束了，不改变原语义。
- **重传（同 requestID + 同 digest）被丢弃**：不重复执行、不改动批次、不影响结算。
- **真正的新调用照旧 502**：封批后冒出新 exec 仍视为协议违规，不放松校验。
- **同 requestID 但 digest 变了**也不放行，与上游「exec 身份在中途被改」的判断一致。

## 验证

```powershell
cd ~/.dsh/patches/cursor-batch-sealed
node --test batch-sealed.test.mjs   # 6 例全过
node smoke.mjs                      # 打补丁后插件模块仍可正常 import
node patch-batch-sealed.mjs --check # exit 0 = 已打，3 = 未打，2 = 文件缺失，1 = 版本不认识
```

测试覆盖：

| 用例 | 预期 |
| --- | --- |
| 已在封批内的调用被重传 | 丢弃，本轮不报错 |
| 封批期间真正的新 exec | 仍报 `batch was sealed` |
| 同 requestID 但 digest 不同 | 仍报 `batch was sealed` |
| terminal 会话任意调用 | 仍报 `batch was sealed` |
| running 会话 | 正常接受 |
| 已装插件源码形状 | 带 `[cursor-batch-sealed]` 标记，旧合并守卫已不存在 |

已实测：把插件文件还原成原始版本（`status = pristine`）后跑一次 `reapply.mjs`，状态自动回到
`patched`，证明插件升级覆盖后能自愈。

## 自动重打

补丁写在**已加载**的插件副本：

```
~/.config/magpie/plugins/node_modules/@magpie-community/opencode-cursor-auth/native-session.mjs
```

（不是 `~/.cache/magpie/bun/install-cache/` 那份未加载的拷贝——早期 `patch-magpie-quiet.ps1` 就是盯错了目录才一直不生效。）

插件是 npm 包，magpie 更新插件会整包覆盖，补丁必丢。所以已把它挂进既有计划任务：

- 任务名：`dsh-cursor-quiet-reapply`（登录时 + 每 5 分钟）→ `~/.dsh/patches/cursor-quiet/reapply.mjs`
- `reapply.mjs` 现在依次重打三处：静默重试、quiet 阈值、**封批重传修复**。
- 锚点找不到（插件大改）时**拒绝写入**并记日志，绝不会把插件改坏。

## 多目标（2026-11-13 复发教训）

运行中的 plugin-host 实际从 bun 的**版本化缓存目录**加载插件
（`~/.cache/magpie/bun/install-cache/@magpie-community/opencode-cursor-auth@<版本>@@registry.npmmirror.com@@@1/`），
不是 `~/.config` 那份。magpie 自动升级（0.2.44→0.2.45→0.2.46）后新副本未打补丁，
sealed 502 复发 10 次。现在补丁脚本遍历全部目标：`.config` 副本 + install-cache
所有版本化副本，逐目录备份（仅首次创建，保证 `--restore` 回 pristine），
`--check` 逐目标输出状态。插件再升级出新目录时 reapply 每 5 分钟自动重打新副本。

## 生效条件

补丁改的是磁盘文件，**运行中的 `magpie-bun.exe`（plugin-host）已经把旧代码读进内存**。
打完必须重启插件宿主才生效：

```powershell
Stop-Process -Id (Get-Process magpie-bun).Id -Force   # magpie 会自动拉起新的
```

## 文件

| 文件 | 作用 |
| --- | --- |
| `patch-batch-sealed.mjs` | 打补丁 / 检查 / 还原（幂等，多目标，带语法预校验） |
| `batch-sealed.test.mjs` | 6 例验证（`node --test`） |
| `smoke.mjs` | 打补丁后插件仍可 import |

## 常用命令

```powershell
cd ~/.dsh/patches/cursor-batch-sealed
node patch-batch-sealed.mjs            # 打补丁（幂等，覆盖 .config + install-cache 全部版本副本）
node patch-batch-sealed.mjs --check    # 逐目标看状态（全 patched 才 exit 0）
node patch-batch-sealed.mjs --restore  # 还原（各目录 .orig-batch-sealed 首次备份）
```

## 局限

- 治标：真正修好要上游插件把「先比身份再判封批」写进 `acceptCall`，本补丁只是让代码符合它自己注释的承诺。
- 若 Cursor 真在封批后发出**全新** exec（不是重传），仍会 502——那属于协议层异常，不归本补丁管。
- 插件大改版导致锚点失效时补丁会自动跳过（记日志），需要人工跟进。

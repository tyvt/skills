# Agent 异常工具调用排查与修复

排查时间：2026-10-27。目标环境：本机 DSH 0.2.1-rc.2，全局安装路径 D:/nvm/v22.23.2/node_modules/@deepseek-ai。

## 观测结果

本轮最后一次统计覆盖最近 100 个会话（排除排查会话），共 5,494 次工具返回，其中 232 次标记为错误：60 次 INVALID_ARGS、25 次 UNKNOWN_TOOL、11 次权限参数错误；56 次错误调用的原始参数为 `{}`。统计按会话内 toolCallId 去重，只统计 tool/result，不把正文、工具日志引用和投影重复计入。不同类别还包括文件过期、未读取文件、搜索失败和超时，不能把全部错误归于同一个原因。运行中的会话还会继续增长，统计见 tool-error-summary.json。

## 已复现并修复的缺陷

1. pi-ai 的完整参数解析器遇到非法 JSON 时返回 `arguments: {}` 与 `argumentsError`。DSH 的 `toStreamChunks` 只序列化前者，丢弃后者。修复后将解析失败诊断作为非对象参数传入原有校验边界，让它明确拒绝执行并反馈原始解析原因。测试还复现了旧实现会把非法 JSON 当作合法空参，从而执行零参数工具的问题。合法空参、合法 JSON 和既有 Windows 路径修复仍然保留。
2. `defineTool` 参数校验失败只有缺失字段名。修复后补充工具名、必填参数及类型、JSON 对象要求；保留 INVALID_ARGS 错误码和原始 violations。解析诊断限制为 1,600 字符。
3. 不存在的工具只返回 unknown tool。修复后提供当前作用域实际可调用的工具名，过滤 PTC 不能直接调用的工具，帮助模型纠正名称；保留 UNKNOWN_TOOL 错误码。

这些修复解决了确认存在的参数诊断丢失和纠错信息不足问题；历史空参数调用没有保留原始解析诊断，无法证明 56 次全部来自该缺陷，也尚未测得线上错误率下降。

## 落地文件与验证

实际修改模块：

- D:/nvm/v22.23.2/node_modules/@deepseek-ai/dsh-llm-pi-ai/lib/index.js
- D:/nvm/v22.23.2/node_modules/@deepseek-ai/dsh-tools/lib/index.js

两个路径均通过从 dsh 安装入口解析依赖得到，已确认不是其他安装副本。未修改模型选择、业务代码或用户正在变更的 profile 配置。

- apply-tool-call-fix.mjs：自动定位实际依赖、检查补丁锚点、备份后应用；重复运行不会重复修改。
- tool-call-regression.test.mjs：执行安装包真实转换函数与工具定义/执行边界，修复前 5 项失败、3 项通过；修复后 8/8 通过。
- diagnose-tool-errors.mjs：只读扫描会话并输出脱敏分类统计，不导出原始命令或参数。依赖现有 token-audit/zstdread.mjs。
- tool-call-fix-backup/：本次两个模块修改前的备份。

复验命令：

```powershell
node --test tool-call-regression.test.mjs
node apply-tool-call-fix.mjs
node diagnose-tool-errors.mjs
```

两个修改模块均已通过 `node --check`。补丁重复应用验证通过。

## 重启后验证与持久化保护

2026-10-27 19:50 验证：3080 端口由 PID 34624 提供服务，进程启动于 17:15:14。两个修复模块均在 16:48:56 写入，早于这次重启；实际文件哈希与受保护 CLI 启动检查一致。原有 8 项功能回归通过，新增 6 项覆盖恢复测试通过，共 14/14。实际 `dsh --version` 和持久化启动入口均返回 0.2.1-rc.2；未启动替代 GUI 服务，也未中断当前进程。测试验证的是修复行为和启动恢复能力，尚不代表线上异常率的长期下降。

修复原件、补丁清单、安装/撤销脚本、启动器、回归测试、原文件快照和按哈希保存的恢复备份均保存在 `%USERPROFILE%/.dsh/patches/tool-call-fix`，独立于 npm 安装目录。已在当前用户的 NODE_OPTIONS 中注册启动前检查。受保护的 DSH 启动时先检查三个补丁，已存在则不重写；升级或重装覆盖回兼容原文时自动备份并恢复；新代码锚点不匹配时明确停止启动并要求复核，不猜测覆盖。

当前运行服务使用用户已重启后加载的修复；本轮新加的启动保护适用于继承更新后环境的后续进程。已打开的旧终端可使用用户归档目录中的 `start-dsh.cmd web` 显式加载保护。普通 Node 应用和工具子进程不会执行补丁检查。

- [持久化说明与撤销方法](tool-call-fix/README.md)
- [持久化安装入口](tool-call-fix/install.ps1)
- [模拟升级覆盖的回归测试](tool-call-fix/persistence.test.mjs)
- [本次验证记录](tool-call-fix/verification.json)

包升级或重装仍可替换安装目录文件，但不会覆盖用户目录中的修复原件；自动检查避免兼容补丁悄悄丢失。任意未来版本是否兼容仍需根据实际锚点判断。

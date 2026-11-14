# Cursor 通道批处理封口 502 报错根因与修复
Cursor 通道整轮失败报 native call arrived after its batch was sealed，根因是 magpie cursor 插件封批守卫未区分重传 exec 帧，已通过两段式守卫补丁修复；后因插件自动升级演变为需多目标打补丁。

## 现象
- cursor 等通道整轮突然失败，turn/end 里 kind=error、code=PI_AI_ERROR、message="native call arrived after its batch was sealed"。
- 前一步并行调用正常，本步只发一个工具调用，几十毫秒后即报错结束。

## 根因（设计缺陷）
- 位于 magpie cursor 插件 @magpie-community/opencode-cursor-auth 的 native-session.mjs，NativeSession.acceptCall() 封批守卫：if (this.terminal || this.state === "awaiting-results") invalid("native call arrived after its batch was sealed", 502)。
- 某步工具调用数等于声明数（尤其只发一个时），sealBatch() 在第一条调用进来就满足 made==expected，状态立刻变 awaiting-results、批次封口。
- Cursor 连接未收尾可能重传同 ExecServerMessage.id 的 exec 帧；去重靠 this.execs.get(call.requestID)，首帧被丢弃未登记则 prior 为空，走到封批守卫抛 502。
- 守卫上方注释已写明重传应先校验身份、仅新 exec 才违规，但代码未实现，直接把重传判成新调用，属稳定复现的设计缺陷。

## 修复方案（两段式守卫）
- 把守卫拆两段：terminal 仍致命；awaiting-results 分支先用 requestID+digest 在 this.batches 里找匹配，命中则 return 丢弃重传，找不到才 502。
- 同 requestID 但 digest 变了也不放行，保持上游「exec 身份中途被改」的判断。
- 仅治标：让插件符合自身注释承诺；若 Cursor 真在封批后发全新 exec 仍会 502，属协议层异常。

## 落地与验证（首次修复）
- 补丁写在已加载副本 ~/.config/magpie/plugins/node_modules/@magpie-community/opencode-cursor-auth/native-session.mjs（首次修复仅覆盖此 .config 副本，未覆盖 install-cache 未加载拷贝，埋下复发隐患）。
- 补丁目录 ~/.dsh/patches/cursor-batch-sealed/（符号链接至 D:\repository\skills\dsh\patches\cursor-batch-sealed，改 skills 仓库即生效）。
- 原方案挂入 dsh-cursor-quiet-reapply 计划任务（登录时+每5分钟）自动重打，锚点失效时拒绝写入。
- 打完必须重启 magpie-bun（plugin-host）内存才生效；验证 node --test batch-sealed.test.mjs 6/6 通过，还原 pristine 后 reapply 自动回到 patched。
- 已提交 skills 仓库 main 分支 4742b76（dsh/patches/cursor-batch-sealed/ 新增 + cursor-quiet/reapply.mjs 接入），推送 origin。

## 2026-11-13 复发与多目标修复
- 补丁 10 天后复发（11/12–11/13 共 10 次 sealed 502）。根因非补丁丢失，而是 magpie 插件自动升级 0.2.44→0.2.45（11/12 16:28）→0.2.46（11/13 15:30）：plugin-host 运行时实际从 `~/.cache/magpie/bun/install-cache/@magpie-community/opencode-cursor-auth@<版本>@@registry.npmmirror.com@@@1/` 的版本化目录加载插件，而补丁脚本 PLUGIN_DIR 硬编码只盯 `~/.config/magpie/plugins` 的 0.2.32 旧副本；0.2.46 上游缺陷代码原样存在（守卫 1161 行，文本未变）。
- 修复：patch-batch-sealed.mjs 改多目标——targets() 动态枚举 .config 副本 + install-cache 全部版本化目录，逐目录打补丁；备份仅首次创建（保证 --restore 回 pristine），--check 逐目标输出、全 patched 才 exit 0；reapply 计划任务（每 5 分钟，仅消费 apply() 的 changed 布尔）无需改动即自动覆盖未来升级的新目录。smoke.mjs 仍用 NATIVE/PLUGIN_DIR 导出，reapply 只用 apply()。
- 测试改为遍历全部目标断言补丁标记；0.2.46 已打补丁（1161 行出现 [cursor-batch-sealed] 标记）、node --test 6/6 通过、smoke 确认补丁副本可正常 import。
- magpie-bun 已重启（新进程 15876，17:46:13，日志确认 plugin: host starts），补丁进内存生效；README 原引用不存在的 status.mjs 已修正并补多目标说明。
- 已提交 skills 仓库 cf59a8ff（含 .plan session-96d34dee903e.md）推送 origin。
- 教训：给 magpie 插件打补丁必须覆盖 install-cache 版本化目录，单盯 .config 必在下次升级后失效。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cursor_batch_sealed",
  "source_extraction_id": "3694466f3b534279ae62ea98725d3ef1",
  "version": 3,
  "memory_type": "entities"
}
-->